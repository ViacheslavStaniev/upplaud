const express = require("express");
const { getPoll } = require("./guests");
const { POLL_STATUS } = require("../models/Guest");
const { getS3Path } = require("../helpers/s3Helper");

const router = express.Router();

// @route   GET poll/:id
// @desc    Get poll by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    // Query on this poll id
    const poll = await getPoll(req.params.id);
    if (!poll) return res.status(400).json({ msg: "Poll not found" });

    const { status, pollImageSrc } = poll;
    if (status !== POLL_STATUS.PUBLISHED) return res.status(400).json({ msg: "Poll not published" });
    if (!pollImageSrc) return res.status(400).json({ msg: "Poll image not found" });

    const responseData = {
      title: "Dynamic Title",
      description: "Dynamic title",
      openGraph: {
        title: "OG title",
        description: "OG description",
        image: {
          alt: "OG image alt",
          url: getS3Path(pollImageSrc),
        },
      },
    };

    console.log("req.params.id", req.params.id);
    res.render("index", { data: responseData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
