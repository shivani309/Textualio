import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PDFUploader from "./components/PDFUploader";
import ChatBox from "./components/ChatBox";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPDFs from "./components/MyPdfs";
import AdminDashboard from "./components/AdminDashboard"; // ✅ Admin module
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="App">
      <Navbar />

      {!user ? (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Textual.io – Smart Learning Assistant</h2>
          <div className="row">
            <div className="col-md-6">
              <Login onLogin={setUser} />
            </div>
            <div className="col-md-6">
              <Register />
            </div>
          </div>
        </div>
      ) : user.role === "admin" ? (
        // ✅ Admin Dashboard view
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Admin Panel – {user.name}</h5>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <AdminDashboard />
        </div>
      ) : (
        // ✅ Normal user view
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Welcome, {user.name}</h5>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <PDFUploader onUploadSuccess={triggerRefresh} />
          <MyPDFs key={refresh} />
          <ChatBox />
        </div>
      )}
    </div>
  );
}

export default App;
