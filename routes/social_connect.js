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
const { getBaseDomain } = require("./../helpers/utills");
const { SOCIAL_TYPE, SOCIAL_SUB_TYPE } = require("./../models/SocialAccount");
const { AuthClient, RestliClient } = require("linkedin-api-client");

// const { updateUserInfo } = require("./users");

const router = express.Router();
const { LINKEDIN } = SOCIAL_TYPE;
const { PROFILE, PAGE, GROUP } = SOCIAL_SUB_TYPE;

// const LINKEDIN_API_URL = "https://api.linkedin.com/rest/";
const { REACT_APP_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET, LINKEDIN_VERSION } = process.env;
const AuthOptions = { failureRedirect: "/auth/error", failureFlash: false, session: true, failureMessage: true };

const getAuthCallbackURL = (req, urlFor) => getBaseDomain(req, `auth/connect/${urlFor}-callback`);

const redirectToWebapp = (req, res) => res.redirect(REACT_APP_URL);

const responseBackToWebapp = (req, res) => res.redirect(REACT_APP_URL + "?isConnected=1");

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
          isConnected: true,
          expiresInSeconds: 24 * 60 * 60, // 24 hours
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
  const additionalScopes = connectType === PROFILE ? ["w_member_social"] : ["rw_organization_admin", "w_organization_social"];

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
          if (connectType === PAGE) {
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
      const { isConnected, refreshToken } = socialAccount[subType];
      if (!isConnected) continue;

      // Initiate Posting
      if (type === SOCIAL_TYPE.FACEBOOK) {
        // Initiate Facebook Posting
      } else if (type === SOCIAL_TYPE.LINKEDIN) {
        try {
          // Initiate LinkedIn Posting
          const redirectUrl = getAuthCallbackURL(req, "linkedin");

          const postInfo = {
            title: "This is title - " + Date.now(),
            description: "This is description text.",
            url: getBaseDomain(req, `poll/${poll._id}`),
          };
          const tokenObj = await initLinkedInPosting(subTypeId, postInfo, refreshToken, subType, redirectUrl);

          // SAVE ACCESS_TOKEN
          const info = {
            isConnected: true,
            accessToken: tokenObj.access_token,
            refreshToken: tokenObj.refresh_token,
            expiresInSeconds: tokenObj.refresh_token_expires_in,
          };
          await saveUserAccessTokens(user, type, subType, info);
        } catch (error) {
          const urs = await saveUserAccessTokens(user, type, subType, {
            isConnected: false,
            accounts: [],
            accessToken: "",
            refreshToken: "",
          });

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
async function initLinkedInPosting(id, postInfo, refreshToken, subType = PROFILE, redirectUrl) {
  return new Promise(async (resolve, reject) => {
    // Author
    const author = subType === PROFILE ? `urn:li:person:${id}` : `urn:li:organization:${id}`;

    // Auth Client
    const authClient = new AuthClient({
      clientId: LINKEDIN_APP_ID,
      clientSecret: LINKEDIN_APP_SECRET,
      redirectUrl: redirectUrl,
    });
    const restliClient = new RestliClient();
    restliClient.setDebugParams({ enabled: true });

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

module.exports = router;
