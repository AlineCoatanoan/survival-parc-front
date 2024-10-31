import { useEffect, useState } from "react";
import { HotelService } from "../services/hotelService";
import { IHotel } from "../@types";
import { motion } from "framer-motion";

export const Refuge = () => {
  const [refugeHotel, setRefugeHotel] = useState<IHotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRefugeHotel = async () => {
      try {
        const hotel = await HotelService.getHotelById(2); // Remplacez "1" par l'ID réel de l'hôtel "Refuge"
        setRefugeHotel(hotel);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'hôtel refuge :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefugeHotel();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  if (!refugeHotel) {
    return <div className="text-white text-center">Aucune donnée trouvée pour l'hôtel refuge des survivants.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      <motion.h1
        className="text-5xl font-bold mb-4 text-center mt-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {refugeHotel.name}
      </motion.h1>

      <motion.p
        className="text-lg mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {refugeHotel.description}
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
              src={`./src/assets/images/refuge${index}.png`} // Utilisation de l'index pour varier les images
              alt={`refuge${index}`}
              className="h-auto rounded-lg shadow-lg"
              style={{ width: "300px" }}
            />
          </motion.div>
        ))}
      </div>
      </div>
  );
};
