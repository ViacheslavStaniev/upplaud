const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const verifyAuth = require("../config/verifyAuth");
// const { sendEmail } = require("../helpers/email");
const User = require("../models/User");
const SocialAccount = require("./../models/SocialAccount");
const { SOCIAL_TYPE } = require("./../models/SocialAccount");
const { AuthClient, RestliClient } = require("linkedin-api-client");

// const { updateUserInfo } = require("./users");

const router = express.Router();
const { LINKEDIN } = SOCIAL_TYPE;

// const LINKEDIN_API_URL = "https://api.linkedin.com/rest/";
const { REACT_APP_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET, LINKEDIN_VERSION } = process.env;
const AuthOptions = { failureRedirect: "/auth/error", failureFlash: false, session: true, failureMessage: true };

const getAuthCallbackURL = (req, urlFor) => {
  const hostname = req.protocol + "://" + req.headers.host;

  return `${hostname}/auth/connect/${urlFor}-callback`;
};

const redirectToWebapp = (req, res) => res.redirect(REACT_APP_URL);

const responseBackToWebapp = (req, res) => {
  console.log("rsp2", req.session);
  res.json({ session: req.session, user: req.user });
  //   const { accessToken } = req.user;
  //   const params = accessToken
  //     ? `#auth_token=${accessToken}`
  //     : `#error=true&error_description=This social media login might not be working right now. Please use another way to login.
  //   `;
  //   res.redirect(REACT_APP_URL + params);
};

const saveUserAccessTokens = async (user, type, connectType, info, publicUrl = "") => {
  // find social account
  let isNew = false;
  let socialAccount = await SocialAccount.findOne({ user: user._id });
  if (!socialAccount) {
    isNew = true;
    socialAccount = new SocialAccount({ user: user._id, type });
  }

  // update connect info
  socialAccount[connectType] = { ...socialAccount[connectType], ...info };

  // Public URL
  if (publicUrl !== "") socialAccount.publicUrl = publicUrl;

  await socialAccount.save();

  if (isNew) user.socialAccounts = [...user.socialAccounts, socialAccount._id];
  else user.socialAccounts = user.socialAccounts.map((sacc) => (sacc.type === type ? socialAccount : sacc));

  await user.save();

  return user;
};

const saveAccessTokens = async (profile, type, connectType, accessToken, refreshToken, accounts = []) => {
  try {
    const { id, emails, _json } = profile;

    if (emails && emails[0]?.value) {
      const email = emails[0]?.value;
      const user = await User.findOne({ email }).populate("socialAccounts");
      if (user) {
        // Social Params
        const info = {
          accounts,
          socialId: id,
          accessToken,
          refreshToken,
          expiresInSeconds: 0,
          isConnected: connectType === "profile",
        };

        // Save Public URL
        const publicUrl = type === LINKEDIN && _json && _json.vanityName ? `www.linkedin.com/in/${_json.vanityName}` : "";

        return await saveUserAccessTokens(user, type, connectType, info, publicUrl);
      }
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
        try {
          let accounts = [];

          // Fetch Pages if exists
          if (connectType === "page") {
            const restliClient = new RestliClient();
            restliClient.setDebugParams({ enabled: true });

            const result = await restliClient.finder({
              accessToken,
              finderName: "search",
              versionString: LINKEDIN_VERSION,
              resourcePath: "/organizationAcls",
              queryParams: { q: "roleAssignee", state: "APPROVED", role: "ADMINISTRATOR" },
            });

            // Fetch Organisation
            const organizations = await Promise.all(
              result.data.elements.map(async ({ organization }) => {
                const orgId = Number(organization.split("urn:li:organization:")[1]);
                const result = await restliClient.get({
                  accessToken,
                  versionString: LINKEDIN_VERSION,
                  resourcePath: `/organizations/${orgId}`,
                });

                return result.data;
              })
            );

            console.log(organizations);

            accounts = organizations.map(
              ({
                id,
                logoV2,
                foundedOn,
                vanityName,
                coverPhotoV2,
                localizedName,
                localizedWebsite,
                organizationType,
                localizedDescription,
                ...otherParams
              }) => ({
                id,
                logoV2,
                foundedOn,
                vanityName,
                coverPhotoV2,
                organizationType,
                name: localizedName,
                urn: otherParams["$URN"],
                website: localizedWebsite,
                description: localizedDescription,
              })
            );
          }

          const updatedUser = await saveAccessTokens(profile, LINKEDIN, connectType, accessToken, refreshToken, accounts);

          done(null, updatedUser);
        } catch (error) {
          console.log(error);
          done(null, null);
        }
      }
    )
  );

  next();
};

// @route   GET auth/connect/facebook/:connectType
// @desc    Connnect user with facebook account
// @access  Public
router.get("/facebook/:connectType", setFacebookStrategy, passport.authenticate("facebook"), redirectToWebapp);

// @route   GET auth/connect/facebook-callback
// @desc    Handle response from facebook
// @access  Public
router.get("/facebook-callback", passport.authenticate("facebook", AuthOptions), responseBackToWebapp);

// @route   GET auth/connect/linkedin/:connectType
// @desc    Connect user with linkedin account
// @access  Public
router.get("/linkedin/:connectType", setLinkedinStrategy, passport.authenticate("linkedin"), redirectToWebapp);

// @route   GET auth/connect/linkedin-callback
// @desc    Handle response from linkedin
// @access  Public
router.get("/linkedin-callback", passport.authenticate("linkedin", AuthOptions), responseBackToWebapp);

async function initLinkedInPosting(req, res) {
  const { profile } = req.user.socialAccounts.find((s) => s.type === "LN");

  const authClient = new AuthClient({
    clientId: LINKEDIN_APP_ID,
    clientSecret: LINKEDIN_APP_SECRET,
    redirectUrl: getAuthCallbackURL(req, "linkedin"),
  });
  const restliClient = new RestliClient();
  restliClient.setDebugParams({ enabled: true });

  const timestamp = new Date().getTime();

  const post = {
    author: `urn:li:person:${profile?.socialId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareMediaCategory: "ARTICLE",
        shareCommentary: { text: `Western Australia - ${timestamp}` },
        media: [
          {
            status: "READY",
            title: { text: "Western Australia" },
            originalUrl: "https://likenoother.wa.gov.au/",
            description: {
              text: "Western Australia is an ancient, energetic land, brimming with opportunity ready for you to discover.",
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
    // fetch new access token
    const tokenObj = await authClient.exchangeRefreshTokenForAccessToken(profile?.refreshToken);
    const accessToken = tokenObj?.access_token;

    // SAVE ACCESS_TOKEN
    const connectType = "profile";
    const info = {
      accessToken: tokenObj.access_token,
      refreshToken: tokenObj.refresh_token,
      isConnected: connectType === "profile",
      expiresInSeconds: tokenObj.refresh_token_expires_in,
    };

    await saveUserAccessTokens(req.user, LINKEDIN, connectType, info);

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
