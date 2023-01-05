const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Authentication status
const STATUS_ACTIVE = 0;
const STATUS_INACTIVE = 1;
const STATUS_DELETED = 2;

// Access permissions
const ROLE_READ_ALL = 0;
const ROLE_WRITE_ALL = 1;
const ROLE_WRITE_OWN = 2;

// Gender types
const GENDER_UNKNOWN = -1;
const GENDER_FEMALE = 0;
const GENDER_MALE = 1;

// LOGGED_IN_VIA
const GOOGLE_LOGIN = 1;
const ONELOGIN_LOGIN = 2;

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
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email address is not valid",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      displayPic: {
        type: String,
      },
      dob: {
        type: Date,
      },
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
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    memberIn: {
      account: [
        {
          account: {
            type: Schema.Types.ObjectId,
            ref: "Account",
          },
          role: {
            type: Number,
            default: ROLE_READ_ALL,
            // validate: {} //add validator
          },
        },
      ],
      select: false,
    },
    resetToken: "",
    isAdmin: {
      type: Number,
      default: IS_ADMIN_NO,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
global.GOOGLE_LOGIN = GOOGLE_LOGIN;
global.ONELOGIN_LOGIN = ONELOGIN_LOGIN;
global.IS_ADMIN_NO = IS_ADMIN_NO;
global.IS_ADMIN_YES = IS_ADMIN_YES;
