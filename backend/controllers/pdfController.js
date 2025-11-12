import PDF from "../models/pdfModel.js";
import pdfParse from "pdf-parse";
import fs from "fs";

export const uploadPDF = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const newPDF = new PDF({
      filename: req.file.originalname,
      content: pdfData.text
    });

    await newPDF.save();
    res.json({ message: "PDF uploaded successfully", pdf: newPDF });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF upload failed" });
  }
};
