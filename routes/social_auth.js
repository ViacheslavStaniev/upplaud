const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const { sendEmail } = require("../helpers/email");
const { createOrUpdateGuestUser, updateUserInfo } = require("./users");
const { randomString, setUserSession, redirectToWebapp } = require("../helpers/utills");

const router = express.Router();

const {
  SERVER_URL,
  REACT_APP_URL,
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  LINKEDIN_APP_ID,
  LINKEDIN_APP_SECRET,
} = process.env;

const AuthOptions = { failureRedirect: "/auth/login/error", failureFlash: false, session: false, failureMessage: true };

const getAuthCallbackURL = (urlFor) => `${SERVER_URL}/auth/login/${urlFor}-callback`;

const responseBackToWebapp = async (req, res) => {
  let params = "";
  if (req?.user) await setUserSession(req, req.user);
  else {
    params = `#error=true&error_description=This social media login might not be working right now. Please try another way to login.`;
  }

  res.redirect(REACT_APP_URL + params);
};

// Get User
const getUser = async (profile) => {
  const { name, photos, emails } = profile;

  if (emails && emails[0]?.value) {
    const email = emails[0]?.value;
    const firstName = name?.givenName;
    const picture = photos[0]?.value || "";
    const lastName = name?.familyName || "";

    const userObj = await createOrUpdateGuestUser(firstName, lastName, email, randomString(8)); // new user - register first, otherwise fetch user

    // update user picture
    await updateUserInfo(userObj._id, { email, lastName, firstName, profile: { ...userObj.profile, picture } });

    return await userObj;
  }

  return null;
};

// Set Facebook Strategy
const setFacebookStrategy = async (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: getAuthCallbackURL("facebook"),
        profileFields: ["id", "email", "name", "picture", "gender", "displayName"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);

        // profile.emails = [{ value: "tikamchand06@gmail.com" }];
        if (profile.emails && profile.emails[0]?.value) done(null, await getUser(profile));
        else done(null, false);
      }
    )
  );

  next();
};

// Set Linkedin Strategy
const setLinkedinStrategy = async (req, res, next) => {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_APP_ID,
        clientSecret: LINKEDIN_APP_SECRET,
        callbackURL: getAuthCallbackURL("linkedin"),
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      async (accessToken, refreshToken, profile, done) => done(null, await getUser(profile))
    )
  );

  next();
};

// Set Google Strategy
const setGoogleStrategy = async (req, res, next) => {
  passport.use(
    new GoogleStrategy(
      { clientID: GOOGLE_APP_ID, clientSecret: GOOGLE_APP_SECRET, callbackURL: getAuthCallbackURL("google") },
      async (accessToken, refreshToken, profile, done) => done(null, await getUser(profile))
    )
  );

  next();
};

// @route   GET auth/login/error
// @desc    Auth error
// @access  Public
router.get("/error", responseBackToWebapp);

// @route   GET auth/login/facebook
// @desc    Login user via facebook
// @access  Public
router.get("/facebook", setFacebookStrategy, passport.authenticate("facebook", { scope: ["email", "user_link"] }), redirectToWebapp);

// @route   GET auth/login/facebook-callback
// @desc    Handle response from facebook
// @access  Public
router.get("/facebook-callback", passport.authenticate("facebook", AuthOptions), responseBackToWebapp);

// @route   GET auth/login/linkedin
// @desc    Login user via linkedin
// @access  Public
router.get("/linkedin", setLinkedinStrategy, passport.authenticate("linkedin"), redirectToWebapp);

// @route   GET auth/login/linkedin-callback
// @desc    Handle response from linkedin
// @access  Public
router.get("/linkedin-callback", passport.authenticate("linkedin", AuthOptions), responseBackToWebapp);

// @route   GET auth/login/google
// @desc    Login user via google
// @access  Public
router.get("/google", setGoogleStrategy, passport.authenticate("google", { scope: ["profile", "email"] }), redirectToWebapp);

// @route   GET auth/login/google-callback
// @desc    Handle response from google
// @access  Public
router.get("/google-callback", passport.authenticate("google", AuthOptions), responseBackToWebapp);

module.exports = router;
