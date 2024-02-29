const express = require("express");
const passport = require("passport");
const SocialAccount = require("./../models/SocialAccount");
const SocialPosting = require("./../models/SocialPosting");
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const { sendEmail } = require("../helpers/email");
const { POLL_STATUS } = require("./../models/Guest");
const { SOCIAL_TYPE, SOCIAL_SUB_TYPE } = require("./../models/SocialAccount");
const {
  removeFile,
  uploadFile,
  downloadFile,
  getBaseDomain,
  getFrontendUrl,
  getFBAuthClient,
  redirectToWebapp,
  liveStreamTheVideo,
  getLNAuthRestClients,
} = require("../helpers/utills");
const { getUserByUserName } = require("./users");
const { getS3Path } = require("../helpers/s3Helper");

const router = express.Router();
const { PROFILE, PAGE, GROUP } = SOCIAL_SUB_TYPE;
const { LINKEDIN, FACEBOOK } = SOCIAL_TYPE;

const { REACT_APP_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET, LINKEDIN_VERSION } = process.env;
const AuthOptions = { failureRedirect: "/auth/connect/error", failureFlash: false, session: false, failureMessage: true };

const getAuthCallbackURL = (urlFor) => getBaseDomain(`auth/connect/${urlFor}-callback`);

const responseBackToWebapp = async (req, res) => {
  res.redirect(`${req?.authInfo?.returnUrl || REACT_APP_URL}?isConnected=1`);
};

const attachUserToReq = async (req, res, next) => {
  const { returnUrl } = req?.query;
  const { username } = req?.params;
  if (!username) return res.status(401).json({ msg: "No username, authorization denied" });

  try {
    const user = await getUserByUserName(username);
    req.userObj = user;
    req.userId = user.id;
    req.returnUrl = returnUrl;
    next();
  } catch (error) {
    res.status(401).json({ error: true, msg: "User doesn't exists." });
  }
};

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
        scope: ["email", "public_profile", "publish_to_groups", "pages_manage_posts", "pages_read_engagement", "publish_video"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = req?.userObj;
          const { id, profileUrl } = profile;

          if (user && id) {
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

            done(null, updatedUser, { returnUrl: req?.returnUrl });
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
          const user = req?.userObj;
          const { id, _json } = profile;

          if (user && id) {
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

            done(null, updatedUser, { returnUrl: req?.returnUrl });
          } else done(null, null);
        } catch (error) {
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
router.get("/facebook/:username", attachUserToReq, setFacebookStrategy, passport.authenticate("facebook"), redirectToWebapp);

// @route   GET auth/connect/facebook-callback
// @desc    Handle response from facebook
// @access  Public
router.get("/facebook-callback", passport.authenticate("facebook", AuthOptions), responseBackToWebapp);

// @route   GET auth/connect/linkedin
// @desc    Connect user with linkedin account
// @access  Public
router.get("/linkedin/:username", attachUserToReq, setLinkedinStrategy, passport.authenticate("linkedin"), redirectToWebapp);

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
      .populate({ path: "poll", populate: { path: "pollImageInfo" } })
      .populate({ path: "user", populate: { path: "socialAccounts" } });
    if (activePostings.length === 0) return res.status(200).json({ error: false, msg: "No active posting found." });

    // Initiate Postings
    const postingResults = [];
    for (let i = 0; i < activePostings.length; i++) {
      const posting = activePostings[i];
      const { poll, user, type, subType, subTypeId, frequency, frequencyPosted } = posting;

      // Check is poll is published
      if (!poll || poll.status === POLL_STATUS.DRAFT || !subTypeId || !poll?.socialShareFileSrc) continue;

      // Check if social account is connected
      const socialAccount = user.socialAccounts.find((s) => s.type === type);
      if (!socialAccount) continue;

      // Check if social account is active
      const { isConnected, accessToken, refreshToken, page } = socialAccount;
      if (!isConnected) continue;

      // Post Info
      const postInfo = {
        title: "Click the link in the text to vote",
        description: getSocialShareText(poll, user),
        url: getS3Path(poll.socialShareFileSrc),
      };

      // Initiate Posting
      if (type === SOCIAL_TYPE.FACEBOOK) {
        try {
          const access_token = subType === PAGE ? page?.accounts.find((a) => a.id === subTypeId)?.access_token : accessToken;
          const tokenObj = await initFacebookPosting(subTypeId, postInfo, access_token, subType);
          console.log(tokenObj);
          postingResults.push({ type, error: false, msg: "Posted on Facebook", posting });
        } catch (error) {
          console.log(error);
          postingResults.push({ type, error: true, msg: error?.message || "Error posting on Facebook", posting });
        }
      } else if (type === SOCIAL_TYPE.LINKEDIN) {
        try {
          // Download Video
          postInfo.videoUrl = await downloadFile(postInfo.url, `${Date.now()}.mp4`);

          const tokenObj = await initLinkedInPosting(subTypeId, postInfo, refreshToken, subType);

          // SAVE ACCESS_TOKEN
          await saveUserAccessTokens(user, {
            type,
            subType,
            accessToken: tokenObj.access_token,
            refreshToken: tokenObj.refresh_token,
            expiresInSeconds: tokenObj.refresh_token_expires_in,
          });
          postingResults.push({ type, error: false, msg: "Posted on Linkedin", posting });
        } catch (error) {
          // await saveUserAccessTokens(user, { type, subType, isConnected: false, expiresInSeconds: 0 });
          console.log(error);
          postingResults.push({ type, error: true, msg: error?.message || "Error posting on Linkedin", posting });
        }
      }
    }

    res.status(200).json({ postingResults, error: false, msg: "Posting completed successfully." });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: true, msg: error?.response?.data?.error_description || error?.message });
  }
});

