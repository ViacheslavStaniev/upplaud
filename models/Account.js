const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: { type: String },
    socialAccounts: {
      FACEBOOK: {
        profileLink: String,
        accessToken: Object,
        isConnected: { type: Boolean, default: false },
      },
      LINKEDIN: {
        profileLink: String,
        accessToken: Object,
        isConnected: { type: Boolean, default: false },
      },
      INSTAGRAM: {
        profileLink: String,
        accessToken: Object,
        isConnected: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Account", AccountSchema);
