const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Guest = require("../models/Guest");
const verifyAuth = require("../config/verifyAuth");
const SocialPosting = require("../models/SocialPosting");
const SocialAccount = require("../models/SocialAccount");
const { ServiceError } = require("./errors");
const { USER_TYPE } = require("../models/User");
const { check, validationResult } = require("express-validator");
const { createUsername, getSocialAutomationDetails } = require("../helpers/utills");

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

// @route   POST api/users/connect/:type/:subType/:id
// @desc    Connect user with facebook/linkedin page/group account
// @access  Public
router.get("/:userId/connect/:type/:subType/:id", async (req, res) => {
  const { type, userId, subType, id } = req?.params;

  try {
    const socialAccount = await SocialAccount.findOne({ user: userId, type });
    if (!socialAccount) throw new Error("SocialAccount doesn't exists.");

    await SocialAccount.findByIdAndUpdate(socialAccount._id, {
      [subType]: { ...socialAccount[subType], socialId: id, askToChoose: false },
    });

    res.status(200).json({ error: false, msg: "Account connected successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: error?.message });
  }
});

// @route   POST api/users/:userId/disconnect/:type
// @desc    Disconnect user from facebook/linkedin page/group account
// @access  Public
router.get("/:userId/disconnect/:type", async (req, res) => {
  try {
    const { type, userId } = req?.params;
    const socialAccount = await SocialAccount.findOne({ user: userId, type });
    if (!socialAccount) throw new Error("SocialAccount doesn't exists.");

    await SocialAccount.findByIdAndUpdate(socialAccount._id, { isConnected: false });

    res.status(200).json({ error: false, msg: "Account disconnected successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: error?.message });
  }
});

// @route   POST api/users/:userId/socials/pollId
// @desc    Get socials of a user
// @access  Public
router.get("/:userId/socials/:pollId", async (req, res) => {
  try {
    const { userId, pollId } = req?.params;
    const socials = await SocialPosting.find({ user: userId, poll: pollId });

    res.status(200).json(socials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: error?.message });
  }
});

// @route   POST api/users/:userId/socials/pollId
// @desc    Save socials of a user
// @access  Public
router.post("/:userId/socials/:pollId", async (req, res) => {
  try {
    const socials = req.body;
    const { userId, pollId } = req?.params;

    if (socials?.length) {
      const poll = await Guest.findById(pollId);

      const socialAccountAccounts = socials.map(
        async ({ type, subType, subTypeName, subTypeId, frequency, isActive = false, isConnected = false }) => {
          const { nextPostDate, daysFrequency, frequencyToBePosted } = getSocialAutomationDetails(poll?.recordingDate, frequency);

          let socialAccount = await SocialPosting.findOne({ poll: pollId, user: userId, type, subType });
          if (socialAccount)
            await SocialPosting.findByIdAndUpdate(socialAccount._id, {
              subTypeId,
              subTypeName,
              frequency,
              isActive,
              nextPostDate,
              daysFrequency,
              frequencyToBePosted,
            });
          else {
            socialAccount = new SocialPosting({
              poll: pollId,
              user: userId,
              type,
              subType,
              subTypeId,
              subTypeName,
              frequency,
              isActive,
              isConnected,
              nextPostDate,
              daysFrequency,
              frequencyToBePosted,
            });
            await socialAccount.save();
          }

          return socialAccount;
        }
      );

      await Promise.all(socialAccountAccounts);
    }

    res.status(200).json({ error: false, msg: "Socials saved successfully." });
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
  return await User.findById(userId).select("-password -resetToken").populate("socialAccounts");
}

async function getBasicUserInfo(userId) {
  return await User.findById(userId);
}

async function getUserByUserName(userName = "") {
  return await User.findOne({ userName }).populate("socialAccounts");
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
module.exports.getUserByUserName = getUserByUserName;
module.exports.createOrUpdateGuestUser = createOrUpdateGuestUser;
