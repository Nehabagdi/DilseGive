import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, role }: any) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(storedUser);

  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};
