import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/authContext";

interface PrivateRouteProps {
  allowedRoles?: string[];
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();

  // Si l'utilisateur n'est pas authentifié, afficher un message ou la page d'erreur
  if (!isAuthenticated) {
    return <div>Accès refusé. Vous devez être connecté pour accéder à cette page.</div>;
  }

  // Si l'utilisateur n'a pas les bons rôles, redirige vers le Dashboard ou une autre page
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/Dashboard" />;
  }

  // Si l'utilisateur est authentifié et a le bon rôle, afficher la route protégée
  return <Outlet />;
}
