const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: { type: String, default: "" },
    socialAccounts: {
      facebook: {
        profileLink: { type: String, default: "" },
        accessToken: { type: Object, default: {} },
        isConnected: { type: Boolean, default: false },
      },
      linkedin: {
        profileLink: { type: String, default: "" },
        accessToken: { type: Object, default: {} },
        isConnected: { type: Boolean, default: false },
      },
      instagram: {
        profileLink: { type: String, default: "" },
        accessToken: { type: Object, default: {} },
        isConnected: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Account", AccountSchema);
