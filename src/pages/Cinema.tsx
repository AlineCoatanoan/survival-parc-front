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
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      {/* Titre de la section */}
      <motion.h1
        className="text-5xl font-bold mb-4 text-center mt-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cinemaAnimation[0].name}
      </motion.h1>

      {/* Texte d'accroche */}
      <motion.p
        className="text-lg mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Découvrez une expérience cinématographique inégalée avec le cinéma 3D 4DX. Vos sièges dynamiques bougent en synchronisation avec l’action à l’écran, vous plongeant au cœur de chaque scène. Les écrans, non seulement en face de vous mais aussi sur les côtés, créent une immersion à 360 degrés.

        Des effets multisensoriels, tels que des gouttes d'eau, des parfums et des mouvements d'air, intensifient votre expérience, vous permettant de vivre chaque film comme une aventure mémorable. Préparez-vous à ressentir le cinéma d'une manière totalement nouvelle !
      </motion.p>

      {/* Texte de description */}
      <motion.p
        className="text-lg mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {cinemaAnimation[0].description}
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
