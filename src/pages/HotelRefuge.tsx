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
        const hotel = await HotelService.getHotelById(2); // ID réel à utiliser
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

  const description = refugeHotel.description;
  const midPoint = Math.floor(description.length / 2);
  let splitIndex = midPoint;
  while (splitIndex < description.length && description[splitIndex] !== " " && splitIndex > 0) {
    splitIndex--;
  }

  const firstPart = description.substring(0, splitIndex).trim();
  const secondPart = description.substring(splitIndex).trim();

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-6 sm:p-8 flex flex-col items-center">
      {/* Image flottante à gauche */}
      <div className="absolute top-36 sm:top-20 left-4 sm:left-20 p-4 z-10">
        <img
          src="./src/assets/images/zoneinfectee.jpg"
          alt="Zone Infectée"
          className="transform rotate-[-30deg] 
            w-[100px]      // Taille mobile
            lg:w-[260px]   // Taille desktop
          "
        />
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl w-full mt-20 sm:mt-40">
        {/* Titre */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-500">
            {refugeHotel.name}
          </h1>
        </motion.div>

        {/* Description */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          <motion.p
            className="text-sm sm:text-lg leading-relaxed flex-1 text-justify"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {firstPart}
          </motion.p>
          <motion.p
            className="text-sm sm:text-lg leading-relaxed flex-1 text-justify"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {secondPart}
          </motion.p>
        </div>

        {/* Galerie d'images */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="w-[100%] sm:w-[48%] lg:w-[40%] transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <img
                src={`./src/assets/images/refuge${index}.png`}
                alt={`Refuge ${index}`}
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  );
};
