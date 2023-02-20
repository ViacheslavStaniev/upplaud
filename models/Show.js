const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowSchema = new Schema(
  {
    name: String,
    logo: String,
    website: String,
    host: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("Show", ShowSchema);
