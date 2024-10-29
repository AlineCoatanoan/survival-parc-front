import axios from 'axios';
import { apiBaseUrl } from './config'; // Assurez-vous que le chemin est correct

const API_URL = `${apiBaseUrl}/api/animation`; // Utilisation de l'URL de base

export const animationService = {
  // Récupérer toutes les animations
  getAllAnimations: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Renvoie les données de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération des animations:', error);
      throw error; // Lance une erreur pour la gérer dans le composant
    }
  },

  // Récupérer une animation par ID
  getAnimationById: async (id: number) => { // ou 'id: string' si c'est un string
    try {
      const response = await axios.get<Animation>(`${API_URL}/${id}`);
      return response.data; // Renvoie l'animation trouvée
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'animation:', error);
      throw error; // Gérer l'erreur dans le composant
    }
  },


    // Créer une nouvelle animation
  createAnimation: async (animationData: Omit<Animation, 'id'>) => { // Utilisation de Omit pour exclure 'id'
    try {
      const response = await axios.post<Animation>(API_URL, animationData);
      return response.data; // Renvoie l'animation créée
    } catch (error) {
      console.error('Erreur lors de la création de l\'animation:', error);
      throw error; // Gérer l'erreur dans le composant
    }
  },


  // Mettre à jour une animation existante
  updateAnimation: async (id: number, animationData: Animation) => { // Ajout des types
    try {
      const response = await axios.put<Animation>(`${API_URL}/${id}`, animationData);
      return response.data; // Renvoie l'animation mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'animation:', error);
      throw error; // Gérer l'erreur dans le composant
    }
  },


    // Supprimer une animation par ID
  deleteAnimation: async (id: number) => { // Ajout du type pour 'id'
    try {
      await axios.delete(`${API_URL}/${id}`);
      return; // Pas de données à renvoyer pour une suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'animation:', error);
      throw error; // Gérer l'erreur dans le composant
    }
  },


    // Rechercher une animation par nom
  searchAnimation: async (name: string) => { // Ajout du type pour 'name'
    try {
      const response = await axios.get<Animation[]>(`${API_URL}/search`, { params: { name } });
      return response.data; // Renvoie les animations trouvées
    } catch (error) {
      console.error('Erreur lors de la recherche d\'animation:', error);
      throw error; // Gérer l'erreur dans le composant
    }
  },
}