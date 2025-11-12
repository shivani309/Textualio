import React, { useState } from "react";
import axios from "axios";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return alert("Please enter a question!");
    setLoading(true);
    setAnswer("");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { question },
        config
      );
      setAnswer(res.data.answer);
    } catch (err) {
      console.error("Chat error:", err);
      if (err.response?.status === 401)
        alert("Session expired! Please log in again.");
      else
        alert(err.response?.data?.error || "Chat failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h5>Ask Questions About Your Notes</h5>

      <textarea
        className="form-control"
        rows="3"
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      ></textarea>

      <button
        className="btn btn-success mt-2"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask"}
      </button>

      {answer && (
        <div className="alert alert-info mt-3">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default ChatBox;
