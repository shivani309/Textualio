// routes/adminRoutes.js
import express from "express";
import PDF from "../models/pdfModel.js";
import User from "../models/User.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all PDFs
router.get("/pdfs", verifyAdmin, async (req, res) => {
  const pdfs = await PDF.find().sort({ createdAt: -1 });
  res.json(pdfs);
});

// Rename a PDF
router.put("/pdfs/:id", verifyAdmin, async (req, res) => {
  const { name } = req.body;
  const pdf = await PDF.findByIdAndUpdate(req.params.id, { name }, { new: true });
  res.json({ message: "PDF renamed", pdf });
});

// Delete a PDF
router.delete("/pdfs/:id", verifyAdmin, async (req, res) => {
  await PDF.findByIdAndDelete(req.params.id);
  res.json({ message: "PDF deleted successfully" });
});

// View all users
router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find({}, "name email role createdAt");
  res.json(users);
});

//  Delete a user
router.delete("/users/:id", verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

export default router;
