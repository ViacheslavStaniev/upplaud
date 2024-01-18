const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GUEST_TYPE = {
  HOST_GUEST: "HOST_GUEST",
  SOLO_SESSION: "SOLO_SESSION",
  GUEST_SPEAKER: "GUEST_SPEAKER",
};

const POLL_STATUS = { DRAFT: "DRAFT", PUBLISHED: "PUBLISHED" };

const GuestSchema = new Schema(
  {
    potentialTopics: [{ type: String }],
    hostOfferUrl: { type: String, default: "" },
    guestOfferUrl: { type: String, default: "" },
    hostSpeakerLabel: { type: String, default: "" },
    guestSpeakerLabel: { type: String, default: "" },
    socialShareFileSrc: { type: String, default: "" },
    recordingDate: { type: Date, default: new Date() },
    startHostAutomation: { type: Boolean, default: false },
    user: { ref: "User", type: Schema.Types.ObjectId },
    guest: { ref: "User", type: Schema.Types.ObjectId },
    audio: { ref: "UserFile", type: Schema.Types.ObjectId },
    pollImageSrc: { type: String, default: "" },
    pollImageInfo: { ref: "PollImage", type: Schema.Types.ObjectId },
    status: { type: String, enum: Object.values(POLL_STATUS), default: POLL_STATUS.DRAFT },
    guestType: { type: String, enum: Object.values(GUEST_TYPE), default: GUEST_TYPE.HOST_GUEST },
    socials: [{ ref: "SocialPosting", type: Schema.Types.ObjectId }],
    emailTemplate: { type: Object, default: { subject: "", body: "" } },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = Guest = mongoose.model("Guest", GuestSchema);
module.exports.GUEST_TYPE = GUEST_TYPE;
module.exports.POLL_STATUS = POLL_STATUS;
