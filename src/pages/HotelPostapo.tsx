import { useEffect, useState } from "react";
import { HotelService } from "../services/hotelService";
import { IHotel } from "../@types";
import { motion } from "framer-motion";

export const Postapo = () => {
  const [postapoHotel, setPostapoHotels] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostapoHotel = async () => {
      try {
        const hotels = await HotelService.getHotelById(1);
        setPostapoHotels([hotels]);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'hotel post-apocalyptique :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostapoHotel();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  if (postapoHotel.length === 0) {
    return <div className="text-white text-center">Aucune donnée trouvée pour l'hotel postapo des survivants.</div>;
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
        {postapoHotel[0].name}
      </motion.h1>

      {/* Texte d'accroche */}
      <motion.p
        className="text-lg mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
      </motion.p>

      {/* Texte de description */}
      <motion.p
        className="text-lg mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {postapoHotel[0].description}
      </motion.p>

      {/* Images supplémentaires sous le texte */}
      <div className="flex flex-col items-start w-full">
        {[1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`./src/assets/images/postapo${index}.png`} // Utilisation de l'index pour varier les images
              alt={`postapo${index}`}
              className="h-auto rounded-lg shadow-lg"
              style={{ width: "300px" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
