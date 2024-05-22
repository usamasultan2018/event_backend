const jwt = require("jsonwebtoken");
const User = require("./../models/user");
require('dotenv').config();

const adminMiddleware = async (req, res, next) => {
  // Check for authorization header
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not found or invalid format" });
  }

  try {
    // Extract token from the header
    const token = authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request object

    // Use async/await to fetch the user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    // If all checks pass, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors like invalid or expired tokens, database errors, etc.
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
 


module.exports = adminMiddleware;
