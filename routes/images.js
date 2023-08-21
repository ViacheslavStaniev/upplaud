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

// @route   GET api/images
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

// @route   POST api/images
// @desc    creates guest images
// @access  Public
router.post("/", verifyAuth, async (req, res) => {
  try {
    const { name, imageData } = req.body;
    const result = await createUserImage(name, imageData, req.userId);
    res.json(result);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/images/bulk
// @desc    creates bulk user images
// @access  Public
router.post("/bulk", verifyAuth, async (req, res) => {
  try {
    const { images } = req.body;
    const result = await Promise.all(images.map(async ({ name, imageData }) => await createUserImage(name, imageData, req.userId)));
    res.json(result);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   DELETE api/images/:imageId
// @desc    deletes users images
// @access  Public
router.delete("/:imageId", verifyAuth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.imageId);
    if (!image) return res.status(404).json({ msg: "Image not found" });
    if (image.user.toString() !== req.userId) return res.status(401).json({ msg: "Unauthorized" });
    await image.remove();
    res.json({ msg: "Image deleted" });
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// Create User Image Helper
async function createUserImage(name, imageData, userId) {
  const image = new Image({ name, user: userId });
  if (imageData) image.s3Path = await uploadImage(imageData, `${userId}/images`);
  await image.save();
  return image;
}

module.exports = router;
module.exports.createUserImage = createUserImage;
