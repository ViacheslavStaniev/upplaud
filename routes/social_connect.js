const express = require("express");
const passport = require("passport");
const SocialPosting = require("./../models/SocialPosting");
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const verifyAuth = require("../config/verifyAuth");
// const { sendEmail } = require("../helpers/email");
const User = require("../models/User");
const SocialAccount = require("./../models/SocialAccount");
const { POLL_STATUS } = require("./../models/Guest");
const { SOCIAL_TYPE, SOCIAL_SUB_TYPE } = require("./../models/SocialAccount");
const { getBaseDomain, redirectToWebapp, getFBAuthClient, getLNAuthRestClients } = require("../helpers/utills");

// const { updateUserInfo } = require("./users");

const router = express.Router();
const { LINKEDIN, FACEBOOK } = SOCIAL_TYPE;
const { PROFILE, PAGE } = SOCIAL_SUB_TYPE;

// const LINKEDIN_API_URL = "https://api.linkedin.com/rest/";
const { REACT_APP_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET, LINKEDIN_VERSION } = process.env;
const AuthOptions = { failureRedirect: "/auth/connect/error", failureFlash: false, session: true, failureMessage: true };

const getAuthCallbackURL = (urlFor) => getBaseDomain(`auth/connect/${urlFor}-callback`);

const responseBackToWebapp = (req, res) => res.redirect(REACT_APP_URL + "?isConnected=1");

const saveUserAccessTokens = async (user, infoObj) => {
  const {
    type,
    page = null,
    group = null,
    socialId = "",
    publicUrl = "",
    accessToken = "",
    refreshToken = "",
    isConnected = true,
    expiresInSeconds = 24 * 60 * 60 * 30, // 30 days
  } = infoObj;

  // find social account
  let isNew = false;
  let socialAccount = await SocialAccount.findOne({ user: user._id, type });
  if (!socialAccount) {
    isNew = true;
    socialAccount = new SocialAccount({ user: user._id });
  }

  // Update Social Info
  socialAccount.type = type;
  socialAccount.socialId = socialId;
  socialAccount.publicUrl = publicUrl;
  socialAccount.isConnected = isConnected;
  socialAccount.accessToken = accessToken;
  socialAccount.refreshToken = refreshToken;
  socialAccount.expiresInSeconds = expiresInSeconds;

  // Update Page/Group Info
  if (page) socialAccount.page = { ...socialAccount.page, ...page };
  if (group) socialAccount.group = { ...socialAccount.group, ...group };

  await socialAccount.save();

  if (isNew) user.socialAccounts = [...user.socialAccounts, socialAccount._id];
  else user.socialAccounts = user.socialAccounts.map((sacc) => (sacc.type === type ? socialAccount : sacc));

  await user.save();

  return user;
};

// Set Facebook Strategy for connect
const setFacebookStrategy = async (req, res, next) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: getAuthCallbackURL("facebook"),
        profileFields: ["id", "emails", "gender", "name", "displayName", "profileUrl"],
        scope: ["email", "public_profile", "publish_to_groups", "pages_manage_posts", "pages_read_engagement"],
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log("accessToken", accessToken);
        // console.log("profile", profile);

        // Temporary Email
        // profile.emails = [{ value: "tikamchand06@gmail.com" }];

        try {
          const { id, emails, profileUrl } = profile;
          if (emails && emails[0]?.value) {
            const email = emails[0]?.value;
            const user = await User.findOne({ email }).populate("socialAccounts");
            if (user) {
              const authClient = getFBAuthClient();

              // Fetch user's pages and groups
              const [page, group] = await Promise.all(
                ["page", "group"].map(async (type) => {
                  const {
                    data: { data },
                  } = await authClient.get(`/me/${type === "page" ? "accounts" : "groups"}?admin_only=1&access_token=${accessToken}`);
                  return { socialId: data.length > 1 ? "" : data[0]?.id, accounts: data, askToChoose: data.length > 1 };
                })
              );

              const updateInfo = {
                page,
                group,
                accessToken,
                refreshToken,
                socialId: id,
                type: FACEBOOK,
                isConnected: true,
                publicUrl: profileUrl,
              };

              const updatedUser = await saveUserAccessTokens(user, updateInfo);

              done(null, updatedUser);
            } else done(null, null);
          } else done(null, null);
        } catch (error) {
          console.log(error?.response?.data || error?.message);
          done(null, null);
        }
      }
    )
  );

  next();
};

// Set Linkedin Strategy for connect
const setLinkedinStrategy = async (req, res, next) => {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: LINKEDIN_APP_ID,
        clientSecret: LINKEDIN_APP_SECRET,
        callbackURL: getAuthCallbackURL("linkedin"),
        scope: ["r_emailaddress", "r_basicprofile", "w_member_social", "rw_organization_admin", "w_organization_social"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { id, emails, _json } = profile;
          if (emails && emails[0]?.value) {
            const email = emails[0]?.value;
            const user = await User.findOne({ email }).populate("socialAccounts");
            if (user) {
              // Fetch Pages if exists
              const { restliClient } = getLNAuthRestClients();

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

              const accounts = organizations.map(
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

              // Public URL
              const publicUrl = _json && _json.vanityName ? `www.linkedin.com/in/${_json.vanityName}` : "";

              const moreThanOnePages = accounts.length > 1;

              const updateInfo = {
                publicUrl,
                accessToken,
                refreshToken,
                socialId: id,
                type: LINKEDIN,
                isConnected: true,
                page: { socialId: moreThanOnePages ? "" : accounts[0]?.id, accounts, askToChoose: moreThanOnePages },
              };

              const updatedUser = await saveUserAccessTokens(user, updateInfo);

              done(null, updatedUser);
            } else done(null, null);
          } else done(null, null);
        } catch (error) {
          console.log(error);
          done(null, null);
        }
      }
    )
  );

  next();
};

