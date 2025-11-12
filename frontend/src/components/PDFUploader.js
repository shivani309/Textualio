import React, { useState } from "react";
import axios from "axios";

function PDFUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file first!");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/pdf/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ PDF uploaded successfully!");
      setFile(null);
      onUploadSuccess(); // refresh PDF list
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.response?.data?.message || "❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Upload PDF</h5>
      <input
        type="file"
        accept="application/pdf"
        className="form-control"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={uploading}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default PDFUploader;
