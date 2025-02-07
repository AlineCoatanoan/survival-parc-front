import axios from 'axios';
import { IUser } from '../@types';
import { apiBaseUrl } from './config';

const API_URL = `${apiBaseUrl}/api/user`; // Remplacez par l'URL de votre API

// Récupérer tous les utilisateurs
export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Lancer l'erreur pour gestion ultérieure
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (id: string): Promise<IUser> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Créer un nouvel utilisateur
export const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (id: string, userData: IUser): Promise<IUser> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

// Rechercher des utilisateurs par nom
export const searchUser = async (name: string): Promise<IUser[]> => {
  try {
    const response = await axios.get(`${API_URL}?name=${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching users with name ${name}:`, error);
    throw error;
  }
};
