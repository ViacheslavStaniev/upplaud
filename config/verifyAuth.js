const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authorization = req.header("authorization");

  if (!authorization) return res.status(401).json({ msg: "No token, authorization denied" });

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
