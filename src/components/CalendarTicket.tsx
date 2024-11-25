import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';
import { useCart } from '../features/auth/cartContext';
import axios from 'axios';

// Définir les types pour les props
interface CalendrierPickerProps {
  selectedDate: Date | Date[] | null;
  handleDateChange: (date: Date | Date[] | null) => void;
  isReservationPage?: boolean;
  pricePerPerson?: number;
  hotelId: string | number;
  onReservationSuccess?: (reservation: IReservation) => void;
}

interface IReservation {
  id: number;
  startDate: string;
  endDate: string;
  price: number;
  person: number;
  hotelId: number | null; // Peut être null si sans hôtel
  hotelName?: string;
}

export const CalendrierPicker: React.FC<CalendrierPickerProps> = ({
  selectedDate,
  handleDateChange,
  isReservationPage = false,
  pricePerPerson = 25,
  hotelId,
  onReservationSuccess,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { addItemToCart } = useCart();

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [withHotel, setWithHotel] = useState(true); // Par défaut, avec hôtel
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const totalPrice = withHotel
    ? numberOfPeople * pricePerPerson // Prix avec hôtel
    : numberOfPeople * 15; // Exemple : tarif sans hôtel

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  const handleReservation = async () => {
    if (!isAuthenticated) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    if (!selectedDate || numberOfPeople <= 0) {
      console.log('Veuillez remplir tous les champs nécessaires.');
      return;
    }

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (Array.isArray(selectedDate)) {
      startDate = selectedDate[0];
      endDate = selectedDate[1];
    } else {
      startDate = selectedDate;
      endDate = null;
    }

    if (!startDate || (endDate && startDate.getTime() === endDate.getTime())) {
      console.log('Les dates doivent être distinctes.');
      return;
    }

    if (!endDate) {
      endDate = new Date(startDate.getTime());
      endDate.setDate(startDate.getDate() + 1); // Ajoute un jour
    }

    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    if (nights <= 0) {
      console.log('Le nombre de nuits doit être supérieur à 0.');
      return;
    }

    const userId = user ? user.id : null;
    if (!userId) {
      console.log('Utilisateur non connecté. Impossible de procéder à la réservation.');
      return;
    }

    const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;

    const formattedPrice = totalPrice.toFixed(2);

    const reservationData = {
      profileId: userId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      person: numberOfPeople,
      price: formattedPrice,
      hotelId: withHotel ? hotelId.toString() : null,
    };

    try {
      const response = await axios.post(`http://localhost:3000/api/reservation/${userId}`, reservationData);
      console.log('Réservation enregistrée avec succès :', response.data);

      addItemToCart(response.data.data);

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);

      setNumberOfPeople(1);
      handleDateChange(null);

      if (onReservationSuccess) {
        onReservationSuccess(response.data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la réservation', error.response ? error.response.data : error.message);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`border rounded-lg overflow-hidden p-4 ${isReservationPage ? 'bg-gray-800' : 'bg-white'} flex items-start justify-between`}
    >
      {showWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-warning text-white p-4 rounded-lg shadow-lg z-20">
          <p>Merci de vous connecter et de créer un profil pour effectuer une réservation !</p>
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
          selectsRange={pricePerPerson === 40}
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
          <div className="mb-4">
            <label className={`block text-lg font-medium mb-2 ${isReservationPage ? 'text-yellow-400' : 'text-black'}`}>
              Type de réservation
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={withHotel}
                  onChange={() => setWithHotel(true)}
                  className="mr-2"
                />
                Avec hôtel
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={!withHotel}
                  onChange={() => setWithHotel(false)}
                  className="mr-2"
                />
                Sans hôtel
              </label>
            </div>
          </div>

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

function formatDate(date: Date) {
  return date.toLocaleDateString('fr-FR');
}
