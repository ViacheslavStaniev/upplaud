const fs = require("fs");
const path = require("path");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const { AuthClient, RestliClient } = require("linkedin-api-client");

const { REACT_APP_URL, SERVER_URL, JWT_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET } = process.env;

const randomString = (length = 30) => Array.from({ length }, () => Math.random().toString(36)[2]).join("");

const generateAuthToken = (user, expiresIn = 7 * 24 * 60 * 60) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn }, (err, token) => (err ? reject(err) : resolve(token)));
  });
};

const getAuthResponse = async (user) => ({ accessToken: await generateAuthToken(user), user });

const createUsername = ({ firstName = "", lastName = "" }) => {
  const cleanString = (str) => str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let username = "";
  if (firstName) username += cleanString(firstName);
  if (lastName) username += "-" + cleanString(lastName);

  return `${username}-${randomString(8)}`;
};

// Set User Session
const setUserSession = (req, user) => {
  return new Promise((resolve, reject) => {
    try {
      const { _id, type, status, email, show, isAdmin, isPublic, userName, lastName, firstName } = user;
      req.session.user = { id: _id, type, status, email, show, isAdmin, isPublic, userName, lastName, firstName };
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// Function to generate image using FFmpeg
const generateImage = (info) => {
  const getAssetPath = (file) => path.join(__dirname, "../assets", file);

  const arialFont = getAssetPath("arial.ttf");
  const baseImage = getAssetPath("base_image.png");
  const breeFont = getAssetPath("BreeSerif-Regular.ttf");
  const ffmpegPath = getAssetPath("ffmpeg-build/ffmpeg");
  const output = getAssetPath(`temp/temp_${Date.now()}.png`);

  const { showLogo, userLogo, header, footer, host, guest } = info;

  return new Promise((resolve, reject) => {
    // FFmpeg command
    const command = `'${ffmpegPath}' -i '${baseImage}' -i '${showLogo}' -i '${userLogo}' -filter_complex "[1:v]scale=400:400[top_left_scaled]; [2:v]scale=330:330[center_scaled]; [0:v][top_left_scaled]overlay=35:(h-h/2)-168/2[tmp_overlay]; [tmp_overlay][center_scaled]overlay=660:210, drawbox=x=0:y=0:w=iw:h=85:t=fill:color=${header.bgColor}@1[bg]; [bg]drawtext=text='${header.text}':x=30:y=15:fontsize=58:fontcolor=${header.fontColor}:fontfile='${breeFont}', drawbox=x=0:y=ih-85:w=iw:h=85:t=fill:color=${footer.bgColor}@1[bg_bottom]; [bg_bottom]drawtext=text='${footer.text}':x=30:y=h-th-15:fontsize=58:fontcolor=${footer.fontColor}:fontfile='${breeFont}', drawtext=text='${host.label} - ${host.text}':x=450:y=120:fontsize=24:fontcolor=${host.fontColor}:fontfile='${arialFont}', drawtext=text='${guest.label} - ${guest.text}':x=450:y=160:fontsize=24:fontcolor=${guest.fontColor}:fontfile='${arialFont}'" -vframes 1 '${output}'`;

    // Execute FFmpeg command
    exec(command, (error, stdout, stderr) => {
      if (error) return reject({ error: true, message: error.message });
      // if (stderr) console.log(`FFmpeg Error: ${stderr}`);

      // Reject if output file not generated
      if (!fs.existsSync(output)) return reject({ error: true, message: "Unable to generate image" });

      const imageBase64 = fs.readFileSync(output, { encoding: "base64" });

      // Delete file after reading
      fs.unlinkSync(output);

      resolve({ error: false, message: "Image generated successfully", imageBase64 });
    });
  });
};

// Get Base Domain URL
const getBaseDomain = (path = "") => `${SERVER_URL}/${path}`;

// Redirect to Webapp
const redirectToWebapp = (req, res) => res.redirect(REACT_APP_URL);

// Get Facebook Auth Client
const getFacebookAuthClient = () => {
  return axios.create({
    baseURL: "https://graph.facebook.com",
    headers: { "Content-Type": "application/json" },
  });
};

// LinkedIn Auth/Rest Clients
const getLinkedInAuthRestClients = (authType = "connect") => {
  const authClient = new AuthClient({
    clientId: LINKEDIN_APP_ID,
    clientSecret: LINKEDIN_APP_SECRET,
    redirectUrl: getBaseDomain(`auth/${authType}/linkedin-callback`),
  });

  const restliClient = new RestliClient();
  restliClient.setDebugParams({ enabled: true });

  return { authClient, restliClient };
};

module.exports.randomString = randomString;
module.exports.getBaseDomain = getBaseDomain;
module.exports.generateImage = generateImage;
module.exports.createUsername = createUsername;
module.exports.setUserSession = setUserSession;
module.exports.getAuthResponse = getAuthResponse;
module.exports.redirectToWebapp = redirectToWebapp;
module.exports.generateAuthToken = generateAuthToken;
module.exports.getFBAuthClient = getFacebookAuthClient;
module.exports.getLNAuthRestClients = getLinkedInAuthRestClients;
