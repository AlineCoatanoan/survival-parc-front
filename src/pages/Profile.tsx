import { useEffect, useState } from 'react';
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';
import { motion } from 'framer-motion';

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
            {/* Titre de la section et description dynamiques */}
            <motion.h1
                className="text-5xl font-bold mb-4 text-center mt-20"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {labyrintheAnimation[0].name}
            </motion.h1>

            <motion.p
                className="text-lg mb-6 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {labyrintheAnimation[0].description}
            </motion.p>

            {/* Texte de description */}
            <motion.p
                className="text-lg mb-12 text-center max-w-2xl" // Centre le texte de description
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Entrez dans le Passage Secret, une expérience immersive où la nature a repris ses droits. Niché dans un centre commercial abandonné, ce labyrinthe luxuriant vous plonge dans un dédale de lianes et d'arbres envahissants. Les boutiques désertées sont désormais recouvertes de végétation, créant une atmosphère intrigante et inquiétante. Serez-vous capable de naviguer à travers ce royaume sauvage ? Affrontez des défis et des énigmes tout en évitant les infectés qui rôdent. Venez découvrir cette aventure palpitante au Survival Parc, où la survie est la seule option. Préparez-vous à une expérience inoubliable !
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
                        src="./src/assets/images/labyrinthe.png" // Image principale en dur
                        alt="Labyrinthe"
                        className="h-auto rounded-lg shadow-lg"
                        style={{ width: '300px' }}
                    />
                </motion.div>

                {/* Images supplémentaires en dur */}
                {[2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className="relative mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={`./src/assets/images/labyrinthe${index}.png`} // Chemins fixes pour les images supplémentaires
                            alt={`Image ${index}`}
                            className="h-auto rounded-lg shadow-lg"
                            style={{ width: '300px' }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
