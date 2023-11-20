const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyAuth = require("../config/verifyAuth");
const { sendEmail } = require("../helpers/email");
const { register, getUserInfo } = require("./users");
const { OAuth2Client } = require("google-auth-library");
const { check, validationResult } = require("express-validator");
const { randomString, getAuthResponse, setUserSession } = require("../helpers/utills");

const router = express.Router();

// @route   GET api/auth/me
// @desc    Load current logged-in user
// @access  Public
router.get("/me", verifyAuth, async (req, res) => {
  try {
    let user = await getUserInfo(req.userId);

    res.json(user);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/login",
  [check("email", "Please enter a valid email address").isEmail(), check("password", "Password is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      await setUserSession(req, user);

      res.json(await getUserInfo(user._id));
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route   POST api/auth/social_login
// @desc    Decode jwt and log into the app.
// @access  Public
router.post("/social_login", [check("token", "Invalid token. Please try again.").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { token, login_via, timezone } = req.body;

  try {
    let userData = null;
    if (login_via && login_via == GOOGLE_LOGIN) {
      const { GOOGLE_CLIENT_ID } = process.env;
      const gclient = new OAuth2Client(GOOGLE_CLIENT_ID);
      const ticket = await gclient.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
      userData = ticket.getPayload();
    } else {
      userData = jwt.decode(token);
    }

    const { email, given_name, family_name } = userData;

    let user = await User.findOne({ email });
    if (user) {
      if (given_name) {
        user.name = { first: given_name, last: family_name };
        await user.save();
      }
    } else {
      user = await register(given_name, family_name, email, randomString(12), timezone);
    }

    res.json(await getAuthResponse(user));
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route   POST api/auth/register
// @desc    Registers user and creates account
// @access  Public
router.post(
  "/register",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter with 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, email, password, timezone } = req.body;

    try {
      const user = await register(firstName, lastName, email, password, timezone);

      // Set User Session
      await setUserSession(req, user);

      res.json(user);
    } catch (err) {
      console.error(err);
      if (err.name === "ServiceError") return res.status(400).json({ errors: [{ msg: err.message }] });

      return res.status(500).send("Internal Server Error");
    }
  }
);

// @route   POST api/auth/resetPassword
// @desc    Send password reset link to registered email
// @access  Public
router.post("/resetPassword", [check("email", "Please enter a valid email address").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const resetToken = randomString();
      user.resetToken = resetToken;
      await user.save();

      const link = `${process.env.REACT_APP_URL}/auth/reset-password/${resetToken}`;

      const subject = "Password reset link";
      const body = `Hi ${user?.firstName} ${user?.lastName}<br/><br/>

        We received a request to reset your password.<br/>
        Please click open this link in your browser window and set your new password.<br/>
        <a href="${link}">${link}</a><br/><br/>

        If you did not make this change, please disregard this email and contact Upplaud helpdesk at <a href="mailto:hi@upplaud.com">hi@Upplaud.com</a>.<br/>
        Do not reply to this automated email.<br/><br/>
        
        Regards, Team Upplaud`;

      sendEmail({ subject, body, to: user.email }); // Send Email

      return res.status(200).json([{ msg: "We have sent a link to reset your password at the email provided" }]);
    }

    return res.status(400).json({ errors: [{ msg: "We did not find any such email in our system" }] });
  } catch (err) {
    if (err.name === "ServiceError") return res.status(400).json({ errors: [{ msg: err.message }] });
    else throw err;
  }
});

// @route   POST api/auth/verifyToken
// @desc    Verifies the reset password token
// @access  Public
router.post(
  "/verifyToken",
  [check("token", "Invalid request, Please try again with new reset link").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { token } = req.body;

    try {
      const user = await User.findOne({ resetToken: token });
      if (user) return res.status(200).json([{ msg: "valid request" }]);

      return res
        .status(400)
        .json({ errors: [{ msg: "The link to reset your password is no longer valid. Try resetting your password" }] });
    } catch (err) {
      if (err.name === "ServiceError") return res.status(400).json({ errors: [{ msg: err.message }] });
      else throw err;
    }
  }
);

// @route   POST api/auth/changePassword
// @desc    Changes user password
// @access  Public
router.post(
  "/changePassword",
  [
    check("password", "Please enter your password with 6 or more characters").isLength({ min: 6 }),
    check("token", "Invalid request, Please try again with new reset link").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { password, token } = req.body;

    try {
      const user = await User.findOne({ resetToken: token });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetToken = "";
        await user.save();
        return res.status(200).json([{ msg: "Your password has been changed successfully. You can login now." }]);
      }

      return res
        .status(400)
        .json({ errors: [{ msg: "The link to reset your password is no longer valid. Try resetting your password" }] });
    } catch (err) {
      if (err.name === "ServiceError") return res.status(400).json({ errors: [{ msg: err.message }] });
      else throw err;
    }
  }
);

// @route   POST api/auth/logout
// @desc    Logout user
// @access  Private
router.get("/logout", verifyAuth, async (req, res) => {
  try {
    req.session = null;
    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
