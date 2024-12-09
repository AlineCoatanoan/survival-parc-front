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
  password: string;  // Ajout du champ "password"
}): Promise<RegisterResponse> => {
  try {
    console.log('Données envoyées :');  // Afficher toutes les données envoyées

    // Envoie de la requête pour créer l'utilisateur
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
    }>(`/api/user/register`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,  // Assurer que le mot de passe est inclus
    });

    // Effectuer un login automatique après l'inscription
    const loginResponse = await loginUser(data.email, data.password);  // Utiliser le mot de passe ici

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
        token: loginResponse.data.token,  // Utilisez le token renvoyé par la connexion
      },
    };
  } catch (error) {
    let errorMessage = "Une erreur est survenue, veuillez réessayer.";
    if (error instanceof AxiosError && error.response) {
      console.error('Erreur du serveur :', error.response);
      const validationErrors =
        error.response.data.errors || error.response.data.message || error.message;
      errorMessage = validationErrors;
    }
    return { success: false, message: errorMessage, data: null };
  }
};


// Fonction de connexion (inchangée)
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
