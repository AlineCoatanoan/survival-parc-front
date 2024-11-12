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
        const hotel = await HotelService.getHotelById(2); // Remplacez "2" par l'ID réel de l'hôtel "Refuge"
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

  // Découper la description en deux parties égales
  const description = refugeHotel.description;
  const midPoint = Math.floor(description.length / 2);
  let splitIndex = midPoint;

  // Trouver un point de séparation plus naturel (par exemple, à la fin d'un mot)
  while (splitIndex < description.length && description[splitIndex] !== ' ' && splitIndex > 0) {
    splitIndex--;
  }

  const firstPart = description.substring(0, splitIndex).trim();
  const secondPart = description.substring(splitIndex).trim();

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] via-10% to-[#1F2937] text-white min-h-screen p-8 pt-40 flex flex-col items-center">
      {/* Image en haut à gauche, plus bas et pivotée dans l'autre sens */}
      <div className="absolute top-32 left-20 p-4 z-10">
        <img
          src="./src/assets/images/zoneinfectee.jpg"
          alt="Zone Infectée"
          style={{ width: '350px', height: 'auto' }}
          className="transform rotate-[-30deg]"
        />
      </div>

      {/* Conteneur général */}
      <div className="max-w-6xl w-full space-y-16 mt-20 pt-50">
        {/* Section titre */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl font-extrabold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {refugeHotel.name} {/* Dynamique en fonction du nom de l'hôtel */}
          </motion.h1>
        </motion.div>

        {/* Section description avec un padding-top augmenté */}
        <div className="flex flex-wrap justify-between gap-8 pt-20">
          <motion.p
            className="text-lg mb-12 flex-1 leading-relaxed text-justify"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {firstPart} {/* Première partie de la description */}
          </motion.p>

          <motion.p
            className="text-lg mb-12 flex-1 leading-relaxed text-justify"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {secondPart} {/* Deuxième partie de la description */}
          </motion.p>
        </div>

        {/* Section images avec mise en page améliorée */}
        <div className="flex flex-wrap justify-center space-x-8 space-y-8">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="relative transform transition-all duration-500 hover:scale-105 hover:rotate-3 hover:translate-x-2 hover:translate-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 * index }}
            >
              <img
                src={`./src/assets/images/refuge${index}.png`} // Utilisation de l'index pour varier les images
                alt={`Refuge Image ${index}`}
                className="w-full max-w-[800px] h-auto object-cover rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

