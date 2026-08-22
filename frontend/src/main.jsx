import React from "react";
import ReactDOM from "react-dom/client";

function TestApp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        fontSize: "32px",
        fontWeight: "600",
      }}
    >
      VIDYA AI IS WORKING
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);
