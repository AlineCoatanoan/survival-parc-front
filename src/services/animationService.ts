import axios from "axios";
import { IAnimation } from "../@types";
import { apiBaseUrl } from "./config";

const API_URL = `${apiBaseUrl}/api/animations`;

export const AnimationService = {
  // Récupère toutes les animations
  getAllAnimations: async (): Promise<IAnimation[]> => {
    const response = await axios.get(API_URL);
    return response.data.data;
  },

  // Récupère une animation par son ID
  getAnimationById: async (id: number): Promise<IAnimation> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  getAnimationsByType: async (type: string): Promise<IAnimation[]> => {
    const response = await axios.get(`${API_URL}/${type}`); // Pas besoin de params ici
    return response.data.data;
  },
  

  // Créer une animation
  createAnimation: async (animation: { name: string; type: string; description: string }) => {
    try {
      const response = await axios.post(API_URL, animation);
  // POST vers l'API pour créer l'animation
      return response.data;  // Retourne la réponse de l'API qui contient l'animation avec l'ID
    } catch (error) {
      console.error('Erreur lors de la création de l\'animation :', error);
      throw error; // Relance l'erreur pour qu'elle soit captée dans le Dashboard
    }
  },
  
  
  

  // Met à jour une animation existante
  updateAnimation: async (id: number, animationData: Partial<IAnimation>): Promise<IAnimation> => {
    const response = await axios.put(`${API_URL}/${id}`, animationData);
    return response.data.data;
  },

  // Supprime une animation
  deleteAnimation: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  // Recherche des animations par nom
  searchAnimations: async (name: string): Promise<IAnimation[]> => {
    const response = await axios.get(`${API_URL}/search`, { params: { name } });
    return response.data.data;
  },
};
