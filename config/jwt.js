import jwt from "jsonwebtoken";

// Generate Token
export const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Verify Token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
