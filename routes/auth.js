const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../config/auth");
const { OAuth2Client } = require("google-auth-library");
const { check, validationResult } = require("express-validator");
const { generateAuthToken, randomString } = require("../helpers/utills");
const { defaultAccountSubscription, registerUserWithAccount } = require("./users");
const { PLAN_ENTERPRISES } = require("../models/Subsciptions");

const router = express.Router();

// @route   GET api/auth
// @desc    Load user
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id)
      .select("-password -resetToken -sso")
      .populate({
        path: "account",
        select: "subscriptions branding",
        populate: [
          {
            options: { sort: { createdAt: -1 } },
            path: "subscriptions",
            select: "product plans.type plans.amount plans.currency start_date end_date status invoice_url",
          },
          {
            path: "branding.logo",
            select: "path",
          },
        ],
      });
    let expireSub = [];
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    expireSub = await user.account.subscriptions.filter((sub) => {
      return sub.status == 1 && sub.plans.type != 0 && todayDate >= sub.end_date;
    });

    let toActiveSub = [];
    let toDeActiveSub = [];

    if (expireSub && expireSub.length > 0) {
      expireSub.map((input) => {
        let findSub = {};
        toDeActiveSub.push(input._id);
        findSub = user.account.subscriptions.find((sub) => sub.plans.type == 0 && sub.product == input.product);
        if (findSub && findSub._id) {
          toActiveSub.push(findSub._id);
        }
      });
    }
    if (toActiveSub && toActiveSub.length > 0 && toDeActiveSub && toDeActiveSub.length > 0) {
      await activeDefaultSubscriptions(toActiveSub, toDeActiveSub);
      user = await User.findById(req.user.id)
        .select("-password -resetToken -sso")
        .populate({
          path: "account",
          select: "subscriptions",
          populate: {
            options: { sort: { createdAt: -1 } },
            path: "subscriptions",
            select: "product plans.type plans.amount plans.currency start_date end_date status invoice_url",
          },
        });
    }
    res.json(user);
  } catch (err) {
    // throw err;
    console.error({ msg: err.message });
    res.status(500).send("Internal Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  [check("email", "Please enter a valid email address").isEmail(), check("password", "Password is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, remember } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

      const payload = { user: { id: user.id, accountId: user.account } };
      const expiresIn = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
      await defaultAccountSubscription(user.account);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route   POST api/auth/check
// @desc    Check email for login
// @access  Public
router.post("/check", [check("email", "Please enter a valid email address").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email } = req.body;
  try {
    const domains = email.split("@")[1];
    const sso = await Sso.findOne({ domains });

    if (!sso) return res.status(200).json({ sso: false });

    res.status(400).json({ error: "Your Organization requires you to login with SSO" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route   POST api/auth/sso_check
// @desc    Authenticate user email for sso login
// @access  Public
router.post("/sso_check", [check("email", "Please enter a valid email address").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email } = req.body;
  try {
    const domains = email.split("@")[1];
    const sso = await Sso.findOne({ domains });

    const msg =
      "This domain is not registered as a SSO account. Recheck the domain name or seek help from the admin of your SSO provider.";
    if (!sso) return res.status(400).json({ errors: [{ msg }] });

    const { loginURL, certificate, type } = sso;

    res.json({ loginURL, certificate, type });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route   POST api/auth/sso_login
// @desc    Decode jwt and log into the app.
// @access  Public
router.post("/sso_login", [check("token", "Invalid token. Please try again.").not().isEmpty()], async (req, res) => {
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
      const password = randomString(12);
      user = await registerUserWithAccount(given_name, family_name, email, password, timezone, PLAN_ENTERPRISES);
    }

    const expiresIn = 1 * 24 * 60 * 60; // One day
    const authToken = await generateAuthToken({ user: { id: user.id, accountId: user.account } }, expiresIn);
    res.json(authToken);

    await defaultAccountSubscription(user.account, true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
