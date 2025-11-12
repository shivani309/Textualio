import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to protect routes (for logged-in users)
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user excluding password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ error: "User not found" });
      }

      next();
    } catch (err) {
      console.error("❌ Auth error:", err);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

//Middleware to allow only admins
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admins only." });
  }
};
