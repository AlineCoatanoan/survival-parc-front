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
        console.error("Erreur lors de la récupération des animations cinéma :", error);
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
    return <div className="text-white text-center">Aucune donnée trouvée pour les animations cinéma.</div>;
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
        Cinéma 4DX
      </motion.h1>

      {/* Phrase d'accroche */}
      <motion.p
        className="text-lg mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Une expérience cinématographique unique, avec des effets 4D qui vous plongent au cœur de l’action !
      </motion.p>

      {/* Texte de description */}
      <motion.p
        className="text-lg mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Vivez une immersion totale dans notre cinéma 4DX, où chaque scène est ressentie intensément grâce à des effets
        multisensoriels. Préparez-vous à une expérience captivante où le cinéma prend vie autour de vous.
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
            src="./src/assets/images/cinema.png"
            alt="Cinéma"
            className="h-auto rounded-lg shadow-lg"
            style={{ width: "300px" }}
          />
        </motion.div>

        {/* Images supplémentaires sous le texte */}
        {[2].map((index) => (
          <motion.div
            key={index}
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`./src/assets/images/cinema2.webp`}
              alt={`cinema2`}
              className="h-auto rounded-lg shadow-lg"
              style={{ width: "300px" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
