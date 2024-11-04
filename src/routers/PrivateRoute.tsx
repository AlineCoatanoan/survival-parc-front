import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/authContext";

interface PrivateRouteProps {
  allowedRoles?: string[];
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Vérifie si l'utilisateur a le rôle requis
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />; // Rendre les enfants ici
}
