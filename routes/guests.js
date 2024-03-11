const express = require('express');
const Vote = require('../models/Vote');
const Guest = require('../models/Guest');
const UserFile = require('../models/UserFile');
const PollImage = require('../models/PollImage');
const verifyAuth = require('../config/verifyAuth');
const SocialPosting = require('../models/SocialPosting');
const { USER_TYPE } = require('../models/User');
const { sendEmail } = require('../helpers/email');
const { FILE_TYPE } = require('../models/UserFile');
const { POLL_STATUS, GUEST_TYPE } = require('../models/Guest');
const { SOCIAL_TYPE, SOCIAL_SUB_TYPE } = require('../models/SocialAccount');
const { getS3Path, uploadImage, uploadFile } = require('../helpers/s3Helper');
const { createOrUpdateGuestUser, getUserInfo, updateUserInfo } = require('./users');
const { randomString, generateImage, generateVideo, replaceConstants, getFrontendUrl } = require('../helpers/utills');

const router = express.Router();

const { FACEBOOK } = SOCIAL_TYPE;
const { PROFILE, PAGE, GROUP } = SOCIAL_SUB_TYPE;

// @route   GET api/guests
// @desc    Fetchs the list of guests for the current logged-in user.
// @access  Public
router.get('/', verifyAuth, async (req, res) => {
  try {
    const guestList = await Guest.find({ user: req.userId })
      .populate('socials')
      .populate({ path: 'guest', populate: 'socialAccounts' });

    // Fetch votes
    const votes = await Vote.find({ poll: { $in: guestList.map((item) => item._id) } });
    const list = guestList.map((guest) => guest?._doc);
    const guestListWithVotes = list.map((guest) => ({
      ...guest,
      votes: votes.filter((vote) => vote?.poll.toString() === guest?._id.toString()),
    }));

    res.json(guestListWithVotes);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   GET api/guests/pollId
// @desc    gets guest details
// @access  Public
router.get('/:pollId', verifyAuth, async (req, res) => {
  try {
    const user = await getUserInfo(req.userId);
    const poll = await getPoll(req.params.pollId);

    // Check if user authorized to access this poll
    if (!poll || poll?.user?._id.toString() !== user?._id.toString()) {
      return res.status(403).send('You are not authorized to access this poll.');
    }

    const { socialAccounts } = user;

    // Get Connected Social
    const getSocial = (type, subType) => poll?.socials.find((item) => item.type === type && item.subType === subType);

    // Update socials with latest socialAccount data
    for (let i in socialAccounts) {
      const { type, socialId, isConnected, page, group } = socialAccounts[i];

      // Create new Social
      const createNewSocial = async (subType, subTypeId, subTypeName = '') => {
        const basicObj = { type, isConnected, isActive: false, frequency: 4, poll: poll._id, user: req.userId };
        const newItem = new SocialPosting({ ...basicObj, subTypeName, subType, subTypeId });
        return await newItem.save();
      };

      const profile = getSocial(type, PROFILE);
      if (profile) {
        // Check and update Profile if required
        if (profile.subTypeId !== socialId || profile?.isConnected !== isConnected) {
          profile.subTypeId = socialId;
          profile.isConnected = isConnected;

          // Update now
          await SocialPosting.findByIdAndUpdate(profile._id, { subTypeId: socialId, isConnected });
        }
      } else {
        // Create Profile
        const profileItem = await createNewSocial(PROFILE, socialId);
        poll.socials.push(profileItem);
      }

      // Update Page/Group
      const updatePageGroup = async (obj, subType) => {
        const socialItem = getSocial(type, subType);
        const subTypeName = obj?.accounts.find(({ id }) => id === obj?.socialId)?.name || '';

        if (socialItem) {
          // check and update page if required
          if (socialItem.subTypeId !== obj.socialId || socialItem?.isConnected !== isConnected) {
            socialItem.subTypeId = obj.socialId;
            socialItem.isConnected = isConnected;
            socialItem.subTypeName = subTypeName;

            // Update now
            await SocialPosting.findByIdAndUpdate(obj._id, { subTypeId: socialItem.socialId, isConnected, subTypeName });
            return { socialItem, isNew: false };
          }

          return null;
        } else {
          // Create new
          const newItem = await createNewSocial(subType, obj?.socialId, subTypeName);
          return { socialItem: newItem, isNew: true };
        }
      };

      // Upddate Page
      const pageItem = await updatePageGroup(page, PAGE);
      if (pageItem) {
        if (pageItem?.isNew) poll.socials.push(pageItem.socialItem);
        else poll.socials.map((item) => (item._id === pageItem.socialItem._id ? pageItem.socialItem : item));
      }

      // Update Group
      if (type === FACEBOOK) {
        const groupItem = await updatePageGroup(group, GROUP);
        if (groupItem) {
          if (groupItem?.isNew) poll.socials.push(groupItem.socialItem);
          else poll.socials.map((item) => (item._id === groupItem.socialItem._id ? groupItem.socialItem : item));
        }
      }
    }

    // Update Polls
    const newSocialIds = poll?.socials.map((item) => item._id);
    await Guest.findByIdAndUpdate(poll._id, { socials: newSocialIds });

    res.json(poll);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/guests
// @desc    Creates a Guest
// @access  Public
router.post('/', verifyAuth, async (req, res) => {
  const {
    audio = null,
    socials = [],
    guest = null,
    pollImageSrc = '',
    hostOfferUrl = '',
    guestOfferUrl = '',
    emailTemplate = null,
    potentialTopics = [],
    hostSpeakerLabel = '',
    guestSpeakerLabel = '',
    socialShareFileSrc = '',
    pollSharingImage = null,
    status = POLL_STATUS.DRAFT,
    recordingDate = new Date(),
    startHostAutomation = false,
    guestType = GUEST_TYPE.HOST_GUEST,
  } = req.body;

  const session = await Guest.startSession();
  const options = { session };
  session.startTransaction();

  try {
    const userId = req.userId;

    // Poll info
    const pollInfo = {
      audio,
      status,
      guestType,
      user: userId,
      pollImageSrc,
      hostOfferUrl,
      guestOfferUrl,
      recordingDate,
      potentialTopics,
      hostSpeakerLabel,
      guestSpeakerLabel,
      socialShareFileSrc,
      startHostAutomation,
      pollImageInfo: null,
      password: randomString(6),
    };

    // Save Email Template
    if (emailTemplate) pollInfo.emailTemplate = emailTemplate;

    // Create Guest User && update it if guestType is not SOLO_SESSION
    if (guestType !== GUEST_TYPE.SOLO_SESSION) {
      const { fullName = '', email = '', phone = '', about = '', picture = '', jobTitle = '', organization = '' } = guest;
      const nameArr = fullName.split(' ');
      const firstName = nameArr.shift();
      const lastName = nameArr.join(' ');

      const newUser = await createOrUpdateGuestUser(firstName, lastName, email, randomString(8), USER_TYPE.GUEST);
      if (newUser) {
        await updateUserInfo(newUser._id, { profile: { ...newUser.profile, phone, about, picture, jobTitle, organization } });
      }

      pollInfo.guest = guestType === GUEST_TYPE.GUEST_SPEAKER ? userId : newUser?._id;
    } else pollInfo.guest = userId; // if guestType is SOLO_SESSION, then guest will be himself/herself

    // Create new Poll
    const poll = new Guest(pollInfo);
    await poll.save(options);

    // Save Poll Sharing ImageFile Info
    if (pollSharingImage) {
      const pollId = poll._id;
      const pollImageInfo = await createPollSharingImage(pollId, pollSharingImage);

      // Save pollImageInfo id to poll
      poll.pollImageInfo = pollImageInfo._id;
      await poll.save(options);
    }

    // Save Social Accounts
    if (socials.length) {
      const socialAccounts = socials.map(
        ({ type, subType, subTypeName, subTypeId, frequency, isActive = false, isConnected = false }) => {
          return { poll: poll._id, user: req.userId, type, subType, subTypeId, subTypeName, frequency, isActive, isConnected };
        }
      );

      const socialsIems = await SocialPosting.insertMany(socialAccounts, options);
      poll.socials = socialsIems.map((item) => item._id);
      await poll.save(options);
    }

    // Send Email in case of Publish
    await sendEmailToGuest(poll);

    await session.commitTransaction();
    session.endSession();

    res.json(await getPoll(poll._id));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   PUT api/guests/:pollId
// @desc    Updates a Poll
// @access  Public
router.put('/:pollId', verifyAuth, async (req, res) => {
  const {
    audio = null,
    socials = [],
    guest = null,
    pollImageSrc = '',
    hostOfferUrl = '',
    guestOfferUrl = '',
    emailTemplate = null,
    potentialTopics = [],
    hostSpeakerLabel = '',
    guestSpeakerLabel = '',
    socialShareFileSrc = '',
    pollSharingImage = null,
    status = POLL_STATUS.DRAFT,
    recordingDate = new Date(),
    startHostAutomation = false,
    guestType = GUEST_TYPE.HOST_GUEST,
  } = req.body;

  const userId = req.userId;
  const pollId = req.params.pollId;

  const session = await Guest.startSession();
  session.startTransaction();

  try {
    const poll = await getPoll(pollId);
    if (!poll) {
      return res.status(400).send({ errors: ["Invalid automation. Please make sure you're updating the right automation."] });
    }

    // Poll info
    const pollInfo = {
      audio,
      status,
      guestType,
      pollImageSrc,
      hostOfferUrl,
      guestOfferUrl,
      recordingDate,
      potentialTopics,
      hostSpeakerLabel,
      guestSpeakerLabel,
      socialShareFileSrc,
      startHostAutomation,
      pollImageInfo: null,
    };

    // Update Password
    if (!poll?.password) pollInfo.password = randomString(6);

    // Save Email Template
    if (emailTemplate) pollInfo.emailTemplate = emailTemplate;

    // Create Guest User && update it if guestType is not SOLO_SESSION
    if (guestType !== GUEST_TYPE.SOLO_SESSION) {
      const { fullName = '', phone = '', about = '', picture = '', jobTitle = '', organization = 'organization' } = guest;
      const nameArr = fullName.split(' ');
      const firstName = nameArr.shift();
      const lastName = nameArr.join(' ');

      const userObj = poll.guest;
      if (userObj) {
        await updateUserInfo(userObj._id, {
          firstName,
          lastName,
          profile: { ...userObj.profile, phone, about, picture, jobTitle, organization },
        });
      }

      pollInfo.guest = guestType === GUEST_TYPE.GUEST_SPEAKER ? userId : userObj?._id;
    } else pollInfo.guest = userId; // if guestType is SOLO_SESSION, then guest will be himself/herself

    // Save Poll Sharing ImageFile Info
    if (pollSharingImage) {
      let pollImageInfo = await PollImage.findOne({ poll: pollId });
      if (pollImageInfo) await PollImage.findByIdAndUpdate(pollImageInfo._id, getPollSharingInfoObj(pollSharingImage));
      else pollImageInfo = await createPollSharingImage(pollId, pollSharingImage);

      // Save pollImageInfo id to poll
      pollInfo.pollImageInfo = pollImageInfo._id;
    }

    // Save Social Accounts
    if (socials.length) {
      const socialsIds = socials.map(
        async ({ type, subType, subTypeName, subTypeId, frequency, isActive = false, isConnected = false }) => {
          let socialAccount = await SocialPosting.findOne({ poll: pollId, type, subType });
          if (socialAccount) await SocialPosting.findByIdAndUpdate(socialAccount._id, { subTypeId, subTypeName, frequency, isActive });
          else {
            socialAccount = new SocialPosting({
              poll: pollId,
              user: req.userId,
              type,
              subType,
              subTypeId,
              subTypeName,
              frequency,
              isActive,
              isConnected,
            });
            await socialAccount.save();
          }

          return socialAccount._id;
        }
      );

      pollInfo.socials = await Promise.all(socialsIds);
    }

    // Update PollINfo
    await Guest.findByIdAndUpdate(pollId, pollInfo);

    const pollInfo2 = await getPoll(pollId);

    // Send Email in case of Publish
    await sendEmailToGuest(pollInfo2);

    await session.commitTransaction();
    session.endSession();

    res.json(pollInfo2);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   DELETE api/guests
// @desc    Deletes a Guest
// @access  Public
router.delete('/:guestId', verifyAuth, async (req, res) => {
  const session = await Guest.startSession();
  session.startTransaction();

  try {
    await Guest.findByIdAndDelete(req.params.guestId);

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: 'Guest deleted successfully.' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/guests/batch-delete
// @desc    Batch Delete
// @access  Public
router.post('/batch-delete', verifyAuth, async (req, res) => {
  const session = await Guest.startSession();
  session.startTransaction();

  const { ids } = req.body;

  try {
    await Guest.deleteMany({ _id: { $in: ids } });

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: 'Guests deleted successfully.' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   GET api/guests/images/:userId
// @desc    gets guest images
// @access  Public
router.get('/images/:userId', verifyAuth, async (req, res) => {
  try {
    const images = await UserFile.find({ user: req.params.userId, type: FILE_TYPE.IMAGE });
    res.json(images);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/guests/images/:userId
// @desc    creates guest images
// @access  Public
router.post('/images/:userId', verifyAuth, async (req, res) => {
  const { name, imageData } = req.body;

  try {
    const image = new UserFile({ name, user: req.params.userId, type: FILE_TYPE.IMAGE });

    if (imageData) image.s3Path = await uploadImage(imageData, `${req.params.userId}/images`);

    await image.save();

    res.json(image);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/guests/poll-image-info/:pollId
// @desc    Save Poll ImageFile Info
// @access  Public
router.post('/poll-image-info/:pollId', verifyAuth, async (req, res) => {
  const { logo = '', footer = {}, header = {} } = req.body;

  try {
    const pollId = req.params.pollId;
    const pollImageInfo = new PollImage({ poll: pollId, logo, footer, header });
    await pollImageInfo.save();

    // Save pollImageInfo id to poll
    await Guest.findByIdAndUpdate(pollId, { pollImageInfo: pollImageInfo._id });

    res.json(pollImageInfo);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   PUT api/guests/poll-image-info/:pollImageId
// @desc    Update Poll ImageFile Info
// @access  Public
router.put('/poll-image-info/:pollImageId', verifyAuth, async (req, res) => {
  const { logo = '', footer = {}, header = {} } = req.body;

  try {
    await PollImage.findByIdAndUpdate(req.params.pollImageId, { logo, footer, header });

    res.json({ msg: 'Poll Image Info updated successfully.' });
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/guests/generate-poll-image
// @desc    Generate Poll ImageFile
// @access  Public
router.post('/generate-poll-image', verifyAuth, async (req, res) => {
  try {
    const {
      host,
      guest,
      audio,
      userLogo,
      showLogo,
      headerText,
      headerBgColor,
      headerTextColor,
      footerText,
      footerBgColor,
      footerTextColor,
    } = req.body;

    const info = {
      host,
      guest,
      showLogo: getS3Path(showLogo),
      userLogo: getS3Path(userLogo),
      header: {
        text: headerText,
        bgColor: headerBgColor,
        fontColor: headerTextColor,
      },
      footer: {
        text: footerText,
        bgColor: footerBgColor,
        fontColor: footerTextColor,
      },
    };

    // Generate ImageFile
    const { imageBase64, output } = await generateImage(info);

    // Upload ImageFile to S3
    const imageS3Path = await uploadImage(imageBase64, `${req.userId}/images`, true);

    // Generate Video if audio is present
    if (audio) {
      const audioObj = await UserFile.findById(audio);
      const audioS3Path = getS3Path(audioObj?.s3Path);
      const { videoFileBuffer } = await generateVideo(output, audioS3Path);
      const videoS3Path = await uploadFile(videoFileBuffer, `${req.userId}/videos`, `Video_${Date.now()}.mp4`, 'video/mp4');
      res.json({ imageS3Path, videoS3Path });
    } else res.json({ imageS3Path, videoS3Path: '' });
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   GET api/guests/vote/pollId
// @desc    gets guest details
// @access  Public
router.get('/vote/:pollId', async (req, res) => {
  try {
    const poll = await Guest.findById(req.params.pollId)
      .populate('pollImageInfo')
      .populate({ path: 'guest', populate: 'socialAccounts' })
      .populate({ path: 'user', select: 'firstName lastName' });
    res.json(poll);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/guests/vote/pollId
// @desc    save vote details
// @access  Public
router.post('/vote/:pollId', async (req, res) => {
  try {
    const pollInfo = req.body;

    // Create New if not exists
    if (!pollInfo._id) {
      const vote = new Vote(pollInfo);
      await vote.save();
      res.json(vote);
    } else {
      await Vote.findByIdAndUpdate(pollInfo._id, pollInfo);
      res.json({ msg: 'Vote updated successfully.' });
    }
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send('Internal Server Error');
  }
});

async function getPoll(pollId) {
  return await Guest.findById(pollId).populate('guest audio pollImageInfo socials');
}

function getPollSharingInfoObj(obj) {
  const { logo, headerText, headerBgColor, headerTextColor, footerText, footerBgColor, footerTextColor } = obj;
  const header = { text: headerText, bgColor: headerBgColor, textColor: headerTextColor };
  const footer = { text: footerText, bgColor: footerBgColor, textColor: footerTextColor };

  return { logo, header, footer };
}

async function createPollSharingImage(pollId, obj) {
  const pollImageInfo = new PollImage({ poll: pollId, ...getPollSharingInfoObj(obj) });
  await pollImageInfo.save();
  return pollImageInfo;
}

// Send Email to Guest
async function sendEmailToGuest(poll) {
  if (!poll) return { msg: 'Poll not found!', success: false };

  const { status, guest, user, guestType, emailTemplate } = poll;

  // Send Email in case of Publish
  if (status === POLL_STATUS.PUBLISHED && emailTemplate && guestType !== GUEST_TYPE.SOLO_SESSION) {
    const guestInfo = await getUserInfo(guest);
    const userInfo = await getUserInfo(user);

    const paramsToReplace = {
      '[GUEST_FIRSTNAME]': guestInfo?.firstName,
      '[GUEST_LASTNAME]': guestInfo?.lastName,
      '[GUEST_FULLNAME]': `${guestInfo?.firstName} ${guestInfo?.lastName}`,
      '[USER_FIRSTNAME]': userInfo?.firstName,
      '[USER_LASTNAME]': userInfo?.lastName,
      '[USER_FULLNAME]': `${userInfo?.firstName} ${userInfo?.lastName}`,
    };

    if (emailTemplate) {
      const { subject, body } = emailTemplate;
      let emailBody = replaceConstants(body, paramsToReplace);
      const emailSubject = replaceConstants(subject, paramsToReplace);

      // Add Password to emailBody
      if (poll?.password) {
        const guestLink = getFrontendUrl(`guest-acceptance/${poll._id}`);
        emailBody += `<br><br>Your Upplaud Password: ${poll.password}<br/> <strong>CLICK HERE TO GROW OUR AUDIENCE <a href="${guestLink}">${guestLink}</a></strong>`;
      }

      await sendEmail({ to: guestInfo.email, subject: emailSubject, body: emailBody });

      return { msg: 'Email Sent!', success: true };
    }
  }

  return { msg: 'Email not sent!', success: false };
}

module.exports = router;
module.exports.getPoll = getPoll;
module.exports.createPollSharingImage = createPollSharingImage;
