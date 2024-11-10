import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendrierPicker } from '../components/Calendar'; 

export const Calendrier: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date[] | null>(null);

  const handleDateChange = (date: Date[] | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 text-white min-h-screen pt-[200px]">
      <h1 className="text-4xl font-bold mb-6 animate-bounce">Calendrier d'ouverture du parc</h1>
      <div className="flex w-full max-w-5xl shadow-lg bg-gray-900 rounded-lg overflow-hidden">
        {/* Tableau à gauche */}
        <div className="flex-none w-1/2 p-6 bg-gradient-to-br from-green-500 to-blue-500">
          <h2 className="text-2xl font-semibold mb-4">Sélectionnez une date</h2>
          <CalendrierPicker selectedDate={selectedDate} handleDateChange={handleDateChange} />
        </div>
        {/* Informations à droite */}
        <div className="flex-grow bg-gray-800 p-6">
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 border-l-2 pl-4 border-green-500"
            >
              {/* Vous pouvez ici retirer la section des horaires */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
