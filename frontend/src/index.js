import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/App.css";

// If you used React Router in App, ensure BrowserRouter is inside App (as provided earlier)

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
