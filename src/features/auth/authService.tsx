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
  data: { user: IUser } | null;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

//+++++AUTH+++++

// Fonction pour créer un compte utilisateur
export const createAccount = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<{
      message: string;
      data: {
        id: number; // Utilisation de 'number'
        email: string;
        role: string;
        createdAt: string; // Date en tant que chaîne
        updatedAt: string; // Date en tant que chaîne
        password: string; // Ajout du mot de passe
      };
    }>(
      `${apiBaseUrl}/api/user/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return {
      success: true,
      message: response.data.message,
      data: {
        user: {
          id: response.data.data.id, // Assurez-vous que c'est bien un 'number'
          email: response.data.data.email,
          role: response.data.data.role,
          createdAt: new Date(response.data.data.createdAt), // Conversion en 'Date'
          updatedAt: new Date(response.data.data.updatedAt), // Conversion en 'Date'
          password: response.data.data.password, // Assurez-vous que le mot de passe est inclus ici
        },
      },
    };
  } catch (error) {
    let errorMessage = "Une erreur est survenue, veuillez réessayer.";

    if (error instanceof AxiosError && error.response) {
      const validationErrors =
        error.response.data.errors ||
        error.response.data.message ||
        error.message;
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
    const response = await axios.post<LoginResponse>(
      `${apiBaseUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return {
      success: true,
      message: "Connexion réussie",
      data: response.data.data,
    };
  } catch (error) {
    let errorMessage = "Une erreur inconnue s'est produite.";
    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data.message || "Erreur lors de la connexion";
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
    const response = await axios.post(
      `${apiBaseUrl}/api/auth/logout`,
      {}, // corps de requette vide
      { withCredentials: true }
    );

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
    console.log(error);
    let errorMessage = "Erreur lors de la déconnexion.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data.message || "Erreur réseau";
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};