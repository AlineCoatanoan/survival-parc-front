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

  return (
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      {/* Titre de la section */}
      <motion.h1
        className="text-5xl font-bold mb-4 text-center mt-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {escapeGameAnimation[0].name}
      </motion.h1>

      {/* Texte d'accroche */}
      <motion.p
        className="text-lg mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Durée : 60 minutes

Contexte
Dans un monde ravagé par une pandémie zombie, un groupe de scientifiques de haut niveau est isolé dans un laboratoire secret. Leur mission : développer un vaccin contre un virus mortel qui transforme les humains en zombies voraces. Alors que le temps presse, des rumeurs inquiétantes d'une invasion imminente de zombies commencent à circuler. Les joueurs doivent s'infiltrer dans le laboratoire, relever le défi de résoudre des énigmes complexes et découvrir la formule du vaccin avant que l'alarme ne sonne et que les créatures ne les attaquent.
        </motion.p>

      {/* Texte de description */}
      <motion.p
        className="text-lg mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {escapeGameAnimation[0].description}
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
            src="./src/assets/images/escape.webp"
            alt="Cinéma"
            className="h-auto rounded-lg shadow-lg"
            style={{ width: "300px" }}
          />
        </motion.div>
      </div>
    </div>
  );
};


