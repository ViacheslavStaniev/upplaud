const multer = require("multer");
const express = require("express");
const UserFile = require("../models/UserFile");
const PollImage = require("../models/PollImage");
const verifyAuth = require("../config/verifyAuth");
const { FILE_TYPE } = require("../models/UserFile");
const { uploadImage, uploadFile } = require("../helpers/s3Helper");

const router = express.Router();

// Multer middleware for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

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

// @route   GET api/files
// @desc    gets users files
// @access  Public
router.get("/", verifyAuth, async (req, res) => {
  try {
    const files = await UserFile.find({ user: req.userId });
    res.json(files);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/files/image
// @desc    creates guest image
// @access  Public
router.post("/image", verifyAuth, async (req, res) => {
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

// @route POST api/files/audio
// @desc  creates guest audio
// @access Public
router.post("/audio", verifyAuth, upload.single("audio"), async (req, res) => {
  try {
    const userId = req.userId;
    const duration = req.body?.duration || 0;
    const name = req.file.originalname || `Recording_${Date.now()}.webm`;
    const s3Path = await uploadFile(req.file.buffer, `${userId}/audios`, name);

    // Save User File
    const file = new UserFile({ name, duration, user: userId, type: FILE_TYPE.AUDIO, s3Path });
    await file.save();

    res.json(file);
  } catch (error) {
    console.error({ msg: error.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/files/bulk
// @desc    creates bulk user images
// @access  Public
router.post("/image/bulk", verifyAuth, async (req, res) => {
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

// @route   DELETE api/files/:fileId
// @desc    deletes users images
// @access  Public
router.delete("/:fileId", verifyAuth, async (req, res) => {
  try {
    const file = await UserFile.findById(req.params.fileId);
    if (!file) return res.status(404).json({ msg: "File not found" });
    if (file.user.toString() !== req.userId) return res.status(401).json({ msg: "Unauthorized" });
    await file.remove();
    res.json({ msg: "File deleted" });
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route POST api/images/upload2s3
// @desc  Uploads an image to S3 and give the path
// @access Public
router.post("/upload2s3", verifyAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { imageData } = req.body;
    const s3Path = await uploadImage(imageData, `${userId}/images/pictures`);
    res.json({ s3Path });
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// Create UserImage Helper
async function createUserImage(name, imageData, userId) {
  const file = new UserFile({ name, user: userId, type: FILE_TYPE.IMAGE });
  if (imageData) file.s3Path = await uploadImage(imageData, `${userId}/images`);
  await file.save();
  return file;
}

module.exports = router;
module.exports.createUserImage = createUserImage;
