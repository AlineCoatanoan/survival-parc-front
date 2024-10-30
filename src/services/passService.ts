import axios from "axios";
import { IPass } from "../@types";

const API_URL = "http://localhost:3000/api/passes"; // Remplacez par l'URL de l'API

export const PassService = {
  // Récupère tous les passes
  getAllPasses: async (): Promise<IPass[]> => {
    const response = await axios.get(API_URL);
    return response.data.data;
  },

  // Récupère un pass par son ID
  getPassById: async (id: number): Promise<IPass> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  // Crée un nouveau pass
  createPass: async (passData: Partial<IPass>): Promise<IPass> => {
    const response = await axios.post(API_URL, passData);
    return response.data.data;
  },

  // Met à jour un pass existant
  updatePass: async (id: number, passData: Partial<IPass>): Promise<IPass> => {
    const response = await axios.put(`${API_URL}/${id}`, passData);
    return response.data.data;
  },

  // Supprime un pass
  deletePass: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
