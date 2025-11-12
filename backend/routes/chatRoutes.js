import express from "express";

const router = express.Router();

// Dummy Q&A data
const dummyQA = [
  {
    question: "What was Bajaj Finserv’s consolidated profit for Q1 FY2025-26?",
    answer: "Bajaj Finserv reported a consolidated profit of around ₹2,800 crore in Q1 FY2025-26, reflecting strong performance across lending, insurance, and investment verticals."
  },
  {
    question: "How did Bajaj Finance perform in this quarter?",
    answer: "Bajaj Finance saw growth in its AUM and customer base, supported by continued expansion in digital lending and consumer finance."
  },
  {
    question: "What are Bajaj Finserv’s key business segments?",
    answer: "The key business segments include Lending (Bajaj Finance), Insurance (Bajaj Allianz Life and General Insurance), and Investments."
  },
  {
    question: "What is Bajaj Finserv’s focus for FY2025-26?",
    answer: "The company aims to drive growth through digital transformation, customer engagement, and risk management."
  },
  {
    question: "How is Bajaj Finserv leveraging technology?",
    answer: "Bajaj Finserv is focusing on digital innovation, using AI and analytics for underwriting, fraud detection, and customer experience enhancement."
  }
];

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ answer: "No question provided." });

    // Find the closest matching question
    const match = dummyQA.find((q) =>
      question.toLowerCase().includes(q.question.toLowerCase().split(" ")[2])
    );

    res.json({
      answer: match ? match.answer : "I’m sorry, I couldn’t find relevant data in this PDF."
    });
  } catch (error) {
    console.error("❌ Chat error:", error);
    res.status(500).json({ answer: "Server error while fetching answer." });
  }
});

export default router;
