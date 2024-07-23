const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Automated
const AUTOMATED = { NO: 0, YES: 1 };
// Status
const STATUS = { ACTIVE: 1, INACTIVE: 0, DELETED: 2 };

const PodcastSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: String,
    status: {
      type: Number,
      default: STATUS.ACTIVE,
    },
    recordingDate: {
      type: Date,
      default: Date.now,
    },
    isAutomated: {
      type: Boolean,
      default: AUTOMATED.NO,
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
