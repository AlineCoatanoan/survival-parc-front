import { useEffect, useState } from "react";
import { AnimationService } from "../services/animationService";
import { IAnimation } from "../@types";
import { motion } from "framer-motion";

export const Escape = () => {
  const [escapeGameAnimation, setEscapes] = useState<IAnimation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEscapeAnimation = async () => {
      try {
        const animations = await AnimationService.getAnimationsByType("escapeGame");
        setEscapes(animations);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'animation escape game :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscapeAnimation();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  if (escapeGameAnimation.length === 0) {
    return <div className="text-white text-center">Aucune donnée trouvée pour l'animation escape game.</div>;
  }

  const animation = escapeGameAnimation[0]; // Prenons la première animation récupérée

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-8 flex flex-col items-center">
    {/* Image en haut à gauche */}
    <div className="absolute top-36 sm:top-32 left-8 sm:left-32 p-4 z-10">
      <img
        src="./src/assets/images/zonequarantaine.jpg"
        alt="Zone Infectée"
        className="transform rotate-[-30deg] 
          w-[110px]      // Taille mobile réduite
          sm:w-[250px]   // Taille desktop
        "
      />
    </div>
  
    {/* Conteneur principal */}
    <div
      className="max-w-6xl w-full space-y-16 
        mt-10 sm:mt-20 // Décale le contenu vers le haut en mobile
        pt-8 sm:pt-12  // Ajuste le padding en haut
      "
    >
      {/* Titre */}
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
          {animation.name}
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl mb-12 text-center max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Durée : 1h
          <br />
          <br />
          {animation.description}
        </motion.p>
      </motion.div>
  
      {/* Images */}
      <div className="flex flex-col sm:flex-row justify-center space-y-8 sm:space-x-8 sm:space-y-0">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="./src/assets/images/escape.webp"
            alt="Escape Game"
            className="w-full max-w-[100%] sm:max-w-[800px] h-auto object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="./src/assets/images/escape2.jpg"
            alt="Escape Game 2"
            className="w-full max-w-[100%] sm:max-w-[800px] h-auto object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          />
        </motion.div>
      </div>
    </div>
  </div>
  
  );
};
