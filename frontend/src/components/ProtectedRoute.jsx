import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({
  children,
  isAuthenticated = false,
}) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;
