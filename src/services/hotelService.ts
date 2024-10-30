import axios from "axios";
import { IHotel } from "../@types";

const API_URL = "http://localhost:3000/api/hotels"; // Remplacez par l'URL de l'API

export const HotelService = {
  // Récupère tous les hôtels
  getAllHotels: async (): Promise<IHotel[]> => {
    const response = await axios.get(API_URL);
    return response.data.data;
  },

  // Récupère un hôtel par son ID
  getHotelById: async (id: number): Promise<IHotel> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  // Crée un nouvel hôtel
  createHotel: async (hotelData: Partial<IHotel>): Promise<IHotel> => {
    const response = await axios.post(API_URL, hotelData);
    return response.data.data;
  },

  // Met à jour un hôtel existant
  updateHotel: async (id: number, hotelData: Partial<IHotel>): Promise<IHotel> => {
    const response = await axios.put(`${API_URL}/${id}`, hotelData);
    return response.data.data;
  },

  // Supprime un hôtel
  deleteHotel: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
