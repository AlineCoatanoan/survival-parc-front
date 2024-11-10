import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/authContext";

interface PrivateRouteProps {
  allowedRoles?: string[];
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/mon-compte/:userId" />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/Dashboard" />; // Redirige vers l'accueil si l'utilisateur n'a pas les droits
  }

  return <Outlet />;
}

