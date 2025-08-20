import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;

    // 1. Check for token in cookies
    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }
    // 2. Check for token in Authorization header
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3. If no token found
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    // 5. Find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 6. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
