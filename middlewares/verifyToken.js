const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", err });
    }
  } else {
    return res.status(401).json({ message: "Token not provided" });
  }
}
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {

      return res.status(403).json({ message: "Admin privileges required" });
    } else {
      next()
    }
  });
}
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Not authorized" });
    }
  });
}
module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
