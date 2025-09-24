import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../Model/user.js";
import { verifyToken } from "../config/jwt.js";

dotenv.config();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
// Role Middleware: Checks if user is admin
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};


