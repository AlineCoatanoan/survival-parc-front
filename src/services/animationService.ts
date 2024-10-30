import axios from "axios";
import { IAnimation } from "../@types";

const API_URL = "http://localhost:3000/api/animations"; // Remplacez par l'URL de l'API

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
  

  // Crée une nouvelle animation
  createAnimation: async (animationData: Partial<IAnimation>): Promise<IAnimation> => {
    const response = await axios.post(API_URL, animationData);
    return response.data.data;
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
