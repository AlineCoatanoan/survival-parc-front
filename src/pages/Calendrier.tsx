import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion'; // Assurez-vous d'installer framer-motion

export const Calendrier: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const getHorairesOuverture = (date: Date): string => {
    const jour = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    
    switch (jour) {
      case 'samedi':
      case 'dimanche':
        return '10h00 - 20h00'; // Horaires pour le weekend
      default:
        return '10h00 - 18h00'; // Horaires pour les jours de semaine
    }
  };

  const horaires = selectedDate ? getHorairesOuverture(selectedDate) : '';

  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 animate-bounce">Calendrier d'ouverture du parc</h1>
      <div className="flex w-full max-w-5xl shadow-lg bg-gray-900 rounded-lg overflow-hidden">
        {/* Tableau à gauche */}
        <div className="flex-none w-1/2 p-6 bg-gradient-to-br from-green-500 to-blue-500">
          <h2 className="text-2xl font-semibold mb-4">Sélectionnez une date</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="border rounded-lg overflow-hidden"
          >
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              className="border-0 p-4 w-full text-black"
              calendarClassName="bg-gray-200"
              dayClassName={(date) =>
                date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-300' : ''
              } // Retourne une chaîne vide au lieu de undefined
            />
          </motion.div>
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
              <h2 className="text-2xl">Horaires d'ouverture</h2>
              <p className="text-lg">{horaires}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