// @route   GET auth/connect/error
// @desc    Auth error
// @access  Public
router.get("/error", redirectToWebapp);

// @route   GET auth/connect/facebook
// @desc    Connnect user with facebook account
// @access  Public
router.get("/facebook", setFacebookStrategy, passport.authenticate("facebook"), redirectToWebapp);

// @route   GET auth/connect/facebook-callback
// @desc    Handle response from facebook
// @access  Public
router.get("/facebook-callback", passport.authenticate("facebook", AuthOptions), responseBackToWebapp);

// @route   GET auth/connect/linkedin
// @desc    Connect user with linkedin account
// @access  Public
router.get("/linkedin", setLinkedinStrategy, passport.authenticate("linkedin"), redirectToWebapp);

// @route   GET auth/connect/linkedin-callback
// @desc    Handle response from linkedin
// @access  Public
router.get("/linkedin-callback", passport.authenticate("linkedin", AuthOptions), responseBackToWebapp);

// @route GET auth/connect/init-auto-posting
// @desc Initiate Social (Facebook/LinkedIn) Posting
// @access Public
router.get("/init-auto-posting", async (req, res) => {
  try {
    const activePostings = await SocialPosting.find({ isActive: true })
      .populate("poll")
      .populate({ path: "user", populate: { path: "socialAccounts" } });
    if (activePostings.length === 0) return res.status(200).json({ error: false, msg: "No active posting found." });

    // Initiate Postings
    for (let i = 0; i < activePostings.length; i++) {
      const posting = activePostings[i];
      const { poll, user, type, subType, subTypeId, frequency, frequencyPosted } = posting;

      // Check is poll is published
      if (!poll || poll.status === POLL_STATUS.DRAFT) continue;

      // Check if social account is connected
      const socialAccount = user.socialAccounts.find((s) => s.type === type);
      if (!socialAccount) continue;

      // Check if social account is active
      const { isConnected, accessToken, refreshToken, page, group } = socialAccount;
      if (!isConnected) continue;

      // Post Info
      const postInfo = {
        title: "This is title - " + Date.now(),
        description: "This is description text.",
        url: getBaseDomain(`poll/${poll._id}`),
      };

      // Initiate Posting
      if (type === SOCIAL_TYPE.FACEBOOK) {
        try {
          const access_token = subType === PAGE ? page?.accounts.find((a) => a.id === subTypeId)?.access_token : accessToken;
          const tokenObj = await initFacebookPosting(subTypeId, postInfo, access_token, subType);
          console.log(tokenObj);
        } catch (error) {
          console.log(error);
        }
      } else if (type === SOCIAL_TYPE.LINKEDIN) {
        try {
          const tokenObj = await initLinkedInPosting(subTypeId, postInfo, refreshToken, subType);

          // SAVE ACCESS_TOKEN
          await saveUserAccessTokens(user, {
            type,
            subType,
            accessToken: tokenObj.access_token,
            refreshToken: tokenObj.refresh_token,
            expiresInSeconds: tokenObj.refresh_token_expires_in,
          });
        } catch (error) {
          const urs = await saveUserAccessTokens(user, { type, subType, isConnected: false, expiresInSeconds: 0 });

          console.log(error, urs);
        }
      }
    }

    res.status(200).json({ activePostings, error: false, msg: "Posting completed successfully." });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: true, msg: error?.response?.data?.error_description || error?.message });
  }
});

// Initiate LinkedIn Posting
async function initLinkedInPosting(id, postInfo, refreshToken, subType = PROFILE) {
  return new Promise(async (resolve, reject) => {
    // Author
    const author = subType === PROFILE ? `urn:li:person:${id}` : `urn:li:organization:${id}`;

    const { authClient, restliClient } = getLNAuthRestClients();

    // Post Content
    const { title, description, url } = postInfo;
    const post = {
      author,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareMediaCategory: "ARTICLE",
          shareCommentary: { text: title },
          media: [
            {
              status: "READY",
              originalUrl: url,
              title: { text: title },
              description: { text: description },
            },
          ],
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    };

    try {
      // fetch new access token
      const tokenObj = await authClient.exchangeRefreshTokenForAccessToken(refreshToken);
      const accessToken = tokenObj?.access_token;

      await restliClient.create({ resourcePath: "/ugcPosts", entity: post, accessToken });
      // console.log(res, res?.createdEntityId);
      resolve(tokenObj);
    } catch (error) {
      reject({ error: true, msg: error?.response?.data?.error_description || error?.message });
    }
  });
}

// Initiate Facebook Posting
async function initFacebookPosting(id, postInfo, access_token, subType = PROFILE) {
  console.log("Posting on ", subType, id);
  return new Promise(async (resolve, reject) => {
    // Post Content
    const { title, description, url } = postInfo;

    const authClient = getFBAuthClient();

    // Get refresh token
    // const res = await authClient.get(
    //   `/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${accessToken}`
    // );
    // const { access_token } = res.data;
    // console.log("access_token", access_token);

    // Post
    const post = { access_token, message: title, link: url, caption: description };

    try {
      // Post on Facebook
      const response = await authClient.post(`/${subType === PROFILE ? "me" : id}/feed`, post);
      resolve(response.data);
    } catch (error) {
      reject({ error: true, msg: error?.response?.data?.error?.message || error?.message });
    }
  });
}

module.exports = router;
