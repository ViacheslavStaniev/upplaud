const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const verifyAuth = require("../config/verifyAuth");
// const { sendEmail } = require("../helpers/email");
const { randomString, getAuthResponse } = require("../helpers/utills");
const { createOrUpdateGuestUser, updateUserInfo } = require("./users");

const router = express.Router();

const {
  REACT_APP_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  LINKEDIN_APP_ID,
  LINKEDIN_APP_SECRET,
  INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET,
} = process.env;
const AuthOptions = { failureRedirect: "/auth/error", failureFlash: false, session: false, failureMessage: true };

const getAuthCallbackURL = (req, urlFor) => {
  const hostname = req.protocol + "://" + req.headers.host;

  return `${hostname}/auth/login/${urlFor}-callback`;
};

const redirectToWebapp = (req, res) => res.redirect(REACT_APP_URL);

const responseBackToWebapp = (req, res) => {
  const { accessToken } = req.user;
  const params = accessToken
    ? `#auth_token=${accessToken}`
    : `#error=true&error_description=This social media login might not be working right now. Please use another way to login. 
  `;
  res.redirect(REACT_APP_URL + params);
};

const getUser = async (profile) => {
  const { name, photos, emails } = profile;

  if (emails && emails[0]?.value) {
    const email = emails[0]?.value;
    const firstName = name?.givenName;
    const lastName = name?.familyName || "";
    const picture = photos[0]?.value || "";

    const userObj = await createOrUpdateGuestUser(firstName, lastName, email, randomString(8)); // new user - register first, otherwise fetch user

    // update user picture
    await updateUserInfo(userObj._id, { email, lastName, firstName, profile: { ...userObj.profile, picture } });

    return await getAuthResponse(userObj);
  }

  return null;
};

const setFacebookStrategy = async (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: getAuthCallbackURL(req, "facebook"),
        profileFields: ["id", "emails", "name", "picture", "gender"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(await getUser(profile));

        done(null, profile);
      }
    )
  );

  next();
};

const setLinkedinStrategy = async (req, res, next) => {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_APP_ID,
        clientSecret: LINKEDIN_APP_SECRET,
        callbackURL: getAuthCallbackURL(req, "linkedin"),
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      async (accessToken, refreshToken, profile, done) => done(null, await getUser(profile))
    )
  );

  next();
};

const setInstagramStrategy = async (req, res, next) => {
  passport.use(
    new InstagramStrategy(
      {
        clientID: INSTAGRAM_APP_ID,
        clientSecret: INSTAGRAM_APP_SECRET,
        callbackURL: getAuthCallbackURL(req, "instagram"),
      },
      (accessToken, refreshToken, profile, done) => {
        // Here, you can check if the user exists in your database
        // If not, you can create a new user with the profile data
        // and then call the done() function with the user object
        // For example:
        done(null, profile);
      }
    )
  );

  next();
};

// @route   GET auth/login/facebook
// @desc    Login user via facebook
// @access  Public
router.get("/facebook", setFacebookStrategy, passport.authenticate("facebook"), redirectToWebapp);

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

// @route   GET auth/login/instagram
// @desc    Login user via instagram
// @access  Public
router.get("/instagram", setInstagramStrategy, passport.authenticate("instagram"), redirectToWebapp);

// @route   GET auth/login/instagram/callback
// @desc    Handle response from instagram
// @access  Public
router.get("/instagram/callback", passport.authenticate("instagram", AuthOptions), responseBackToWebapp);

module.exports = router;
