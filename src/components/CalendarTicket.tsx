import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';
import { useCart } from '../features/auth/cartContext';
import axios from 'axios';
import { apiBaseUrl } from '../services/config';

// Définir les types pour les props
// Correction du type pour selectedDate et handleDateChange
interface CalendrierPickerProps {
  selectedDate: Date | Date[] | null; // autoriser aussi null
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
  const { isAuthenticated, userId } = useAuth();
  const { addItemToCart } = useCart();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [withHotel, setWithHotel] = useState(true); // Par défaut, avec hôtel
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = withHotel
    ? numberOfPeople * pricePerPerson // Prix avec hôtel
    : numberOfPeople * 15; // Exemple : tarif sans hôtel

  // Récupération du profileId via l'userId
  const fetchProfileId = async (userId: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/profile/${userId}`);
      if (response.data.success) {
        setProfileId(response.data.data.id);
      } else {
        setError("Impossible de récupérer le profil utilisateur.");
      }
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Erreur de connexion au serveur.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileId(userId);
    }
  }, [userId]);

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

    if (!profileId) {
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
      profileId: profileId,  // Vous utilisez ici profileId
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      person: numberOfPeople,
      price: formattedPrice,
      hotelId: withHotel ? hotelId.toString() : null,
    };

    try {
      // Utilisez profileId dans l'URL
      const response = await axios.post(`${apiBaseUrl}/api/reservation/${profileId}`, reservationData);
      console.log('Réservation enregistrée avec succès :', response.data);

      addItemToCart(response.data.data);

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);

      setNumberOfPeople(1);
      handleDateChange(null); // Mettre à jour le state après la réservation

      if (onReservationSuccess) {
        onReservationSuccess(response.data.data);
      }
    } catch (error: unknown) {
      console.error('Erreur lors de la réservation', error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`border rounded-lg overflow-hidden p-4 ${isReservationPage ? 'bg-gray-800' : 'bg-white'} flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0`}
    >
      {showWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-warning text-white p-4 rounded-lg shadow-lg z-20 max-h-[80vh] overflow-y-auto">
          <p>Merci de vous connecter et de créer un profil pour effectuer une réservation !</p>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-20 max-h-[80vh] overflow-y-auto">
          <p>Votre réservation a bien été ajoutée au panier !</p>
        </div>
      )}

      {error && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg z-20 max-h-[80vh] overflow-y-auto">
          <p>{error}</p>
        </div>
      )}

      <div className="w-full sm:w-[60%] max-h-[60vh] sm:max-h-full overflow-y-auto">
        <DatePicker
          selected={Array.isArray(selectedDate) ? selectedDate[0] : selectedDate}
          onChange={(date: [Date | null, Date | null] | Date | null) => handleDateChange(date)} // Changer le type ici
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
        <div className="w-full sm:w-[35%] mt-4 sm:mt-0">
          <div className="mb-4">
            <label className={`block text-lg font-medium mb-2 ${isReservationPage ? 'text-[#FF7828]' : 'text-black'}`}>
              Type de réservation
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={withHotel}
                  onChange={() => setWithHotel(true)}
                />
                Avec hôtel
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={!withHotel}
                  onChange={() => setWithHotel(false)}
                />
                Sans hôtel
              </label>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Nombre de personnes</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={handlePeopleChange}
              min="1"
              max="10"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-lg">
              <span className="font-bold">Prix total:</span> {totalPrice}€
            </div>
            <button
              onClick={handleReservation}
              className="text-white bg-blue-500 py-2 px-6 rounded"
            >
              Réserver
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
