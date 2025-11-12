import fetch from "node-fetch";
import dotenv from "dotenv";
import PDF from "../models/pdfModel.js";

dotenv.config();

export const chatWithPDF = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    const pdf = await PDF.findOne().sort({ uploadedAt: -1 });
    if (!pdf) return res.status(404).json({ error: "No PDF found" });

    const prompt = `You are a helpful assistant. Use this PDF content to answer:\n\n${pdf.content}\n\nQuestion: ${question}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Textualio"
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ OpenRouter error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const answer = data.choices?.[0]?.message?.content || "No response from model.";
    res.json({ answer });
  } catch (err) {
    console.error("❌ Chat processing failed:", err);
    res.status(500).json({ error: "Chat processing failed" });
  }
};
