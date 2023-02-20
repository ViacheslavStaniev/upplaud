const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { ServiceError } = require("./errors");
const { createUsername } = require("../helpers/utills");

const router = express.Router();

async function getUserInfo(userId) {
  return await User.findById(userId).select("-password -resetToken").populate("show");
}

async function register(firstname, lastname, email, password, timezone) {
  const name = { first: firstname, last: lastname };
  const user = new User({ name, email, password, timezone });

  const session = await User.startSession();
  const options = { session };
  session.startTransaction();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.username = createUsername(name);
    await user.save(options);

    await session.commitTransaction();
    session.endSession();

    return await getUserInfo(user.id);
  } catch (err) {
    console.error("Transaction aborted", err);
    await session.abortTransaction();
    session.endSession();

    let msg = 'Internal Service Error"';
    if (err.hasOwnProperty("name") && err.hasOwnProperty("code") && err.name === "MongoError" && err.code === 11000) {
      msg = "User already exists";
    }

    throw new ServiceError(msg);
  }
}

module.exports = router;
module.exports.register = register;
module.exports.getUserInfo = getUserInfo;
