import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        color: "#111827",
        fontSize: "32px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      VIDYA AI TEST
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
