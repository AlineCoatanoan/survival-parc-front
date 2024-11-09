import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

interface CalendrierPickerProps {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  isReservationPage?: boolean; // Ajout pour identifier si c'est la page réservation
}

// Fonction pour récupérer les horaires d'ouverture en fonction du jour
export const getHorairesOuverture = (date: Date): string => {
  const jour = date.toLocaleDateString('fr-FR', { weekday: 'long' });
  switch (jour) {
    case 'samedi':
    case 'dimanche':
      return '10h00 - 20h00'; // Horaires pour le weekend
    default:
      return '10h00 - 18h00'; // Horaires pour les jours de semaine
  }
};

export const CalendrierPicker: React.FC<CalendrierPickerProps> = ({
  selectedDate,
  handleDateChange,
  isReservationPage = false, // Valeur par défaut à false pour la page horaire
}) => {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const pricePerPerson = 25;
  const totalPrice = numberOfPeople * pricePerPerson;

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  // Récupérer les horaires pour la date sélectionnée
  const horairesOuverture =
    selectedDate instanceof Date && !isNaN(selectedDate.getTime())
      ? getHorairesOuverture(selectedDate)
      : '';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`border rounded-lg overflow-hidden p-4 ${isReservationPage ? 'bg-gray-800' : 'bg-white'} flex items-start justify-between`}
    >
      {/* Calendrier à gauche */}
      <div className="w-[60%]">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange} // Utilisation de handleDateChange
          inline
          className={`border-0 p-4 w-full text-black ${isReservationPage ? 'text-white' : 'text-black'}`}
          calendarClassName="bg-gray-200"
          dayClassName={(date) =>
            date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-300' : ''
          }
        />
      </div>

      {/* Section des horaires à droite */}
      {isReservationPage && (
        <div className="w-[35%] bg-gray-800 text-white p-4 rounded-lg ml-6">
          <p className="text-lg font-semibold text-yellow-400 mb-2">
            Horaires d'ouverture : {horairesOuverture}
          </p>
        </div>
      )}

      {/* Affichage conditionnel pour le nombre de personnes et le prix */}
      {isReservationPage && selectedDate && (
        <div className="mt-4 w-full">
          <label className={`block text-lg font-medium mb-2 ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>Nombre de personnes</label>
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={handlePeopleChange}
            className={`w-full p-2 border rounded-md ${isReservationPage ? 'text-black bg-yellow-100' : 'text-black'}`}
          />
          <p className={`text-lg font-semibold mt-2 ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
            Prix total : {totalPrice} €
          </p>
        </div>
      )}
    </motion.div>
  );
};
