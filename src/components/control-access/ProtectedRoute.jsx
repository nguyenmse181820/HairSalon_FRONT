import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../main.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user?.isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
