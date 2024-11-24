import { useEffect, useState } from "react";
import { AnimationService } from "../services/animationService";
import { IAnimation } from "../@types";
import { motion } from "framer-motion";

export const Cinema = () => {
  const [cinemaAnimation, setCinemaAnimations] = useState<IAnimation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCinemaAnimation = async () => {
      try {
        const animations = await AnimationService.getAnimationsByType("cinema");
        setCinemaAnimations(animations);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'animation cinéma :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaAnimation();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  if (cinemaAnimation.length === 0) {
    return <div className="text-white text-center">Aucune donnée trouvée pour l'animation cinéma.</div>;
  }

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-8 pt-20 flex flex-col items-center">
      {/* Image en haut à gauche */}
      <div className="absolute top-16 left-4 sm:top-32 sm:left-32 p-4 z-10">
        <img
          src="./src/assets/images/zonequarantaine.jpg"
          alt="Zone Infectée"
          className="transform rotate-[-30deg] 
            w-[100px]       // Mobile
            sm:w-[200px]    // Tablet
            lg:w-[300px]    // Desktop
          "
        />
      </div>

      {/* Conteneur principal */}
      <div className="max-w-6xl w-full space-y-16 mt-10 sm:mt-20">
        {/* Section titre */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cinemaAnimation[0].name}
          </motion.h1>

          {/* Texte descriptif */}
          <motion.p
            className="text-sm sm:text-lg mb-12 text-center max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {cinemaAnimation[0].description}
          </motion.p>
        </motion.div>

        {/* Images */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-8 sm:space-y-0">
          <motion.div
            className="relative w-full sm:w-1/2 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="./src/assets/images/cinema.png"
              alt="Cinéma"
              className="w-full h-auto object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            className="relative w-full sm:w-1/2 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="./src/assets/images/cinema2.webp"
              alt="Cinéma 2"
              className="w-full h-auto object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
