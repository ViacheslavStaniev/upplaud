const express = require("express");
const Guest = require("../models/Guest");
const Image = require("../models/Image");
const PollImage = require("../models/PollImage");
const verifyAuth = require("../config/verifyAuth");
const { USER_TYPE } = require("../models/User");
const { uploadImage } = require("../helpers/s3Helper");
const { randomString } = require("../helpers/utills");
const { POLL_STATUS, GUEST_TYPE } = require("../models/Guest");
const { createOrUpdateGuestUser, getBasicUserInfo, updateUserInfo } = require("./users");

const router = express.Router();

// @route   GET api/guests/guestId
// @desc    gets guest details
// @access  Public
router.get("/:guestId", verifyAuth, async (req, res) => {
  try {
    const guest = await getPoll(req.params.guestId);

    res.json(guest);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/guests
// @desc    Creates a Guest
// @access  Public
router.post("/", verifyAuth, async (req, res) => {
  const {
    guest = null,
    hostOfferUrl = "",
    guestOfferUrl = "",
    potentialTopics = [],
    status = POLL_STATUS.DRAFT,
    recordingDate = new Date(),
    startHostAutomation = false,
    guestType = GUEST_TYPE.HOST_GUEST,
  } = req.body;

  const session = await Guest.startSession();
  const options = { session };
  session.startTransaction();

  try {
    const hostUser = await getBasicUserInfo(req.userId);

    if (!hostUser) return res.status(400).send({ errors: ["Unauthorised"] });
    else if (!hostUser?.show) {
      return res.status(400).send({ errors: ["You haven't added your show info. Please add your show info first."] });
    }

    // Poll info
    const pollInfo = {
      status,
      guestType,
      hostOfferUrl,
      guestOfferUrl,
      recordingDate,
      potentialTopics,
      startHostAutomation,
      show: hostUser.show,
    };

    // Create Guest User && update it if guestType is not SOLO_SESSION
    if (guestType !== GUEST_TYPE.SOLO_SESSION) {
      const { fullName = "", email = "", phone = "", about = "", picture = "" } = guest;
      const nameArr = fullName.split(" ");
      const firstName = nameArr.shift();
      const lastName = nameArr.join(" ");

      const newUser = await createOrUpdateGuestUser(firstName, lastName, email, randomString(8), USER_TYPE.GUEST);
      if (newUser) await updateUserInfo(newUser._id, { profile: { ...newUser.profile, phone, about, picture } });

      // Current Host is a Guest for another show
      const isGuestSpeaker = guestType === GUEST_TYPE.GUEST_SPEAKER;

      pollInfo.guest = isGuestSpeaker ? hostUser._id : newUser?._id;

      // there are no details for show
      if (isGuestSpeaker) pollInfo.show = null;
    } else pollInfo.guest = hostUser._id; // if guestType is SOLO_SESSION, then guest will be HostUser

    // Create new Poll
    const poll = new Guest(pollInfo);
    await poll.save(options);

    await session.commitTransaction();
    session.endSession();

    res.json(await getPoll(poll._id));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   PUT api/guests/:pollId
// @desc    Updates a Poll
// @access  Public
router.put("/:pollId", verifyAuth, async (req, res) => {
  const {
    guest = null,
    hostOfferUrl = "",
    guestOfferUrl = "",
    potentialTopics = [],
    status = POLL_STATUS.DRAFT,
    recordingDate = new Date(),
    startHostAutomation = false,
    guestType = GUEST_TYPE.HOST_GUEST,
  } = req.body;

  const pollId = req.params.pollId;

  const session = await Guest.startSession();
  session.startTransaction();

  try {
    const poll = await getPoll(pollId);
    if (!poll) {
      return res.status(400).send({ errors: ["Invalid automations details. Please make sure you're updating the right automation."] });
    }

    // Host User
    const hostUser = await getBasicUserInfo(req.userId);

    // Poll info
    const pollInfo = {
      status,
      guestType,
      hostOfferUrl,
      guestOfferUrl,
      recordingDate,
      potentialTopics,
      startHostAutomation,
      show: hostUser.show,
    };

    // Create Guest User && update it if guestType is not SOLO_SESSION
    if (guestType !== GUEST_TYPE.SOLO_SESSION) {
      const { fullName = "", phone = "", about = "", picture = "" } = guest;
      const nameArr = fullName.split(" ");
      const firstName = nameArr.shift();
      const lastName = nameArr.join(" ");

      const userObj = poll.guest;
      if (userObj) await updateUserInfo(userObj._id, { firstName, lastName, profile: { ...userObj.profile, phone, about, picture } });

      const isGuestSpeaker = guestType === GUEST_TYPE.GUEST_SPEAKER;
      pollInfo.guest = isGuestSpeaker ? hostUser._id : userObj?._id;

      // there are no details for show
      if (isGuestSpeaker) pollInfo.show = null;
    } else pollInfo.guest = hostUser._id; // if guestType is SOLO_SESSION, then guest will be HostUser

    // Update PollINfo
    await Guest.findByIdAndUpdate(pollId, pollInfo);

    await session.commitTransaction();
    session.endSession();

    res.json(await getPoll(pollId));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   DELETE api/guests
// @desc    Deletes a Guest
// @access  Public
router.delete("/:guestId", verifyAuth, async (req, res) => {
  const session = await Guest.startSession();
  session.startTransaction();

  try {
    await Guest.findByIdAndDelete(req.params.guestId);

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: "Guest deleted successfully." });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/guests/batch-delete
// @desc    Batch Delete
// @access  Public
router.post("/batch-delete", verifyAuth, async (req, res) => {
  const session = await Guest.startSession();
  session.startTransaction();

  const { ids } = req.body;

  try {
    await Guest.deleteMany({ _id: { $in: ids } });

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: "Guests deleted successfully." });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   GET api/guests/list/showId
// @desc    gets list of all guests for a show
// @access  Public
router.get("/list/:showId", verifyAuth, async (req, res) => {
  try {
    const guestList = await Guest.find({ show: req.params.showId }).populate("guest show pollImageInfo");

    res.json(guestList);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   GET api/guests/list/userId
// @desc    Fetchs the list of shows for which the current users is the guest.
// @access  Public
router.get("/list/:userId", verifyAuth, async (req, res) => {
  try {
    const guestList = await Guest.find({ guest: req.params.showId }).populate("guest").populate("show");

    res.json(guestList);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   GET api/guests/images/:guestId
// @desc    gets guest images
// @access  Public
router.get("/images/:guestId", verifyAuth, async (req, res) => {
  try {
    const images = await Image.find({ guest: req.params.guestId });
    res.json(images);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/guests/images/:guestId
// @desc    creates guest images
// @access  Public
router.post("/images/:guestId", verifyAuth, async (req, res) => {
  const { name, imageData } = req.body;

  try {
    const image = new Image({ name, guest: req.params.guestId });

    if (imageData) image.s3Path = await uploadImage(imageData, `${req.params.guestId}/images`);

    await image.save();

    res.json(image);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/guests/poll-image-info/:pollId
// @desc    Save Poll Image Info
// @access  Public
router.post("/poll-image-info/:pollId", verifyAuth, async (req, res) => {
  const { logo = "", footer = {}, header = {} } = req.body;

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
    res.status(500).send("Internal Server Error");
  }
});

// @route   PUT api/guests/poll-image-info/:pollImageId
// @desc    Update Poll Image Info
// @access  Public
router.put("/poll-image-info/:pollImageId", verifyAuth, async (req, res) => {
  const { logo = "", footer = {}, header = {} } = req.body;

  try {
    await PollImage.findByIdAndUpdate(req.params.pollImageId, { logo, footer, header });

    res.json({ msg: "Poll Image Info updated successfully." });
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

async function getPoll(pollId) {
  return await Guest.findById(pollId).populate("guest show pollImageInfo");
}

module.exports = router;
module.exports.getPoll = getPoll;
