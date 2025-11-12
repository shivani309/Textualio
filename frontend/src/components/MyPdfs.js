import React, { useEffect, useState } from "react";
import axios from "axios";

function MyPDFs() {
  const [pdfs, setPdfs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ✅ Fetch PDFs
  const fetchPDFs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pdf", config);
      setPdfs(res.data);
    } catch (err) {
      console.error("Failed to fetch PDFs:", err);
    }
  };

  // ✅ Delete PDF
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/pdf/${id}`, config);
      setPdfs(pdfs.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Rename PDF
  const handleRename = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/pdf/${id}`, { name: newName }, config);
      setEditingId(null);
      setNewName("");
      fetchPDFs();
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  return (
    <div className="card p-3 mb-3">
      <h5>📚 My PDFs</h5>
      {pdfs.length === 0 ? (
        <p>No PDFs uploaded yet.</p>
      ) : (
        <ul className="list-group">
          {pdfs.map((pdf) => (
            <li
              key={pdf._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingId === pdf._id ? (
                <>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleRename(pdf._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{pdf.name || pdf.filename}</span>
                  <div>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => {
                        setEditingId(pdf._id);
                        setNewName(pdf.name || pdf.filename);
                      }}
                    >
                      Rename
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(pdf._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPDFs;
