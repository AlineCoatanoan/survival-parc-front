import React, { useState } from "react";
import { motion } from "framer-motion";
import parkMap from "../assets/images/parkMap.webp";
import { IPlan } from "../@types";

// Importation des images
import trainZombieImg from "../assets/images/trainzombie.webp";
import grand8Img from "../assets/images/grand8.png";
import cinemaImg from "../assets/images/cinema.png";
import escapeImg from "../assets/images/escape.webp";
import labyrintheImg from "../assets/images/labyrinthe.png";
import grandeRoueImg from "../assets/images/roue.png";
import boutiqueImg from "../assets/images/boutique.png";
import restaurationImg from "../assets/images/restauration.png";
import tourImg from "../assets/images/tour.webp";
import secoursImg from "../assets/images/secours.png";

// Coordonnées et informations des zones du parc
const zones: IPlan[] = [
  {
    id: 1,
    name: "Train Fantôme",
    description: "Un voyage terrifiant à travers des paysages hantés.",
    position: { top: "82%", left: "6%" },
    img: trainZombieImg,
  },
  {
    id: 2,
    name: "Grande Roue",
    description: "Admirez le parc d'en haut depuis notre grande roue.",
    position: { top: "54%", left: "45%" },
    img: grandeRoueImg,
  },
  {
    id: 3,
    name: "Grand Huit",
    description: "Un grand huit pour les amateurs de sensations fortes.",
    position: { top: "52%", left: "65%" },
    img: grand8Img,
  },
  {
    id: 4,
    name: "Cinéma",
    description: "Venez voir les derniers films dans notre cinéma.",
    position: { top: "44%", left: "35%" },
    img: cinemaImg,
  },
  {
    id: 5,
    name: "Escape Game",
    description: "Résolvez des énigmes pour vous échapper.",
    position: { top: "35%", left: "48%" },
    img: escapeImg,
  },
  {
    id: 6,
    name: "Labyrinthe",
    description: "Trouvez votre chemin à travers notre labyrinthe.",
    position: { top: "70%", left: "45%" },
    img: labyrintheImg,
  },
  {
    id: 7,
    name: "Poste de Secours",
    description: "Assistance médicale en cas d'urgence.",
    position: { top: "70%", left: "75%" },
    img: secoursImg,
  },
  {
    id: 8,
    name: "La tour infernale",
    description: "Sensation forte garantie.",
    position: { top: "55%", left: "25%" },
    img: tourImg,
  },
  {
    id: 9,
    name: "Boutiques",
    description: "Boutiques de souvenirs et de produits locaux.",
    position: { top: "83%", left: "48%" },
    img: boutiqueImg,
  },
  {
    id: 10,
    name: "Restauration",
    description: "Tout ce qu'il vous faut pour vous restaurer.",
    position: { top: "65%", left: "20%" },
    img: restaurationImg,
  },
];

export const Plan = () => {
  const [selectedZone, setSelectedZone] = useState<IPlan | null>(null);

  const handleZoneClick = (zoneInfo: IPlan) => {
    setSelectedZone(zoneInfo);
  };

  // Fonction pour fermer la modale si un clic est détecté à l'extérieur
  const handleOutsideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      setSelectedZone(null);
    }
  };

  return (
    <div className="park-map-container min-h-screen bg-black text-black flex flex-col items-center p-4 sm:p-8 relative">
      {/* Carte du parc */}
      <motion.div
        className="park-map relative w-full max-w-4xl sm:w-2/3"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={parkMap} alt="Carte du parc" className="map-image w-full h-auto mt-16 sm:mt-32" />

        {/* Zones cliquables */}
        {zones.map((zone) => (
          zone.position && (
            <motion.div
              key={zone.id}
              className="zone clickable-zone cursor-pointer"
              onClick={() => handleZoneClick(zone)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.5, backgroundColor: "rgba(255, 0, 0, 0.9)", boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.7)" }} // Effet de survol
              style={{
                position: "absolute",
                top: zone.position.top,
                left: zone.position.left,
                width: "16px",
                height: "16px",
                backgroundColor: "rgba(255, 0, 0, 0.6)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                transition: "background-color 0.2s ease, box-shadow 0.2s ease", // Transition douce pour les effets
              }}
            />
          )
        ))}
      </motion.div>

      {/* Modale pour afficher les détails de la zone sélectionnée */}
      {selectedZone && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div className="info-modal bg-[#09602E] text-white rounded-lg p-6 shadow-lg w-11/12 sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{selectedZone.name}</h2>
            <p className="mb-4">{selectedZone.description}</p>
            <img src={selectedZone.img} alt={selectedZone.name} className="w-full h-auto max-w-xs mb-4" />
            <button
              onClick={() => setSelectedZone(null)}
              className="bg-[#FF7828] text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

