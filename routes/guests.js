const express = require("express");
const User = require("../models/User");
const Guest = require("../models/Guest");
const Image = require("../models/Image");
const PollImage = require("../models/PollImage");
const verifyAuth = require("../config/verifyAuth");
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

  console.log("req.body", req.body);

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
      const { fullName = "", email = "", cellPhone = "", about = "", picture = "" } = guest;
      const nameArr = fullName.split(" ");
      const firstName = nameArr.shift();
      const lastName = nameArr.join(" ");

      const guestUser = new User({ email, lastName, firstName, profile: { cellPhone, about, picture } });

      console.log(guestUser);

      // const guestUser2 = await createOrUpdateGuestUser(firstName, lastName, email, randomString(12));
      // if (guestUser) {
      //   const updateInfo = {
      //     profile: { ...guestUser.profile, phone: cellPhone, about, headshotUrl },
      //     socialAccounts: {
      //       ...guestUser.socialAccounts,
      //       linkedin: { ...guestUser.socialAccounts.linkedin, profileLink: linkedinUrl },
      //     },
      //   };
      //   await updateUserInfo(guestUser._id, updateInfo);
      // }

      pollInfo.guest = guestUser._id;
    } else pollInfo.guest = null; // if guestType is SOLO_SESSION, then guest will be null

    console.log("pollInfo", pollInfo);

    // Create new Poll
    const poll = new Guest(pollInfo);
    await poll.save(options);

    await session.commitTransaction();
    session.endSession();

    console.log("poll", poll);

    res.json(await getPoll(poll._id));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// @route   PUT api/guests
// @desc    Updates a Guest
// @access  Public
router.put("/:guestId", verifyAuth, async (req, res) => {
  const {
    recordingDate,
    firstName,
    lastName,
    email,
    about = "",
    cellPhone,
    linkedinUrl,
    headshotUrl = "",
    potentialTopics,
    guestType,
    hostOfferUrl = "",
    guestOfferUrl = "",
    startHostAutomation,
  } = req.body;

  const session = await Guest.startSession();
  session.startTransaction();

  try {
    const guestData = await Guest.findById(req.params.guestId).populate("guest");
    if (!guestData) {
      return res.status(400).send({ errors: ["Invalid automations details. Please make sure you're updating the right automation."] });
    }

    // update guest user
    const guestUser = guestData?.guest;
    if (guestUser) {
      const updateInfo = {
        email,
        lastName,
        firstName,
        profile: { ...guestUser.profile, phone: cellPhone, about, headshotUrl },
        socialAccounts: {
          ...guestUser.socialAccounts,
          linkedin: { ...guestUser.socialAccounts.linkedin, profileLink: linkedinUrl },
        },
      };
      await updateUserInfo(guestUser._id, updateInfo);
    }

    const info = {
      guestType,
      recordingDate,
      hostOfferUrl,
      guestOfferUrl,
      potentialTopics,
      startHostAutomation,
      show: adminUser.show,
      guest: guestUser._id,
    };

    const guest = await Guest.findByIdAndUpdate(req.params.guestId, info);

    await session.commitTransaction();
    session.endSession();

    res.json(guest);
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
