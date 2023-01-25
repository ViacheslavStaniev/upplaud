const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Guest Status
const STATUS_INACTIVE = 0;
const STATUS_ACTIVE = 1;
const STATUS_DELETED = 2;

// Automate State
const AUTOMATED_NO = 0;
const AUTOMATED_YES = 1;

const PodcastSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: String,
    status: {
      type: Number,
      default: STATUS_ACTIVE,
    },
    recordingDate: {
      type: Date,
      default: Date.now,
    },
    isAutomated: {
      type: Boolean,
      default: AUTOMATED_NO,
    },
    guest: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    show: {
      ref: "Show",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Podcast", PodcastSchema);
