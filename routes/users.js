const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ServiceError } = require("./errors");
const { sendEmail } = require("../helpers/email");
const { randomString } = require("../helpers/utills");
const { check, validationResult } = require("express-validator");
const { createSubscriptions, deactivateSubscription } = require("./subscriptions");
const {
  PRODUCT_TREE,
  PRODUCT_PARTICIPATORY,
  PRODUCT_CARD,
  PLAN_FREE,
  PLAN_ENTERPRISES,
  SUBSCRIPTION_ACTIVE,
} = require("../models/Subsciptions");

const router = express.Router();

// @route   POST api/users
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, timezone } = req.body;
    try {
      try {
        await registerUserWithAccount(firstname, lastname, email, password, timezone);
      } catch (err) {
        if (err.name === "ServiceError") {
          return res.status(400).json({ errors: [{ msg: err.message }] });
        } else {
          throw err;
        }
      }

      const payload = { user: { id: user.id, accountId: user.account } };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route   POST api/users/resetPassword
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

// @route   POST api/users/verifyToken
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

// @route   POST api/users/changePassword
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

async function registerUserWithAccount(firstname, lastname, email, password, timezone, defaultPlan = PLAN_FREE) {
  const name = { first: firstname, last: lastname };
  const user = new User({ name, email, password, timezone });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const session = await User.startSession();
  const options = { session };
  session.startTransaction();

  try {
    const newUser = await user.save(options);

    await session.commitTransaction();
    session.endSession();

    return newUser;
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

async function userSubscriptions(email, product, status = 1, session) {
  try {
    let criteria = { product: { $eq: product }, status: { $eq: status } };
    //if (planType !== null) criteria['plans.type'] = { $eq: planType };
    const user = await User.findOne({ email: email }, "account")
      .populate({
        path: "account",
        select: "subscriptions",
        populate: {
          path: "subscriptions",
          match: criteria,
          select: "id",
        },
      })
      .session(session);
    if (user.account.subscriptions.length > 0) return user.account;
  } catch (err) {
    console.log(err.message);
    // throw err;
    return false;
  }
}

async function defaultAccountSubscription(id, isSsoUser = false) {
  try {
    const toCreateSubscription = [];
    const planType = isSsoUser ? PLAN_ENTERPRISES : PLAN_FREE;
    const allProducts = [PRODUCT_TREE, PRODUCT_PARTICIPATORY, PRODUCT_CARD];

    const account = await Account.findById(id).populate({
      path: "subscriptions",
      select: "product plans",
      match: { "plans.type": { $eq: planType } },
    });

    if (account.subscriptions) {
      allProducts.forEach((product) => {
        const subcription = account.subscriptions.find((sub) => sub.product === product);
        if (!subcription) {
          const productPlan = { product: product, status: 1 };
          if (isSsoUser) {
            const today = new Date();
            productPlan.plans = { type: planType };
            productPlan.end_date = today.setFullYear(today.getFullYear() + 1); // One year from now
          }

          toCreateSubscription.push(productPlan);
        }
      });

      // Deactivate free plan
      if (isSsoUser) {
        const account = await Account.findById(id).populate({
          path: "subscriptions",
          select: "product plans",
          match: { "plans.type": { $ne: PLAN_ENTERPRISES }, status: SUBSCRIPTION_ACTIVE },
        });

        if (account.subscriptions && account.subscriptions.length > 0) {
          account.subscriptions.forEach(async ({ _id }) => await deactivateSubscription(_id));
        }
      }

      if (toCreateSubscription.length) {
        const session = await Account.startSession();
        const options = { session };
        session.startTransaction();

        const subscriptions = await createSubscriptions(toCreateSubscription, options);
        if (subscriptions) subscriptions.map((input) => account.subscriptions.push(input.id));

        await account.save(options);
        await session.commitTransaction();
        session.endSession();
      }
    }
  } catch (err) {
    // throw err;
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
  }
}

module.exports = router;
module.exports.registerUserWithAccount = registerUserWithAccount;
module.exports.defaultAccountSubscription = defaultAccountSubscription;
global.userSubscriptions = userSubscriptions;
