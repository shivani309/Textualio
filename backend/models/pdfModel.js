import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  name: { type: String, required: false },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;
