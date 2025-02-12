const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" ,err});
    }
  } else {
    return res.status(401).json({ message: "Token not provided" });
  }
}
module.exports = { verifyToken };
