const express = require("express");
const passport = require("passport");
// const querystring = require("querystring");
const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const User = require("../models/User");
// const verifyAuth = require("../config/verifyAuth");
// const { sendEmail } = require("../helpers/email");
// const { OAuth2Client } = require("google-auth-library");
// const { check, validationResult } = require("express-validator");
// const { register, getUserInfo } = require("./users");
// const { randomString, getAuthResponse } = require("../helpers/utills");

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

  return `${hostname}/api/login/${urlFor}/callback`;
};

const redirectToWebapp = (req, res) => res.redirect(REACT_APP_URL);

const responseBackToWebapp = (req, res) => {
  res.json({ user: req.user });
  // const { token, email } = req.user;
  // const params = token ? `#auth_token=${token}&email=${email}` : `#error=true&error_description=Invalid Response. Please try agian.`;
  // res.redirect(REACT_APP_URL + params);
};

const setFacebookStrategy = async (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: getAuthCallbackURL(req, "facebook"),
        profileFields: ["id", "displayName", "email", "first_name", "last_name", "middle_name", "picture", "gender"],
      },
      (accessToken, refreshToken, profile, done) => {
        // Here, you can check if the user exists in your database
        // If not, you can create a new user with the profile data
        // and then call the done() function with the user object
        // For example:
        // const user = {
        //   id: profile.id,
        //   displayName: profile.displayName,
        //   email: profile.emails[0].value,
        // };
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

// @route   GET api/login/facebook
// @desc    Login user via facebook
// @access  Public
router.get("/facebook", setFacebookStrategy, passport.authenticate("facebook"), redirectToWebapp);

// @route   GET api/login/facebook/callback
// @desc    Handle response from facebook
// @access  Public
router.get("/facebook/callback", passport.authenticate("facebook", AuthOptions), responseBackToWebapp);

// @route   GET api/login/linkedin
// @desc    Login user via linkedin
// @access  Public
router.get("/linkedin", setLinkedinStrategy, passport.authenticate("linkedin"), redirectToWebapp);

// @route   GET api/login/linkedin/callback
// @desc    Handle response from linkedin
// @access  Public
router.get("/linkedin/callback", passport.authenticate("linkedin", AuthOptions), responseBackToWebapp);

// @route   GET api/login/instagram
// @desc    Login user via instagram
// @access  Public
router.get("/instagram", setInstagramStrategy, passport.authenticate("instagram"), redirectToWebapp);

// @route   GET api/login/instagram/callback
// @desc    Handle response from instagram
// @access  Public
router.get("/instagram/callback", passport.authenticate("instagram", AuthOptions), responseBackToWebapp);

module.exports = router;
