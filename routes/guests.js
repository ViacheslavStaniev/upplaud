const express = require("express");
const Guest = require("../models/Guest");
const verifyAuth = require("../config/verifyAuth");
const { randomString } = require("../helpers/utills");
const { check, validationResult } = require("express-validator");
const { createOrUpdateGuestUser, getBasicUserInfo } = require("./users");

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
router.post(
  "/",
  [
    check("firstName", "First Name is required").exists().notEmpty(),
    check("email", "Guest Email is required").isEmail().exists().notEmpty(),
    check("jobTitle", "Guest Job Title/Business name is required").exists().notEmpty(),
    check("potentialTopics", "Potential Topics supposed to be an array of strings").isArray(),
    check("startHostAutomation", "Start Host Automation supposed to be either True or False").isBoolean(),
  ],
  verifyAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, email, jobTitle, recordingDate, potentialTopics, startHostAutomation } = req.body;

    const session = await Guest.startSession();
    const options = { session };
    session.startTransaction();

    try {
      // Create Guest User
      const guestUser = await createOrUpdateGuestUser(firstName, lastName, email, randomString(12));

      const adminUser = await getBasicUserInfo(req.userId);

      if (!adminUser) return res.status(400).send({ errors: ["Unauthorised"] });
      else if (!adminUser.show) {
        return res.status(400).send({ errors: ["You haven't updated your show info. Please update your show info first."] });
      }

      // Create Guest
      const guest = new Guest({
        jobTitle,
        recordingDate,
        potentialTopics,
        startHostAutomation,
        guest: guestUser._id,
        show: adminUser.show,
      });

      await guest.save(options);

      await session.commitTransaction();
      session.endSession();

      res.json(guest);
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route   PUTT api/guests
// @desc    Updates a Guest
// @access  Public
router.put(
  "/:guestId",
  [
    check("jobTitle", "Guest Job Title/Business name is required").exists().notEmpty(),
    check("potentialTopics", "Potential Topics supposed to be an array of strings").isArray(),
    check("startHostAutomation", "Start Host Automation supposed to be either True or False").isBoolean(),
  ],
  verifyAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { jobTitle, recordingDate, potentialTopics, startHostAutomation } = req.body;

    const session = await Guest.startSession();
    session.startTransaction();

    try {
      const info = { jobTitle, recordingDate, potentialTopics, startHostAutomation };

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
  }
);

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

module.exports = router;
