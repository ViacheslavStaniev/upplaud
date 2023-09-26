const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { USER_TYPE } = require("../models/User");
const { ServiceError } = require("./errors");
const verifyAuth = require("../config/verifyAuth");
const { createUsername } = require("../helpers/utills");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route   POST api/user
// @desc    UPDATE current logged-in user
// @access  Public
router.put("/", [check("email", "Please enter a valid email address").isEmail()], verifyAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ errors: ["User doesn't exists. Please login again."] });

    const { firstName, lastName, email, userName, profile } = req.body;

    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) {
      const isTaken = await isUserNameTaken(req.userId, req.body.userName);
      if (isTaken) return res.status(400).json({ errors: ["Suffix already taken by another user. Please choose another one."] });

      user.userName = userName;
    }
    if (profile) user.profile = { ...user.profile, ...profile };

    await user.save();

    res.json(user);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/user/checksusername
// @desc    checks is current username is taken by anyone or not
// @access  Public
router.post(
  "/checksusername",
  [check("userName", "Please enter a valid userName").exists().notEmpty()],
  verifyAuth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const isTaken = await isUserNameTaken(req.userId, req.body.userName);

      res.json({ isTaken });
    } catch (err) {
      // throw err;
      console.error({ msg: err.message });
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route   POST api/users/changePassword
// @desc    Changes user password
// @access  Public
router.post(
  "/changePassword",
  [
    check("oldPassword", "Please enter your password with 6 or more characters").isLength({ min: 6 }),
    check("newPassword", "Please enter your password with 6 or more characters").isLength({ min: 6 }),
  ],
  verifyAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { oldPassword, newPassword } = req.body;

    const session = await User.startSession();
    const options = { session };
    session.startTransaction();

    try {
      const user = User.findById(req.userId);
      if (!user) return res.status(400).json([{ msg: "User doesn't exists." }]);

      const salt = await bcrypt.genSalt(10);
      const prePassword = await bcrypt.hash(oldPassword, salt);
      if (user.password !== prePassword) return res.status(400).json([{ msg: "Please enter your corret old password." }]);

      user.password = await bcrypt.hash(newPassword, salt);
      user.save(options);

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json([{ msg: "Your password has been changed successfully." }]);
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      if (err.name === "ServiceError") return res.status(400).json({ errors: [{ msg: err.message }] });
      else throw err;
    }
  }
);

// @route   POST api/users/connect/:type/:subType/:selected
// @desc    Connect user with facebook/linkedin page/group account
// @access  Public
router.get("/connect/:type/:subType/:selected", verifyAuth, async (req, res) => {
  const { type, subType, selected } = req.params;

  try {
    const user = await User.findById(req.userId).populate("socialAccounts");
    if (!user) throw new Error("user not found.");

    // Update social account
    const socialAccount = user.socialAccounts.find((s) => s.type === type);
    if (socialAccount) {
      socialAccount[subType] = { ...socialAccount[subType], socialId: selected, isConnected: true };
      await socialAccount.save();
    }

    res.status(200).json({ socialAccount, error: false, msg: "Account connected successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: error?.message });
  }
});

async function isUserNameTaken(userId, userName) {
  const user = await User.findOne({ userName: userName, _id: { $ne: userId } });
  return user !== null;
}

async function getUserInfo(userId) {
  return await User.findById(userId).select("-password -resetToken").populate("show").populate("socialAccounts");
}

async function getBasicUserInfo(userId) {
  return await User.findById(userId);
}

async function updateUserInfo(userId, info) {
  return await User.findByIdAndUpdate(userId, info);
}

async function createOrUpdateGuestUser(firstName, lastName, email, password, type = USER_TYPE.GUEST) {
  const userExists = await User.findOne({ email });
  if (userExists) return await updateUserInfo(userExists._id, { firstName, lastName, type });

  return await register(firstName, lastName, email, password, "", type);
}

async function register(firstName, lastName, email, password, timezone = "", type = USER_TYPE.GUEST) {
  const user = new User({ firstName, lastName, email, password, timezone, type });

  const session = await User.startSession();
  const options = { session };
  session.startTransaction();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.userName = createUsername({ firstName, lastName });
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
module.exports.updateUserInfo = updateUserInfo;
module.exports.getBasicUserInfo = getBasicUserInfo;
module.exports.createOrUpdateGuestUser = createOrUpdateGuestUser;