// Initiate LinkedIn Posting
async function initLinkedInPosting(id, postInfo, refreshToken, subType = PROFILE) {
  console.log("Posting on LinkedIn", subType, id);
  return new Promise(async (resolve, reject) => {
    const { title, description, videoUrl } = postInfo; // Post Content
    const { authClient, restliClient, axiosRestClient } = getLNAuthRestClients();
    const author = subType === PROFILE ? `urn:li:person:${id}` : `urn:li:organization:${id}`; // Author

    try {
      // Fetch new access token
      const tokenObj = await authClient.exchangeRefreshTokenForAccessToken(refreshToken);
      const accessToken = tokenObj?.access_token;

      // Add access token to axios rest client
      axiosRestClient.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      // 1. Register Upload
      const uploadData = {
        registerUploadRequest: {
          owner: author,
          recipes: ["urn:li:digitalmediaRecipe:feedshare-video"],
          serviceRelationships: [{ identifier: "urn:li:userGeneratedContent", relationshipType: "OWNER" }],
        },
      };
      const { data } = await axiosRestClient.post("/assets?action=registerUpload", uploadData);
      const asset = data.value.asset;
      const assetId = asset.split("urn:li:digitalmediaAsset:")[1];
      const uploadUrl = data.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
      console.log("Step 1: Register Upload Complete");

      // 2. Upload Video
      await uploadFile(videoUrl, uploadUrl);
      console.log("Step 2: Video Upload Complete");

      // 3. Checck if video is ready
      let isReady = false;
      while (!isReady) {
        const { data } = await restliClient.get({ resourcePath: `/assets/${assetId}`, accessToken });
        isReady = data.recipes[0]?.status === "AVAILABLE";
        console.log("isReady =>", assetId, isReady);
        if (!isReady) await new Promise((resolve) => setTimeout(resolve, 2500)); // Retry checking after 2.5 seconds
      }
      console.log("Step 3: Is asset available? ", isReady);

      // 4. Create Post
      const post = {
        author,
        visibility: "PUBLIC",
        commentary: description,
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
        content: { media: { title, id: `urn:li:video:${assetId}` } },
        distribution: { targetEntities: [], feedDistribution: "MAIN_FEED", thirdPartyDistributionChannels: [] },
      };
      const res2 = await axiosRestClient.post("/posts", post);
      console.log("Step 4: Post Creation completed ", res2.data, res2.status, res2.statusText);

      resolve(tokenObj);
    } catch (error) {
      console.log(error);
      reject({ error: true, msg: error?.response?.data?.error_description || error?.message });
    } finally {
      await removeFile(videoUrl); // Remove Video File from local
    }
  });
}

// Initiate Facebook Posting
async function initFacebookPosting(id, postInfo, access_token, subType = PROFILE) {
  console.log("Posting on Facebook", subType, id);
  return new Promise(async (resolve, reject) => {
    // Get refresh token
    // const res = await authClient.get(
    //   `/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${accessToken}`
    // );
    // const { access_token } = res.data;
    // console.log("access_token", access_token);

    try {
      const authClient = getFBAuthClient();

      // Post Content
      const { title, description, url } = postInfo;

      // Post video on Facebook
      if ([PAGE, GROUP].includes(subType)) {
        // Post on Page/Group
        await authClient.post(`/${id}/videos`, { title, description, access_token, file_url: url, published: true });

        resolve({ error: false, msg: "Posted on Facebook" });
      } else {
        // Live Stream on Facebook
        const { data } = await authClient.post(`/${id}/live_videos`, {
          title,
          description,
          access_token,
          status: "LIVE_NOW",
          privacy: { value: "EVERYONE" },
        });

        // Live Stream the Video
        const result = await liveStreamTheVideo({ video_url: url, stream_url: data.stream_url });

        // End the Live Stream
        await authClient.post(`/${data.id}`, { end_live_video: true, access_token });

        resolve(result);
      }
    } catch (error) {
      reject({ error: true, msg: error?.response?.data?.error?.message || error?.message });
    }
  });
}

// Get Social Share Text
function getSocialShareText(poll, user) {
  const { footer, header } = poll?.pollImageInfo || {};
  const voteLink = getFrontendUrl(`vote/${poll?._id}`);

  return `VOTE NOW: ${voteLink} \n\n${footer?.text || ""} \n${header?.text || ""}`;
}

module.exports = router;
