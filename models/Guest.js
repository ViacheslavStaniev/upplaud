const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestSchema = new Schema(
  {
    asqs: String,
    jobTitle: String,
    taskTodo: String,
    recordingDate: Date,
    potentialTopics: Array,
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    show: {
      ref: "Show",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Guest", GuestSchema);
