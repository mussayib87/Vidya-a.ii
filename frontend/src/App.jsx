import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ padding: "50px", fontSize: "32px" }}>
            Vidya AI Home
          </div>
        }
      />

      <Route
        path="/login"
        element={
          <div style={{ padding: "50px", fontSize: "32px" }}>
            VIDYA AI LOGIN TEST
          </div>
        }
      />
    </Routes>
  );
}

export default App;
