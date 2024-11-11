import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';
import axios from 'axios';

interface CalendrierPassProps {
  selectedDate: [Date | null, Date | null] | null;
  handleDateChange: (date: [Date | null, Date | null] | null) => void;
  isReservationPage?: boolean;
  pricePerNight?: number;
  hotelName?: string;
}

export const CalendarPass: React.FC<CalendrierPassProps> = ({
    selectedDate,
    handleDateChange,
    isReservationPage = false,
    pricePerNight = 80,
    hotelName = "Nom de l'hôtel",
  }) => {
    const { isAuthenticated } = useAuth();
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
  
    const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNumberOfPeople(Number(e.target.value));
    };
  
    const calculateTotalPrice = (startDate: Date, endDate: Date) => {
      if (!startDate || !endDate) return 0;
      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      return nights * pricePerNight;
    };
  
    const handleReservation = async () => {
      // Vérifier si l'utilisateur est authentifié
      if (!isAuthenticated) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        return;
      }
  
      // Vérifier si une plage de dates a été sélectionnée
      if (!selectedDate || !selectedDate[0] || !selectedDate[1]) {
        console.log('Veuillez sélectionner une date valide.');
        return;
      }
  
      // Calculer le prix total de la réservation
      const startDate = selectedDate[0];
      const endDate = selectedDate[1];
      const totalPrice = calculateTotalPrice(startDate, endDate) * numberOfPeople;
  
      const reservationData = {
        startDate: formatDate(startDate),  // Format date as "YYYY-MM-DD"
        endDate: formatDate(endDate),      // Format date as "YYYY-MM-DD"
        nights: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)),  // Calculate the number of nights
        person: numberOfPeople,            // Renamed to 'person' instead of 'numberOfPeople'
        price: totalPrice,                 // Total price
        userId: 2,                         // Assume user ID is 2, replace with actual user ID if available
        hotelId: 1,                        // Assume hotel ID is 1, replace with actual hotel ID
        hotelName: hotelName,              // Utilisation de `hotelName` passé en props
      };
  
      // Vérification finale avant envoi
      if (!reservationData.startDate || !reservationData.endDate || !reservationData.person || reservationData.price <= 0) {
        console.log('Données de réservation incomplètes.', reservationData);
        return;
      }
  
      // Envoi des données à l'API (POST request)
      try {
        const response = await axios.post(
          'http://localhost:3000/api/reservation',  // Assurez-vous que cette URL est correcte pour votre API
          reservationData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("Réservation réussie :", response.data);
  
        // Afficher la confirmation après réservation réussie
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3000);
  
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Erreur lors de la réservation :", error.response || error.message);
        } else {
          console.error("Erreur inconnue :", error);
        }
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
          <p className="text-xl font-bold">{hotelName}</p>  {/* Affichage du nom de l'hôtel */}
          <DatePicker
            selected={selectedDate ? selectedDate[0] ?? undefined : undefined}
            onChange={handleDateChange}
            inline
            selectsRange
            startDate={selectedDate ? selectedDate[0] ?? undefined : undefined}
            endDate={selectedDate ? selectedDate[1] ?? undefined : undefined}
            className={`border-0 p-4 w-full ${isReservationPage ? 'text-white' : 'text-black'}`}
            calendarClassName="bg-gray-200"
          />
        </div>
  
        {isReservationPage && selectedDate && (
          <div className="mt-4 w-full">
            <label className={`block text-lg font-medium mb-2 ${isReservationPage ? 'text-yellow-400' : 'text-black'}`} >
              Nombre de personnes
            </label>
            <input
              type="number"
              min="1"
              value={numberOfPeople}
              onChange={handlePeopleChange}
              className={`w-full p-2 border rounded-md ${isReservationPage ? 'text-black bg-yellow-100' : 'text-black'}`}
            />
  
            {selectedDate && selectedDate[0] && selectedDate[1] && (
              <div className="mt-4 text-lg text-gray-700">
                <p className={`font-medium ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
                  Prix total : {calculateTotalPrice(selectedDate[0]!, selectedDate[1]!) * numberOfPeople} €
                </p>
              </div>
            )}
  
                <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={handleReservation}  // Retirer l'argument ici
                >
                Confirmer la réservation
                </button>


          </div>
        )}
      </motion.div>
    );
  };
  

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
