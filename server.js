// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Route/index.js";

// Load environment variables early
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Frontend URL
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const allowedOrigins = [frontendUrl];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // ✅ Allow
      } else {
        console.warn(`❌ CORS Blocked: ${origin}`);
        callback(new Error("Not allowed by CORS")); // ❌ Block
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Global error handler for CORS and other middleware issues
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Allowed frontend URL: ${frontendUrl}`);
});
