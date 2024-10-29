// src/services/animationService.ts
import { apiBaseUrl } from './config';

export const getAllAnimations = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/api/animations`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Assure-toi que cela correspond à la structure de tes données
    } catch (error) {
        console.error('Error fetching animations:', error);
        throw error;
    }
};
