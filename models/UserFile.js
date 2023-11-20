const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FILE_TYPE = { IMAGE: "IMAGE", VIDEO: "VIDEO", AUDIO: "AUDIO" };

const UserFileSchema = new Schema(
  {
    name: { type: String, default: "" },
    s3Path: { type: String, default: "" },
    user: { ref: "User", type: Schema.Types.ObjectId },
    type: { type: String, enum: Object.values(FILE_TYPE), default: FILE_TYPE.IMAGE },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = UserFile = mongoose.model("UserFile", UserFileSchema);
module.exports.FILE_TYPE = FILE_TYPE;
