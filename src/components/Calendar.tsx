import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';  // Assurez-vous d'importer le contexte Auth
import { useCart } from '../features/auth/cartContext';  // Assurez-vous d'importer le contexte Cart
import { IReservation } from '../@types';

interface CalendrierPickerProps {
  selectedDate: Date | Date[] | null;
  handleDateChange: (date: Date | Date[] | null) => void;
  isReservationPage?: boolean;
  pricePerPerson?: number;
}

export const CalendrierPicker: React.FC<CalendrierPickerProps> = ({
  selectedDate,
  handleDateChange,
  isReservationPage = false,
  pricePerPerson = 25,
}) => {
  const { isAuthenticated } = useAuth();  // Remplacer isLoggedIn par isAuthenticated
  const { addItemToCart } = useCart();  // Ajoutez des éléments au panier

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const totalPrice = numberOfPeople * pricePerPerson;

  const [showConfirmation, setShowConfirmation] = useState(false);  // Ajoutez un état pour afficher la confirmation
  const [showWarning, setShowWarning] = useState(false); // État pour le message d'avertissement

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  const handleReservation = () => {
    if (!isAuthenticated) {  // Vérifie si l'utilisateur est authentifié
      setShowWarning(true); // Affiche l'alerte de non-authentification
      return;
    }

    // Vérifier si la date est valide avant d'ajouter la réservation
    if (!selectedDate || (selectedDate instanceof Date && isNaN(selectedDate.getTime()))) {
      console.log('Veuillez sélectionner une date valide.');
      return;
    }

    // Si l'utilisateur est connecté, créez une réservation et ajoutez-la au panier
    const startDate = selectedDate instanceof Date ? selectedDate : selectedDate[0];
    const endDate = selectedDate instanceof Date ? selectedDate : selectedDate[1];

    // Calcul du nombre de nuits
    const nights = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    const reservation: IReservation = {
      id: Date.now(), // Utilisez un ID temporaire pour l'instant
      date: new Date(),
      description: 'Réservation de parc', // Remplissez avec une description appropriée
      startDate,
      endDate,
      nights: Math.ceil(nights),
      person: numberOfPeople,
      price: totalPrice,
      userId: undefined, // Remplissez si vous avez l'ID de l'utilisateur
      hotelId: undefined, // Remplissez si vous avez l'ID de l'hôtel
      animationId: undefined, // Remplissez si vous avez l'ID de l'animation
    };

    addItemToCart(reservation); // Ajoutez la réservation au panier

    // Affichez la confirmation de réservation
    setShowConfirmation(true);

    // Cacher le message après 3 secondes
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`border rounded-lg overflow-hidden p-4 ${isReservationPage ? 'bg-gray-800' : 'bg-white'} flex items-start justify-between`}
    >
      {/* Alerte de non-authentification */}
      {showWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-warning text-white p-4 rounded-lg shadow-lg z-20">
          <p>Merci de vous connecter pour effectuer une réservation !</p>
        </div>
      )}

      {/* Alerte de confirmation */}
      {showConfirmation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-20">
          <p>Votre réservation a bien été ajoutée au panier !</p>
        </div>
      )}

      {/* Calendrier à gauche */}
      <div className="w-[60%]">
        <DatePicker
          selected={selectedDate instanceof Date ? selectedDate : undefined}
          onChange={handleDateChange}
          inline
          selectsRange={pricePerPerson === 40} // Permet la sélection de plage uniquement pour le ticket 2 jours
          startDate={Array.isArray(selectedDate) ? selectedDate[0] : undefined}
          endDate={Array.isArray(selectedDate) ? selectedDate[1] : undefined}
          className={`border-0 p-4 w-full ${isReservationPage ? 'text-white' : 'text-black'}`}
          calendarClassName="bg-gray-200"
          dayClassName={(date) =>
            date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-300' : ''
          }
        />
      </div>

      {/* Affichage conditionnel pour le nombre de personnes et le prix */}
      {isReservationPage && selectedDate && (
        <div className="mt-4 w-full">
          <label className={`block text-lg font-medium mb-2 ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
            Nombre de personnes
          </label>
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

          {/* Affichage de la plage de dates sélectionnées */}
          {Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1] && (
            <div className="mt-4 text-lg text-gray-700">
              <p className={`font-medium ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
                Plage de dates sélectionnée :
              </p>
              <p>{formatDate(selectedDate[0])} - {formatDate(selectedDate[1])}</p>
            </div>
          )}

          {/* Affichage de la date sélectionnée si ce n'est pas une plage */}
          {selectedDate instanceof Date && (
            <div className="mt-4 text-lg text-gray-700">
              <p className={`font-medium ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
                Date sélectionnée:
              </p>
              <p>{formatDate(selectedDate)}</p>
            </div>
          )}

          {/* Ajouter un bouton pour lancer la réservation */}
          <button
            onClick={handleReservation}
            className={`mt-4 px-6 py-2 rounded-md ${isReservationPage ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}
          >
            Réserver
          </button>
        </div>
      )}
    </motion.div>
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
