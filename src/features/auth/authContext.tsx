import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { loginUser as loginUserService, logoutUser as logoutUserService, createAccount as registerUserService } from "./authService";
import { IUser } from "../../@types";
import { jwtDecode } from "jwt-decode";

// Export de AuthContextType
export interface AuthContextType {
  user: IUser | null;
  userId: string | null;  // userId est maintenant obligatoire
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;  // Ajouter un état de chargement
}

// Création du contexte et exportation
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);  // Initialiser l'état de chargement à true

  // Vérifie si le token est expiré
  function isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token); 
      const currentTime = Math.floor(Date.now() / 1000); 
      return decoded.exp < currentTime; 
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error);
      return true; 
    }
  }
  

 // Fonction de connexion
 const loginUser = async (email: string, password: string) => {
  try {
    const response = await loginUserService(email, password);
    if (response.success && response.data) {
      const token = response.data.token;

      if (!isTokenExpired(token)) {
        setUser(response.data.user); // Mettre à jour l'utilisateur
        localStorage.setItem("token", token); // Stocker le token
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Stocker les données utilisateur
      } else {
        throw new Error("Token expiré");
      }
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
      if (isTokenExpired(token)) {
        console.log("Token expiré. Suppression des données utilisateur.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        setUser(JSON.parse(storedUser)); // Définir l'utilisateur uniquement si le token est valide
      }
    }
  
    setLoading(false); // L'état de chargement peut être défini une fois la validation terminée
  }, []);
  
  

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userId: user ? user.id.toString() : null,  // Conversion en chaîne de caractères
        loginUser, 
        logoutUser, 
        registerUser, 
        isAuthenticated: !!user, 
        isAdmin, 
        loading 
      }}
    >
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
