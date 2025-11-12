import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import pdfRoutes from "./routes/pdfRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// 👇 Add this simple logger BEFORE your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Root route
app.get("/", (req, res) => res.send("🚀 Server is running successfully!"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
