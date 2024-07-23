const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AsqsSchema = new Schema(
  {
    question: String,
    audioLink: String,
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    connectionOf: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    podcast: {
      ref: "Podcast",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Asqs", AsqsSchema);
