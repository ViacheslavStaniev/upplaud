const axios = require("axios");
const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const verifyAuth = require("../config/verifyAuth");
// const { sendEmail } = require("../helpers/email");
const User = require("../models/User");
const SocialAccount = require("./../models/SocialAccount");
const { RestliClient } = require("linkedin-api-client");
const { SOCIAL_TYPE_FACEBOOK, SOCIAL_TYPE_LINKEDIN } = require("./../models/SocialAccount");
// const { updateUserInfo } = require("./users");

const router = express.Router();

// const LINKEDIN_API_URL = "https://api.linkedin.com/rest/";
const { REACT_APP_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET } = process.env;
const AuthOptions = { failureRedirect: "/auth/error", failureFlash: false, session: false, failureMessage: true };

const getAuthCallbackURL = (req, urlFor) => {
  const hostname = req.protocol + "://" + req.headers.host;

  return `${hostname}/auth/login/${urlFor}/callback`;
};

const redirectToWebapp = (req, res) => res.redirect(REACT_APP_URL);

const responseBackToWebapp2 = (req, res) => {
  console.log(req.user);
  //   const { accessToken } = req.user;
  //   const params = accessToken
  //     ? `#auth_token=${accessToken}`
  //     : `#error=true&error_description=This social media login might not be working right now. Please use another way to login.
  //   `;
  //   res.redirect(REACT_APP_URL + params);
};

const getExppireTime = () => new Date(new Date().getTime() + 50 * 24 * 60 * 60 * 1000);

const saveAccessTokens = async (profile, type, connectType, accessToken, refreshToken) => {
  try {
    const { id, emails, _json } = profile;

    if (emails && emails[0]?.value) {
      const email = emails[0]?.value;
      const user = await User.findOne({ email }).populate("socialAccounts");
      console.log(user, type, connectType, accessToken, refreshToken, profile);

      if (user) {
        // find social account
        let isNew = false;
        let socialAccount = await SocialAccount.findOne({ user: user._id });
        if (!socialAccount) {
          isNew = true;
          socialAccount = new SocialAccount({ user: user._id, type });
        }

        // update connect info
        socialAccount[connectType] = {
          socialId: id,
          accessToken,
          refreshToken,
          expires: getExppireTime(),
          isConnected: connectType === "profile",
        };

        if (type === SOCIAL_TYPE_LINKEDIN) {
          // Save Public URL
          if (_json && _json.vanityName) socialAccount.publicUrl = `www.linkedin.com/in/${_json.vanityName}`;

          // Fetch Pages if exists
          // if (connectType === "page") {
          //   const res2 = await axios.post(
          //     `${LINKEDIN_API_URL}organizationAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(*,organization~(localizedName)))`,
          //     {
          //       headers: {
          //         "LinkedIn-Version": "202301",
          //         "Content-Type": "application/json",
          //         "X-Restli-Protocol-Version": "2.0.0",
          //         Authorization: `Bearer ${accessToken}`,
          //       },
          //     }
          //   );
          //   console.log(res2?.response?.data);
          // }
        }

        await socialAccount.save();

        if (isNew) user.socialAccounts = [...user.socialAccounts, socialAccount._id];
        else user.socialAccounts = user.socialAccounts.map((sacc) => (sacc.type === type ? socialAccount : sacc));

        await user.save();

        return user;
      }

      return null;
    }

    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
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
        console.log(await saveAccessTokens(profile));

        done(null, profile);
      }
    )
  );

  next();
};

const setLinkedinStrategy = async (req, res, next) => {
  const { connectType } = req.params;
  const additionalScopes = connectType === "profile" ? ["w_member_social"] : ["rw_organization_admin", "w_organization_social"];

  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_APP_ID,
        clientSecret: LINKEDIN_APP_SECRET,
        callbackURL: getAuthCallbackURL(req, "linkedin"),
        scope: ["r_emailaddress", "r_basicprofile", ...additionalScopes],
      },
      async (accessToken, refreshToken, profile, done) => {
        done(null, await saveAccessTokens(profile, SOCIAL_TYPE_LINKEDIN, connectType, accessToken, refreshToken));
      }
    )
  );

  next();
};

// @route   GET auth/connect/facebook/:connectType
// @desc    Connnect user with facebook account
// @access  Public
router.get("/facebook/:connectType", setFacebookStrategy, passport.authenticate("facebook"), redirectToWebapp);

// @route   GET auth/connect/facebook/callback
// @desc    Handle response from facebook
// @access  Public
router.get("/facebook/callback", passport.authenticate("facebook", AuthOptions), responseBackToWebapp2);

// @route   GET auth/connect/linkedin/:connectType
// @desc    Connect user with linkedin account
// @access  Public
router.get("/linkedin/:connectType", setLinkedinStrategy, passport.authenticate("linkedin"), redirectToWebapp);

// @route   GET auth/connect/linkedin/callback
// @desc    Handle response from linkedin
// @access  Public
router.get("/linkedin/callback", passport.authenticate("linkedin", AuthOptions), responseBackToWebapp2);

async function initLinkedInPosting(req, res) {
  const { profile } = req.user.socialAccounts.find((s) => s.type === "LN");

  const restliClient = new RestliClient();
  restliClient.setDebugParams({ enabled: true });

  const { accessToken } = profile;

  const post = {
    author: `urn:li:person:${profile?.socialId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: "Learning more about LinkedIn by reading the LinkedIn Blog!",
        },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            description: {
              text: "Official LinkedIn Blog - Your source for insights and information about LinkedIn.",
            },
            originalUrl: "https://blog.linkedin.com/",
            title: {
              text: "Official LinkedIn Blog",
            },
          },
        ],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  try {
    // const res = await axios.post("https://api.linkedin.com/v2/ugcPosts", { headers }, post);
    await restliClient.create({ resourcePath: "/ugcPosts", entity: post, accessToken });
    // console.log(res, res?.createdEntityId);
    res.status(200).json({ error: false, msg: "Post created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: error?.message });
  }
}

module.exports = router;
module.exports.initLinkedInPosting = initLinkedInPosting;
