const express = require("express");
const Show = require("../models/Show");
const verifyAuth = require("../config/verifyAuth");
const { updateUserInfo } = require("./users");
const { uploadImage } = require("../helpers/s3Helper");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route   GET api/show/showId
// @desc    gets show details
// @access  Public
router.get("/:showId", verifyAuth, async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId).populate("host");

    res.json(show);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/show
// @desc    Creates a show
// @access  Public
router.post(
  "/",
  [check("website", "Please enter a valid website").isURL(), check("name", "Show name is required").notEmpty()],
  verifyAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, website, logo } = req.body;

    const session = await Show.startSession();
    const options = { session };
    session.startTransaction();

    try {
      const show = new Show({ name, website });

      if (logo) show.logo = await uploadImage(logo, `${req.userId}/logos`); // Upload Logo

      await show.save(options);

      // Update user
      await updateUserInfo(req.userId, { show: show._id });

      await session.commitTransaction();
      session.endSession();

      res.json({ show });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route   PUTT api/show
// @desc    Updates a show
// @access  Public
router.put(
  "/:showId",
  [check("website", "Please enter a valid website").isURL(), check("name", "Show name is required").notEmpty()],
  verifyAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, website, logo } = req.body;

    const session = await Show.startSession();
    session.startTransaction();

    try {
      const info = { name, website };
      if (logo && logo.startsWith("data")) info.logo = await uploadImage(logo, `${req.userId}/logos`); // Upload Logo

      const show = await Show.findByIdAndUpdate(req.params.showId, info);

      await session.commitTransaction();
      session.endSession();

      res.json({ show });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
