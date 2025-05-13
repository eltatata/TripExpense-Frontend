import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" />; 
  }

  return children;
};

export default ProtectedRoute;
