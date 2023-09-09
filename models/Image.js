const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    name: { type: String, default: "" },
    s3Path: { type: String, default: "" },
    user: { ref: "User", type: Schema.Types.ObjectId },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = Image = mongoose.model("Image", ImageSchema);
