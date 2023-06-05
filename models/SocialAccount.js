const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MEDIA_TYPE
const TYPE_FACEBOOK = "FB";
const TYPE_LINKEDIN = "LN";
const TYPE_INSTAGRAM = "IN";

const subDefaultObj = { socialId: "", accessToken: null, refreshToken: null, expires: null, isConnected: false };

const SocialAccountSchema = new Schema(
  {
    user: { ref: "User", type: Schema.Types.ObjectId },
    type: {
      type: String,
      default: TYPE_FACEBOOK,
    },
    page: {
      type: Object,
      default: subDefaultObj,
    },
    group: {
      type: Object,
      default: subDefaultObj,
    },
    profile: {
      type: Object,
      default: subDefaultObj,
    },
    publicUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = SocialAccount = mongoose.model("SocialAccount", SocialAccountSchema);
module.exports.SOCIAL_TYPE_FACEBOOK = TYPE_FACEBOOK;
module.exports.SOCIAL_TYPE_LINKEDIN = TYPE_LINKEDIN;
module.exports.SOCIAL_TYPE_INSTAGRAM = TYPE_INSTAGRAM;
