const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: { type: String },
    socialAccounts: {
      facebook: {
        profileLink: String,
        accessToken: Object,
        isConnected: { type: Boolean, default: false },
      },
      linkedin: {
        profileLink: String,
        accessToken: Object,
        isConnected: { type: Boolean, default: false },
      },
      instagram: {
        profileLink: String,
        accessToken: Object,
        isConnected: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Account", AccountSchema);
