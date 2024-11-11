import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';  
import { useCart } from '../features/auth/cartContext'; 
import axios from 'axios';

interface CalendrierPassProps {
  selectedDate: Date | Date[] | null;
  handleDateChange: (date: Date | Date[] | null) => void;
  isReservationPage?: boolean;
  pricePerNight?: number; // Prix par nuit
}

export const CalendarPass: React.FC<CalendrierPassProps> = ({
    selectedDate,
    handleDateChange,
    isReservationPage = false,
    pricePerNight = 80, // Prix par défaut à 80€ pour le premier formulaire
  }) => {
    const { user, isAuthenticated } = useAuth();
    const { addItemToCart } = useCart();
  
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
  
    const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNumberOfPeople(Number(e.target.value));
    };
  
    const calculateTotalPrice = (startDate: Date, endDate: Date) => {
      if (!startDate || !endDate) return 0;
      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      return nights * pricePerNight; // Utilisation du prix dynamique
    };
  
    const handleReservation = async () => {
      if (!isAuthenticated) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        return;
      }
  
      if (!selectedDate || (selectedDate instanceof Date && isNaN(selectedDate.getTime()))) {
        console.log('Veuillez sélectionner une date valide.');
        return;
      }
  
      const startDate = selectedDate instanceof Date ? selectedDate : selectedDate[0];
      const endDate = selectedDate instanceof Date ? selectedDate : selectedDate[1];
      const totalPrice = calculateTotalPrice(startDate, endDate);
  
      const reservationData = {
        startDate,
        endDate,
        nights: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)),
        person: numberOfPeople,
        price: totalPrice,
        userId: user ? user.id : null,
      };
  
      try {
        const response = await axios.post('http://localhost:3000/api/reservation', reservationData);
        console.log("Réservation enregistrée avec succès : ", response.data);
        addItemToCart(response.data.data);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3000);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de la réservation :", error);
      }
    };
  
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`border rounded-lg overflow-hidden p-4 ${isReservationPage ? 'bg-gray-800' : 'bg-white'} flex items-start justify-between`}
      >
        {showWarning && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-warning text-white p-4 rounded-lg shadow-lg z-20">
            <p>Merci de vous connecter pour effectuer une réservation !</p>
          </div>
        )}
  
        {showConfirmation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-20">
            <p>Votre réservation a bien été ajoutée au panier !</p>
          </div>
        )}
  
        <div className="w-[60%]">
          <DatePicker
            selected={selectedDate instanceof Date ? selectedDate : undefined}
            onChange={handleDateChange}
            inline
            selectsRange
            startDate={Array.isArray(selectedDate) ? selectedDate[0] : undefined}
            endDate={Array.isArray(selectedDate) ? selectedDate[1] : undefined}
            className={`border-0 p-4 w-full ${isReservationPage ? 'text-white' : 'text-black'}`}
            calendarClassName="bg-gray-200"
            dayClassName={(date) =>
              date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-300' : ''
            }
          />
        </div>
  
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
  
            {Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1] && (
              <div className="mt-4 text-lg text-gray-700">
                <p className={`font-medium ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
                  Prix total : {calculateTotalPrice(selectedDate[0], selectedDate[1]) * numberOfPeople} €
                </p>
              </div>
            )}
  
            {Array.isArray(selectedDate) && selectedDate[0] && selectedDate[1] && (
              <div className="mt-4 text-lg text-gray-700">
                <p className={`font-medium ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
                  Plage de dates sélectionnée :
                </p>
                <p>{formatDate(selectedDate[0])} - {formatDate(selectedDate[1])}</p>
              </div>
            )}
  
            {selectedDate instanceof Date && (
              <div className="mt-4 text-lg text-gray-700">
                <p className={`font-medium ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
                  Date sélectionnée:
                </p>
                <p>{formatDate(selectedDate)}</p>
              </div>
            )}
  
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
  
  
  

