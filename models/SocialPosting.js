const mongoose = require("mongoose");
const { SOCIAL_TYPE, SOCIAL_SUB_TYPE } = require("./SocialAccount");
const Schema = mongoose.Schema;

const SocialPostingSchema = new Schema(
  {
    poll: {
      ref: "Guest",
      type: Schema.Types.ObjectId,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    type: {
      type: String,
      default: SOCIAL_TYPE.FACEBOOK,
    },
    subType: {
      type: String,
      default: SOCIAL_SUB_TYPE.PROFILE,
    },
    subTypeId: {
      type: String,
      default: "",
    },
    subTypeName: {
      type: String,
      default: "",
    },
    frequency: {
      type: Number,
      default: 4,
    },
    frequencyPosted: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = SocialPosting = mongoose.model("SocialPosting", SocialPostingSchema);
