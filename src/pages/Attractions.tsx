import { useEffect, useState } from 'react';
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';
import { motion } from 'framer-motion';

export const Attraction = () => {
    const [attractionAnimation, setAttractions] = useState<IAnimation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAttractionAnimation = async () => {
            try {
                const animations = await AnimationService.getAnimationsByType('attraction');
                setAttractions(animations);
            } catch (error) {
                console.error('Erreur lors de la récupération des attractions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttractionAnimation();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (attractionAnimation.length === 0) {
        return <div>Aucune donnée trouvée pour les attractions.</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
            {/* Titre de la section et description dynamiques */}
            <motion.h1
                className="text-5xl font-bold mb-4 text-center mt-20"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {attractionAnimation[0].name}
            </motion.h1>

            <motion.p
                className="text-lg mb-6 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {attractionAnimation[0].description}
            </motion.p>

            {/* Texte de description */}
            <motion.p
                className="text-lg mb-12 text-center max-w-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
            </motion.p>

            {/* Conteneur des images alignées à gauche */}
            <div className="flex flex-col items-start w-full">
                {/* Image principale à gauche */}
                <motion.div
                    className="relative mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src="./src/assets/images/chaos.png"
                        alt="roue"
                        className="h-auto rounded-lg shadow-lg w-72" // Utilisation de className pour la largeur
                    />
                </motion.div>

                <motion.div
                    className="relative mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                            src={`./src/assets/images/trainzombie.webp`}
                            alt="train zombie"
                            className="h-auto rounded-lg shadow-lg w-72" // Affichage direct de l'image WebP
                    />
                </motion.div>

                {/* Images supplémentaires */}
                {[1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className="relative mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={`./src/assets/images/manege${index}.png`}
                            alt={`Image ${index}`}
                            className="h-auto rounded-lg shadow-lg w-72" // Utilisation de className pour la largeur
                        />
                        
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
