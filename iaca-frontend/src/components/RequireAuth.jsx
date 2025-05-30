// src/components/RequireAuth.jsx
import { Navigate } from "react-router-dom";

export default function RequireAuth({ user, children }) {
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
