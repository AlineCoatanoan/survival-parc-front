import { useEffect, useState } from 'react';
import { AnimationService } from '../services/animationService';
import { IAnimation } from '../@types';
import { motion } from 'framer-motion';

export const Attraction = () => {
    const [attractionAnimation, setAttractions] = useState<IAnimation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const imageMap: { [key: number]: string[] } = {
        1: ['./src/assets/images/grand8.png', './src/assets/images/chaos.png'],
        2: ['./src/assets/images/trainzombie.webp', './src/assets/images/trainz.png'],
        3: ['./src/assets/images/manege2.png', './src/assets/images/roue.png', './src/assets/images/tower.webp', './src/assets/images/manege1.png'],
    };

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
        <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-8 md:p-12 flex flex-col items-center space-y-16">
            <motion.h1
                className="text-5xl font-bold mb-12 text-center mt-16 md:mt-40"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Les Attractions
            </motion.h1>

            {attractionAnimation.map((animation, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row-reverse items-center gap-8 md:ml-24 w-full"
                >
                    <motion.div className="flex flex-col items-center md:w-1/2 space-y-8 mr-24 pr-16"> {/* Marges ajustées */}
                        {/* Titre de l'attraction */}
                        <motion.h2
                            className="text-3xl font-semibold text-center md:text-left" 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {animation.name}
                        </motion.h2>

                        {/* Description de l'attraction */}
                        <motion.p
                            className="text-lg text-center md:text-left" 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {animation.description}
                        </motion.p>
                    </motion.div>

                    {/* Images */}
                    <div
                        className={`grid gap-8 w-full pl-20 ${  
                            animation.id === 3
                                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'  // Grid à 2 colonnes
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
                        }`}
                    >
                        {imageMap[animation.id]?.map((imageSrc, idx) => (
                            <motion.div
                                key={idx}
                                className={`relative w-full ${idx === 3 ? 'order-2' : ''}`}  // La roue (idx === 3) reste après la tour
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                            >
                                <img
                                    src={imageSrc}
                                    alt={animation.name}
                                    className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[350px] xl:max-w-[300px] 2xl:max-w-[300px] mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
