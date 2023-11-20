const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const { AuthClient, RestliClient } = require("linkedin-api-client");

const { REACT_APP_URL, SERVER_URL, JWT_SECRET, LINKEDIN_APP_ID, LINKEDIN_APP_SECRET, LINKEDIN_VERSION } = process.env;

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

// Get Asset Path
const getAssetPath = (pathStr = "") => path.join(__dirname, "../assets", pathStr);

// Function to generate image using FFmpeg
const generateImage = (info) => {
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

// Function to Live Stream a video
const liveStreamTheVideo = (info) => {
  const { video_url, stream_url } = info;
  const ffmpegPath = getAssetPath("ffmpeg-build/ffmpeg");

  return new Promise((resolve, reject) => {
    // FFmpeg command
    const command = `'${ffmpegPath}' -re -i '${video_url}' -c:a copy -ac 1 -ar 44100 -b:a 96k -vcodec libx264 -pix_fmt yuv420p -vf scale=1080:-1 -r 30 -g 60 -tune zerolatency -f flv -maxrate 2000k -preset veryfast '${stream_url}'`;

    // Execute FFmpeg command
    exec(command, (error, stdout, stderr) => {
      if (error) return reject({ error: true, message: error.message });
      // if (stderr) console.log(`FFmpeg Error: ${stderr}`);

      resolve({ error: false, message: "Video streamed successfully" });
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

  // Axios Rest Client
  const axiosRestClient = axios.create({
    baseURL: "https://api.linkedin.com/rest",
    headers: { "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0", "LinkedIn-Version": LINKEDIN_VERSION },
  });

  return { authClient, restliClient, axiosRestClient };
};

// Function to download the file from the URL
const downloadFile = async (url, fileName = "") => {
  const destination = getAssetPath(`temp/${fileName}`);

  const writer = fs.createWriteStream(destination);

  return axios({
    url: url,
    method: "get",
    responseType: "stream",
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // In case of self-signed certificates
  }).then((response) => {
    response.data.pipe(writer);
    console.log(`Downloading file from ${url} to ${destination}`, response.status, response.statusText);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(destination));
      writer.on("error", reject);
    });
  });
};

// Function to remove the file from the path
const removeFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => (err ? reject(err) : resolve()));
  });
};

// Upload the file to the URL
const uploadFile = async (videoUrl, uploadUrl) => {
  const uploadCommand = `curl -v -H 'Content-Type: application/octet-stream' --upload-file ${videoUrl} '${uploadUrl}'`;

  // Function to execute cURL commands
  return new Promise((resolve, reject) => {
    exec(uploadCommand, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
};

module.exports.uploadFile = uploadFile;
module.exports.removeFile = removeFile;
module.exports.downloadFile = downloadFile;
module.exports.getAssetPath = getAssetPath;
module.exports.randomString = randomString;
module.exports.getBaseDomain = getBaseDomain;
module.exports.generateImage = generateImage;
module.exports.createUsername = createUsername;
module.exports.setUserSession = setUserSession;
module.exports.getAuthResponse = getAuthResponse;
module.exports.redirectToWebapp = redirectToWebapp;
module.exports.generateAuthToken = generateAuthToken;
module.exports.getFBAuthClient = getFacebookAuthClient;
module.exports.liveStreamTheVideo = liveStreamTheVideo;
module.exports.getLNAuthRestClients = getLinkedInAuthRestClients;
