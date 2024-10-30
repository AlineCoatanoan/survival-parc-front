import { useEffect, useState } from 'react';
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';
import { motion } from 'framer-motion';

export const Labyrinthe = () => {
    const [labyrinthes, setLabyrinthes] = useState<IAnimation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLabyrinthes = async () => {
            try {
                const animations = await AnimationService.getAnimationsByType('labyrinthe');
                setLabyrinthes(animations);
            } catch (error) {
                console.error('Erreur lors de la récupération des labyrinthes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLabyrinthes();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (labyrinthes.length === 0) {
        return <div>Aucune donnée trouvée pour le labyrinthe.</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
            {/* Titre de la section */}
            <motion.h1
                className="text-5xl font-bold mb-4 text-center mt-20" // Centre le titre
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Le Passage Secret
            </motion.h1>

            {/* Phrase d'accroche */}
            <motion.p
                className="text-lg mb-6 text-center" // Centre la phrase d'accroche
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Un labyrinthe sombre où les visiteurs doivent utiliser des indices pour trouver leur chemin tout en évitant des obstacles et des créatures dangereuses.
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
                        src="./src/assets/images/labyrinthe.png"
                        alt="Labyrinthe"
                        className="h-auto rounded-lg shadow-lg"
                        style={{ width: '300px' }} // Taille fixe pour cohérence
                    />
                </motion.div>

                {/* Images supplémentaires sous le texte */}
                {[2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className="relative mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={`./src/assets/images/labyrinthe${index}.png`} // Chemin pour les images supplémentaires
                            alt={`Image ${index}`}
                            className="h-auto rounded-lg shadow-lg"
                            style={{ width: '300px' }} // Taille fixe pour cohérence
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
