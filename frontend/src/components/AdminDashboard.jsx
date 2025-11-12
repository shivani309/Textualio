import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [pdfs, setPdfs] = useState([]);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const pdfRes = await axios.get("http://localhost:5000/api/admin/pdfs", config);
    const userRes = await axios.get("http://localhost:5000/api/admin/users", config);
    setPdfs(pdfRes.data);
    setUsers(userRes.data);
  };

  const handleRename = async (id) => {
    const newName = prompt("Enter new name:");
    await axios.put(`http://localhost:5000/api/admin/pdfs/${id}`, { name: newName }, config);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this PDF?")) {
      await axios.delete(`http://localhost:5000/api/admin/pdfs/${id}`, config);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <h3>🛠 Admin Dashboard</h3>

      <h5 className="mt-3">📄 All PDFs</h5>
      <ul className="list-group">
        {pdfs.map((p) => (
          <li key={p._id} className="list-group-item d-flex justify-content-between">
            {p.name}
            <div>
              <button className="btn btn-sm btn-warning mx-1" onClick={() => handleRename(p._id)}>Rename</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h5 className="mt-4">👥 Users</h5>
      <ul className="list-group">
        {users.map((u) => (
          <li key={u._id} className="list-group-item d-flex justify-content-between">
            {u.name} ({u.email}) - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
