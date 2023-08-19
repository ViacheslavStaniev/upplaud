const express = require("express");
const Image = require("../models/Image");
const PollImage = require("../models/PollImage");
const verifyAuth = require("../config/verifyAuth");
const { uploadImage } = require("../helpers/s3Helper");

const router = express.Router();

// @route   GET api/poll-images/:pollId
// @desc    gets guest poll images
// @access  Public
router.get("/poll-images/:pollId", verifyAuth, async (req, res) => {
  try {
    const images = await PollImage.find({ guest: req.params.pollId });
    res.json(images);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   GET api/images/:userId
// @desc    gets users images
// @access  Public
router.get("/", verifyAuth, async (req, res) => {
  try {
    const images = await Image.find({ user: req.userId });
    res.json(images);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/images/:userId
// @desc    creates guest images
// @access  Public
router.post("/", verifyAuth, async (req, res) => {
  const userId = req.userId;
  const { images } = req.body;

  try {
    const result = await Promise.all(
      images.map(async ({ name, imageData }) => {
        const image = new Image({ name, user: userId });
        if (imageData) image.s3Path = await uploadImage(imageData, `${userId}/images`);
        await image.save();
        return image;
      })
    );
    res.json(result);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
