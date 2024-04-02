const jwt = require("jsonwebtoken");

// Initialize blacklist as a Set
const blacklist = new Set();

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Check if token is in blacklist
    if (blacklist.has(token)) {
      return res.status(401).json({ message: "Token revoked" });
    }
    // Store decoded token in request object for later use
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken, blacklist }; // Export the blacklist
