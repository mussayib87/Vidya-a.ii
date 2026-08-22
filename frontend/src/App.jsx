import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                color: "#111111",
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
              }}
            >
              VIDYA AI ROUTER IS WORKING
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
