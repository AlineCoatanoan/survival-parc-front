import { useEffect, useState } from 'react'; // Pas besoin d'importer React ici
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';

export const Labyrinthe = () => {
    const [labyrinthe, setLabyrinthe] = useState<IAnimation | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // État de chargement

    useEffect(() => {
        const fetchLabyrinthe = async () => {
            try {
                const data = await AnimationService.getAnimationById(2); // Remplace 3 par l'ID de ton animation "Labyrinthe"
                setLabyrinthe(data);
            } catch (error) {
                console.error('Erreur lors de la récupération du labyrinthe:', error);
            } finally {
                setLoading(false); // Met à jour l'état de chargement
            }
        };

        fetchLabyrinthe();
    }, []);

    // Affiche un message de chargement
    if (loading) {
        return <div>Chargement...</div>;
    }

    // Si l'animation n'existe pas
    if (!labyrinthe) {
        return <div>Aucune donnée trouvée pour le labyrinthe.</div>;
    }

    return (
        <div className="p-4 bg-black text-white">
            <h1 className="text-3xl font-bold">{labyrinthe.name}</h1>
            <p>{labyrinthe.description}</p>
            {/* Ajoute l'image en dur si nécessaire */}
            <img src="./src/assets/images/labyrinthe.png" alt={labyrinthe.name} />
        </div>
    );
};


