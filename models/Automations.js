const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutomationsSchema = new Schema(
  {
    taskToDo: String,
    asqs: {
      ref: "Asqs",
      type: Schema.Types.ObjectId,
    },
    status: {
      guest: {
        postingCount: { type: Number, default: 0 },
        lastPostedAt: { type: Date, default: Date.now },
        isPosting: { type: Boolean, default: POSTING_NO },
      },
      host: {
        postingCount: { type: Number, default: 0 },
        lastPostedAt: { type: Date, default: Date.now },
        isPosting: { type: Boolean, default: POSTING_NO },
      },
    },
    podcast: {
      ref: "Podcast",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Automations", AutomationsSchema);
