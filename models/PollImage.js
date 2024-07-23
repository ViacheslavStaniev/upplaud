const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollImageSchema = new Schema(
  {
    poll: { ref: "Guest", type: Schema.Types.ObjectId },
    logo: { ref: "Image", type: Schema.Types.ObjectId },
    footer: {
      text: { type: String, default: "" },
      bgColor: { type: String, default: "" },
      textColor: { type: String, default: "" },
    },
    header: {
      text: { type: String, default: "" },
      bgColor: { type: String, default: "" },
      textColor: { type: String, default: "" },
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = PollImage = mongoose.model("PollImage", PollImageSchema);
