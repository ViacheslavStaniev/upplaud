const jwt = require("jsonwebtoken");

const randomString = (length = 30) => Array.from({ length }, () => Math.random().toString(36)[2]).join("");

const generateAuthToken = (user, expiresIn = 7 * 24 * 60 * 60) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn }, (err, token) => (err ? reject(err) : resolve(token)));
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

module.exports.randomString = randomString;
module.exports.createUsername = createUsername;
module.exports.getAuthResponse = getAuthResponse;
module.exports.generateAuthToken = generateAuthToken;
