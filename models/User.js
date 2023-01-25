const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Authentication status
const STATUS_ACTIVE = 0;
const STATUS_INACTIVE = 1;
const STATUS_DELETED = 2;

// Gender types
const GENDER_UNKNOWN = -1;
const GENDER_FEMALE = 0;
const GENDER_MALE = 1;

// ADMIN
const IS_ADMIN_NO = 0;
const IS_ADMIN_YES = 1;

const UserSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      last: String,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email address is not valid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      dob: Date,
      displayPic: String,
      gender: {
        type: Number,
        default: GENDER_UNKNOWN,
      },
    },
    timezone: {
      type: String,
      default: "Asia/Singapore",
    },
    status: {
      type: Number,
      default: STATUS_INACTIVE,
    },
    resetToken: "",
    isAdmin: {
      type: Number,
      default: IS_ADMIN_NO,
    },
    prefix: String,
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
global.IS_ADMIN_NO = IS_ADMIN_NO;
global.IS_ADMIN_YES = IS_ADMIN_YES;
