import { Navigate } from "react-router-dom";

export function ProtectedRoute({ isloggedIn, children }) {
  if (!isloggedIn) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return children;
}
