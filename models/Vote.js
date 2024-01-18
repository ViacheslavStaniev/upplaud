const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema(
  {
    poll: {
      ref: "Guest",
      type: Schema.Types.ObjectId,
    },
    selectedTopic: {
      type: Object,
      required: true,
      default: { topic: "", index: 0 },
    },
    voter: {
      type: Object,
      required: true,
      default: { name: "", email: "", cell_phone: "" },
    },
    suggestions: {
      type: Object,
      default: { topic: "", speaker: "" },
    },
    questionnaireAnswers: {
      type: Array,
      default: [],
    },
    isSuggestion: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = Vote = mongoose.model("Vote", VoteSchema);
