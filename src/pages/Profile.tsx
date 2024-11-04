

import { useEffect, useState } from 'react';
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';

export const Profile = () => {
    const [labyrintheAnimation, setLabyrinthes] = useState<IAnimation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLabyrintheAnimation = async () => {
            try {
                const animations = await AnimationService.getAnimationsByType('labyrinthe');
                setLabyrinthes(animations);
            } catch (error) {
                console.error('Erreur lors de la récupération des labyrinthes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLabyrintheAnimation();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (labyrintheAnimation.length === 0) {
        return <div>Aucune donnée trouvée pour le labyrinthe.</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
           
        <h1>Profil de l'utilisateur</h1>
        </div>
        
    );
};
