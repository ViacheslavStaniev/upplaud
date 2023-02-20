const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Show = require("../models/Show");
const verifyAuth = require("../config/verifyAuth");
const { sendEmail } = require("../helpers/email");
const { register, getUserInfo } = require("./users");
const { OAuth2Client } = require("google-auth-library");
const { check, validationResult } = require("express-validator");
const { randomString, getAuthResponse } = require("../helpers/utills");

const router = express.Router();

// @route   GET api/show/showId
// @desc    gets show details
// @access  Public
router.get("/:showId", verifyAuth, async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId).populate("host");

    res.json(show);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/show
// @desc    Creates a show
// @access  Public
router.post(
  "/",
  [check("email", "Please enter a valid email address").isEmail(), check("password", "Password is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      const user2 = await getUserInfo(user.id);

      res.json(await getAuthResponse(user2));
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
    check("firstname", "First name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Please enter with 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { firstname, lastname, email, password, timezone } = req.body;

    try {
      const user = await register(firstname, lastname, email, password, timezone);

      res.json(await getAuthResponse(user));
    } catch (err) {
      console.error(err);
      if (err.name === "ServiceError") {
        return res.status(400).json({ errors: [{ msg: err.message }] });
      }
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

      const link = `${process.env.REACT_APP_URL}/reset-password/${resetToken}`;

      const subject = "Password reset link";
      const body = `Hi ${user.name.first}<br/><br/>

        We received a request to reset your password.<br/>
        Please click open this link in your browser window and set your new password.<br/>
        <a href="${link}">${link}</a><br/><br/>

        If you did not make this change, please disregard this email and contact UXArmy helpdesk at <a href="mailto:hi@uxarmy.com">hi@uxarmy.com</a>.<br/>
        Do not reply to this automated email.<br/><br/>
        
        Regards, Team UXArmy`;

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

module.exports = router;
