import { useEffect, useState } from 'react';
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';
import { motion } from 'framer-motion';

export const Labyrinthe = () => {
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
        <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-4 pt-20 sm:pt-40 flex flex-col items-center">
            {/* Image en haut à gauche, plus bas et pivotée dans l'autre sens */}
            <div className="absolute top-16 sm:top-32 left-8 p-4 z-10">
                <img
                    src="./src/assets/images/zoneinfectee.jpg"
                    alt="Zone Infectée"
                    className="rotate-[-30deg] w-[150px] sm:w-[70px] lg:w-[200px]"
                />
            </div>

            {/* Conteneur général*/}
            <div className="max-w-6xl w-full space-y-12 sm:space-y-16 mt-16 sm:mt-20 pt-8 sm:pt-12">
                {/* Section titre */}
                <motion.div
                    className="text-center space-y-6 sm:space-y-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="text-3xl sm:text-5xl mb-4 text-gradient font-metal bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {labyrintheAnimation[0].name}
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl italic text-gray-300 mb-12 sm:mb-20"
                        style={{ marginTop: '60px', lineHeight: '1.8' }}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {labyrintheAnimation[0].description}
                    </motion.p>
                </motion.div>

                {/* Section images avec une belle mise en page */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    {/* Image principale */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="./src/assets/images/labyrinthe.png"
                            alt="Labyrinthe"
                            className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                        />
                    </motion.div>

                    {/* Images supplémentaires */}
                    {[2, 3].map((index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={`./src/assets/images/labyrinthe${index}.png`}
                                alt={`Image ${index}`}
                                className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
