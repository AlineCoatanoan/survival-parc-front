import axios from 'axios';
import { IProfile } from '../@types';

const API_URL = 'http://localhost:3000/api/profile';

// Récupérer tous les profils
export const getAllProfiles = async (): Promise<IProfile[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Récupérer un profil par ID
export const getProfileById = async (id: string): Promise<IProfile> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Créer un nouveau profil
export const createProfile = async (profileData: IProfile): Promise<IProfile> => {
  const response = await axios.post(API_URL, profileData);
  return response.data;
};

// Mettre à jour un profil
export const updateProfile = async (id: string, profileData: IProfile): Promise<IProfile> => {
  const response = await axios.put(`${API_URL}/${id}`, profileData);
  return response.data;
};

// Supprimer un profil
export const deleteProfile = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
