import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import PDF from "../models/pdfModel.js";
import { protect } from "../middleware/authMiddleware.js";
import PDFParser from "pdf2json";

const router = express.Router();

// Configure Multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Upload and extract PDF text using pdf2json
router.post("/upload", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

    const pdfParser = new PDFParser();

    pdfParser.loadPDF(req.file.path);

    pdfParser.on("pdfParser_dataError", errData => {
      console.error("❌ PDF parse error:", errData.parserError);
      res.status(500).json({ message: "PDF parsing failed" });
    });

    pdfParser.on("pdfParser_dataReady", async pdfData => {
      const extractedText = pdfData?.formImage?.Pages?.map(page =>
        page.Texts.map(text => decodeURIComponent(text.R[0].T)).join(" ")
      ).join("\n\n");

      const pdf = await PDF.create({
        filename: req.file.originalname,
        filePath: req.file.path,
        content: extractedText || "No readable text found.",
        user: req.user._id,
        uploadedAt: new Date(),
      });

      res.json({ message: "✅ PDF uploaded successfully!", pdf });
    });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ message: "PDF upload failed", error: err.message });
  }
});
// ✅ Get all PDFs for a user
router.get("/", protect, async (req, res) => {
  try {
    const pdfs = await PDF.find({ user: req.user._id }).sort({ uploadedAt: -1 });
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch PDFs" });
  }
});

export default router;
