const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GUEST_TYPE = {
  HOST_GUEST: "HOST_GUEST",
  SOLO_SESSION: "SOLO_SESSION",
  GUEST_SPEAKER: "GUEST_SPEAKER",
};

const GuestSchema = new Schema(
  {
    potentialTopics: [{ type: String }],
    withGuest: { type: Boolean, default: true },
    hostOfferUrl: { type: String, default: "" },
    guestOfferUrl: { type: String, default: "" },
    recordingDate: { type: Date, default: new Date() },
    startHostAutomation: { type: Boolean, default: false },
    show: { ref: "Show", type: Schema.Types.ObjectId },
    guest: { ref: "User", type: Schema.Types.ObjectId },
    pollImage: { ref: "PollImage", type: Schema.Types.ObjectId },
    guestType: { type: String, enum: Object.values(GUEST_TYPE), default: GUEST_TYPE.HOST_GUEST },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = Guest = mongoose.model("Guest", GuestSchema);
