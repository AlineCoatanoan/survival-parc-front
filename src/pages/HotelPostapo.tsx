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
        const hotels = await HotelService.getHotelById(1); // ID réel de l'hôtel
        setPostapoHotels([hotels]);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'hôtel :", error);
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
    return <div className="text-white text-center">Aucune donnée trouvée pour l'hôtel post-apocalyptique.</div>;
  }

  // Découper la description en deux parties égales
  const description = postapoHotel[0].description;
  const midPoint = Math.floor(description.length / 2);
  let splitIndex = midPoint;

  while (splitIndex < description.length && description[splitIndex] !== " " && splitIndex > 0) {
    splitIndex--;
  }

  const firstPart = description.substring(0, splitIndex).trim();
  const secondPart = description.substring(splitIndex).trim();

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-6 sm:p-8 flex flex-col items-center">
      {/* Image flottante en haut avec ajustements pour les petits écrans */}
      <div className="absolute top-36 sm:top-20 left-4 sm:left-12 p-4 z-10">
        <img
          src="./src/assets/images/zonequarantaine.jpg"
          alt="Zone Infectée"
          className="transform rotate-[-30deg] w-[80px] sm:w-[180px] lg:w-[250px]"
        />
      </div>

      {/* Contenu principal ajusté pour mobile */}
      <div className="max-w-6xl w-full mt-16 sm:mt-32 space-y-16">
        {/* Titre */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f5] to-[#d8c8a0]">
            {postapoHotel[0].name}
          </h1>
        </motion.div>

        {/* Description avec ajustement pour mobile */}
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.p
            className="text-sm sm:text-lg flex-1 leading-relaxed text-justify"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {firstPart}
          </motion.p>
          <motion.p
            className="text-sm sm:text-lg flex-1 leading-relaxed text-justify"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {secondPart}
          </motion.p>
        </div>

        {/* Galerie d'images avec marges et tailles ajustées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 justify-center items-center">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="relative transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <img
                src={`./src/assets/images/postapo${index}.png`}
                alt={`Postapo Image ${index}`}
                className="w-full h-auto object-cover rounded-lg shadow-lg lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[450px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
