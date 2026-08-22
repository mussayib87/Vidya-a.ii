import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            style={{
              minHeight: "100vh",
              padding: "50px",
              fontSize: "32px",
              color: "#111",
              background: "#fff",
            }}
          >
            Vidya AI Home
          </div>
        }
      />

      <Route
        path="/login"
        element={
          <div
            style={{
              minHeight: "100vh",
              padding: "50px",
              fontSize: "32px",
              color: "#111",
              background: "#fff",
            }}
          >
            VIDYA AI LOGIN TEST
          </div>
        }
      />
    </Routes>
  );
}

export default App;
