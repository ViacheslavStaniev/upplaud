const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Authentication status
const STATUS_ACTIVE = 1;
const STATUS_INACTIVE = 0;
const STATUS_DELETED = -1;

// Gender types
const GENDER_MALE = 1;
const GENDER_FEMALE = 2;
const GENDER_UNKNOWN = 0;

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
    username: {
      type: String,
      default: "",
    },
    timezone: {
      type: String,
      default: "Asia/New Delhi",
    },
    status: {
      type: Number,
      default: STATUS_ACTIVE,
    },
    resetToken: "",
    isAdmin: {
      type: Number,
      default: IS_ADMIN_NO,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    account: {
      ref: "Account",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, autoCreate: true }
);

module.exports = User = mongoose.model("User", UserSchema);
global.IS_ADMIN_NO = IS_ADMIN_NO;
global.IS_ADMIN_YES = IS_ADMIN_YES;
