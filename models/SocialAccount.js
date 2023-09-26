const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Social Type
const SOCIAL_TYPE = { FACEBOOK: "FB", LINKEDIN: "LN", INSTAGRAM: "IN" };

// Social Sub Type
const SOCIAL_SUB_TYPE = { PROFILE: "profile", PAGE: "page", GROUP: "group" };

const subDefaultObj = {
  socialId: "",
  accounts: [],
  accessToken: null,
  refreshToken: null,
  isConnected: false,
  expiresInSeconds: null,
};

const SocialAccountSchema = new Schema(
  {
    user: { ref: "User", type: Schema.Types.ObjectId },
    type: {
      type: String,
      default: SOCIAL_TYPE.FACEBOOK,
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
module.exports.SOCIAL_TYPE = SOCIAL_TYPE;
module.exports.SOCIAL_SUB_TYPE = SOCIAL_SUB_TYPE;
