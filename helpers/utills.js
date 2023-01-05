const jwt = require("jsonwebtoken");

const randomString = (length = 30) => Array.from({ length }, () => Math.random().toString(36)[2]).join("");

const generateAuthToken = (payload, expiresIn = 30 * 24 * 60 * 60) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => (err ? reject(err) : resolve({ token })));
  });
};

module.exports.randomString = randomString;
module.exports.generateAuthToken = generateAuthToken;
