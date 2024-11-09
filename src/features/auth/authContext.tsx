import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { loginUser as loginUserService, logoutUser as logoutUserService, createAccount as registerUserService } from "./authService";
import { IUser } from "../../@types";

// Export de AuthContextType
export interface AuthContextType {
  user: IUser | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Création du contexte et exportation
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // Fonction de connexion
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await loginUserService(email, password);
      if (response.success && response.data) {
        setUser(response.data.user);
        console.log("Connexion réussie:", response.data.user);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        throw new Error(response.message || "Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logoutUser = async () => {
    try {
      await logoutUserService();
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      throw error;
    }
  };

  // Fonction d'inscription
  const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await registerUserService({ firstName, lastName, email, password });
      if (response.success && response.data) {
        await loginUser(email, password); // Connexion automatique après inscription
      } else {
        throw new Error(response.message || "Échec de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  };

  // Détermine si l'utilisateur est administrateur
  const isAdmin = user?.role === 'admin';

  // Récupération des données utilisateur au démarrage de l'application
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser, isAuthenticated: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Définir la fonction `useAuth` et l'exporter
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
