// Desc: Middleware to verify user is logged in
module.exports = function (req, res, next) {
  const { user } = req.session;
  if (!user) return res.status(401).json({ msg: "No user, authorization denied" });

  req.userObj = user;
  req.userId = user.id;
  next();
};
