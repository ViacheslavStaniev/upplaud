const express = require("express");
const Guest = require("../models/Guest");
const verifyAuth = require("../config/verifyAuth");
const { randomString } = require("../helpers/utills");
const { createOrUpdateGuestUser, getBasicUserInfo, updateUserInfo } = require("./users");

const router = express.Router();

// @route   GET api/guests/guestId
// @desc    gets guest details
// @access  Public
router.get("/:guestId", verifyAuth, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.guestId).populate("guest").populate("show");

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
    recordingDate,
    firstName,
    lastName,
    email,
    cellPhone,
    linkedinUrl,
    freebieUrl,
    potentialTopics,
    withGuest,
    startHostAutomation,
  } = req.body;

  const session = await Guest.startSession();
  const options = { session };
  session.startTransaction();

  try {
    const adminUser = await getBasicUserInfo(req.userId);

    if (!adminUser) return res.status(400).send({ errors: ["Unauthorised"] });
    else if (!adminUser.show) {
      return res.status(400).send({ errors: ["You haven't updated your show info. Please update your show info first."] });
    }

    // Create Guest User && update it
    let guestUser;
    if (withGuest) {
      guestUser = await createOrUpdateGuestUser(firstName, lastName, email, randomString(12));
      if (guestUser) {
        const updateInfo = {
          profile: { ...guestUser.profile, phone: cellPhone },
          socialAccounts: {
            ...guestUser.socialAccounts,
            linkedin: { ...guestUser.socialAccounts.linkedin, profileLink: linkedinUrl },
          },
        };
        await updateUserInfo(guestUser._id, updateInfo);
      }
    }

    // Create Guest
    const guest = new Guest({
      withGuest,
      freebieUrl,
      recordingDate,
      potentialTopics,
      startHostAutomation,
      show: adminUser.show,
      guest: withGuest ? guestUser._id : null,
    });

    await guest.save(options);

    await session.commitTransaction();
    session.endSession();

    const guest2 = await Guest.findById(guest._id).populate("show").populate("guest");
    res.json(guest2);
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
    cellPhone,
    linkedinUrl,
    freebieUrl,
    potentialTopics,
    withGuest,
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
    if (withGuest && guestUser) {
      const updateInfo = {
        email,
        lastName,
        firstName,
        profile: { ...guestUser.profile, phone: cellPhone },
        socialAccounts: {
          ...guestUser.socialAccounts,
          linkedin: { ...guestUser.socialAccounts.linkedin, profileLink: linkedinUrl },
        },
      };
      await updateUserInfo(guestUser._id, updateInfo);
    }

    const info = {
      withGuest,
      freebieUrl,
      recordingDate,
      potentialTopics,
      startHostAutomation,
      guest: withGuest ? guestUser._id : null,
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
    const guestList = await Guest.find({ show: req.params.showId }).populate("guest").populate("show");

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

module.exports = router;
