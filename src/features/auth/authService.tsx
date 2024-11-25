import axios, { AxiosError } from "axios";
import { apiBaseUrl } from "../../services/config"; 
import { IUser, IProfile } from "../../@types";

export interface LoginResponse {
  success: boolean;
  message: string;
  data: { 
    token: string; 
    user: IUser;
    profile: IProfile | null;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: { user: IUser; token?: string } | null;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Créer une instance Axios
const api = axios.create({
  baseURL: apiBaseUrl, // Base URL
  headers: { "Content-Type": "application/json" }, // En-têtes par défaut
  withCredentials: true,
});

// Ajouter un intercepteur pour inclure le token dans les requêtes sortantes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Récupérer le token du localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans les en-têtes
    }
    return config;
  },
  (error) => Promise.reject(error) // Gérer les erreurs
);

//+++++AUTH+++++
export const createAccount = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}): Promise<RegisterResponse> => {
  try {
    // Ne pas afficher le mot de passe, seulement les autres données sensibles
    console.log('Données envoyées (sans mot de passe) :', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    // Envoie de la requête POST au backend pour créer l'utilisateur
    const response = await api.post<{
      message: string;
      data: {
        id: number;
        email: string;
        role: string;
        firstName?: string;
        lastName?: string;
        createdAt: string;
        updatedAt: string;
      };
    }>(`/api/user/register`, data);

    // Vérifie si le token est envoyé dans un cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1]; // Récupère le token à partir du cookie

    // Si un token est trouvé dans le cookie, on le stocke aussi dans le localStorage
    if (token) {
      // Ajouter un cookie avec un délai d'expiration (1h ici) si ce n'est pas déjà fait côté serveur
      document.cookie = `authToken=${token}; max-age=3600; path=/`; // Cookie valable pendant 1 heure
      localStorage.setItem("authToken", token); // Sauvegarde le token dans le localStorage
    }

    return {
      success: true,
      message: response.data.message,
      data: {
        user: {
          id: response.data.data.id,
          email: response.data.data.email,
          firstName: response.data.data.firstName || '',
          lastName: response.data.data.lastName || '',
          role: response.data.data.role,
          createdAt: new Date(response.data.data.createdAt),
          updatedAt: new Date(response.data.data.updatedAt),
        },
        token: token,  // Ajouter le token à la réponse
      },
    };
  } catch (error) {
    let errorMessage = "Une erreur est survenue, veuillez réessayer.";
    if (error instanceof AxiosError && error.response) {
      // Afficher la réponse d'erreur dans la console
      console.error('Erreur du serveur :', error.response);
      const validationErrors =
        error.response.data.errors || error.response.data.message || error.message;
      errorMessage = validationErrors;
    }
    return { success: false, message: errorMessage, data: null };
  }
};



// Fonction pour connecter un utilisateur
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      `/api/auth/login`,
      { email, password }
    );

    // Récupérer le token et le stocker
    const token = response.data.data.token;
    if (token) {
      localStorage.setItem("authToken", token); // Stocke le token dans localStorage
    }

    return {
      success: true,
      message: "Connexion réussie",
      data: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Une erreur inconnue s'est produite.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data.message || "Erreur lors de la connexion";
      console.error("Erreur API :", error.response?.data);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// Fonction pour déconnecter l'utilisateur
export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    const response = await api.post(
      `/api/auth/logout`,
      {} // Corps de requête vide
    );

    // Nettoyage du token dans le localStorage
    localStorage.removeItem("authToken");

    if (response.status === 200) {
      return {
        success: true,
        message: "Déconnexion réussie",
      };
    } else {
      return {
        success: false,
        message: "Échec de la déconnexion",
      };
    }
  } catch (error) {
    let errorMessage = "Erreur lors de la déconnexion.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data.message || "Erreur réseau";
    }

    // Assure-toi que le token est bien supprimé même en cas d'erreur
    localStorage.removeItem("authToken");

    return {
      success: false,
      message: errorMessage,
    };
  }
};
