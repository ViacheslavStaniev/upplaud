const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestSchema = new Schema(
  {
    potentialTopics: [{ type: String }],
    freebieUrl: { type: String, default: "" },
    withGuest: { type: Boolean, default: true },
    recordingDate: { type: Date, default: new Date() },
    startHostAutomation: { type: Boolean, default: false },
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

module.exports = User = mongoose.model("Guest", GuestSchema);
