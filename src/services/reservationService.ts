import axios from 'axios';
import { IReservation } from '../@types';

const API_URL = 'http://localhost:3001/reservations'; // Remplacez par l'URL de votre API

// Récupérer toutes les réservations
export const getAllReservations = async (): Promise<IReservation[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error; // Lancer l'erreur pour gestion ultérieure
  }
};

// Récupérer une réservation par ID
export const getReservationById = async (id: string): Promise<IReservation> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservation with ID ${id}:`, error);
    throw error;
  }
};

// Créer une nouvelle réservation
export const createReservation = async (reservationData: IReservation): Promise<IReservation> => {
  try {
    const response = await axios.post(API_URL, reservationData);
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

// Mettre à jour une réservation
export const updateReservation = async (id: string, reservationData: IReservation): Promise<IReservation> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, reservationData);
    return response.data;
  } catch (error) {
    console.error(`Error updating reservation with ID ${id}:`, error);
    throw error;
  }
};

// Supprimer une réservation
export const deleteReservation = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting reservation with ID ${id}:`, error);
    throw error;
  }
};

// Rechercher des réservations par nom
export const searchReservation = async (name: string): Promise<IReservation[]> => {
  try {
    const response = await axios.get(`${API_URL}?name=${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching reservations with name ${name}:`, error);
    throw error;
  }
};
