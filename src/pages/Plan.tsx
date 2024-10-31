import React, { useState } from "react";
import { motion } from "framer-motion";
import parkMap from "../assets/images/parkMap.svg";
import { IPlan } from "../@types"; // Assurez-vous que le type IPlan est bien défini dans @types

// Exemple de données pour les zones du parc
const zones: IPlan[] = [
  {
    id: 1,
    name: "Hotel Refuge",
    description: "Hôtel sécurisé avec vue sur le parc.",
    position: { top: "20%", left: "30%" },
    img: "hotel.jpg",
  },
  {
    id: 2,
    name: "Zone de Quarantaine",
    description: "Parcours immersif avec des infectés et soldats.",
    position: { top: "50%", left: "50%" },
    img: "quarantine.jpg",
  },
  // Ajoutez d'autres zones ici
];

export const Plan = () => {
  const [selectedZone, setSelectedZone] = useState<IPlan | null>(null);

  const handleZoneClick = (zoneInfo: IPlan) => {
    setSelectedZone(zoneInfo);
  };

  return (
    <div className="park-map-container min-h-screen bg-white text-black flex flex-col items-center p-8 relative">
      {/* Carte du parc */}
      <motion.div
        className="park-map relative"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <img src={parkMap} alt="Carte du parc" className="map-image" />

        {/* Zones cliquables */}
        {zones.map((zone) => (
          zone.position && ( // Vérifie que position est défini avant d'afficher le div
            <div
              key={zone.id}
              className="zone clickable-zone cursor-pointer"
              onClick={() => handleZoneClick(zone)}
              style={{
                position: "absolute",
                top: zone.position.top,
                left: zone.position.left,
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(255, 0, 0, 0.2)", // Pour tester l'emplacement, mettre "transparent" ensuite
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )
        ))}
      </motion.div>

      {/* Modale pour afficher les détails de la zone sélectionnée */}
      {selectedZone && (
        <div className="info-modal bg-gray-800 text-white rounded-lg p-6 shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-2xl font-bold mb-4">{selectedZone.name}</h2>
          <p className="mb-4">{selectedZone.description}</p>
          <button
            onClick={() => setSelectedZone(null)}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};
