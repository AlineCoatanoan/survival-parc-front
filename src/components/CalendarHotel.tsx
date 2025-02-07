import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';
import axios from 'axios';
import { apiBaseUrl } from '../services/config';

interface ReservationDetails {
  startDate: string;
  endDate: string;
  priceByNight: string;
  totalPrice: number;
  numberOfPeople: number;
}

interface CalendrierHotelProps {
  selectedDate: [Date | null, Date | null] | null;
  handleDateChange: (date: [Date | null, Date | null] | null) => void;
  isReservationPage?: boolean;
  pricePerNight?: number;
  hotelName?: string;
  hotelId?: number;
}

export const CalendarPass: React.FC<CalendrierHotelProps> = ({
  selectedDate,
  handleDateChange,
  isReservationPage = false,
  pricePerNight = 80,
  hotelName = "Nom de l'hôtel",
  hotelId = 1,
}) => {
  const { isAuthenticated, userId } = useAuth();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);
  const [hotelNameState, setHotelName] = useState<string>(hotelName);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state definition

  // Fetching Profile ID
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

  // Handle change for number of people
  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  // Calculate total price based on dates and number of people
  const calculateTotalPrice = (startDate: Date, endDate: Date, numberOfPeople: number) => {
    if (!startDate || !endDate) return 0;
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return nights * pricePerNight * numberOfPeople; // Calcul du prix total, y compris le nombre de personnes
  };

  // Handle the reservation submission
  const handleReservation = async () => {
    if (!isAuthenticated || !profileId) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    if (!selectedDate || !selectedDate[0] || !selectedDate[1]) {
      console.log('Veuillez sélectionner une plage de dates.');
      return;
    }

    const startDate = selectedDate[0];
    const endDate = selectedDate[1];

    // Calculate total price, including the number of people
    const totalPrice = calculateTotalPrice(startDate, endDate, numberOfPeople);

    // Create reservation data object
    const reservationData = {
      startDate: startDate.toISOString(),  // Assurez-vous que la date est au format ISO
      endDate: endDate.toISOString(),      // Assurez-vous que la date est au format ISO
      priceByNight: pricePerNight,         // Prix par nuit
      numberOfPeople: numberOfPeople,      // Nombre de personnes
      totalPrice: totalPrice,             // Calcul du prix total
      profileId,
      hotelId,
      status: 'pending',                  // Statut par défaut
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/profilehotel/${profileId}`,  // L'URL est correcte ici ?
        reservationData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        const confirmedReservation = response.data.data;

        setReservationDetails({
          startDate: confirmedReservation.startDate,
          endDate: confirmedReservation.endDate,
          priceByNight: confirmedReservation.priceByNight,
          totalPrice: confirmedReservation.totalPrice,
          numberOfPeople,
        });

        setHotelName(confirmedReservation.hotelName);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 5000);
      } else {
        console.error("Erreur lors de la confirmation.");
      }
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Une erreur est survenue lors de la réservation.");
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`border rounded-lg p-4 ${isReservationPage ? 'bg-gray-800' : 'bg-white'}`}
    >
      {showWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-3 rounded-md shadow-lg max-w-xs">
          <p>{error || "Veuillez vous connecter pour réserver !"}</p>
        </div>
      )}

      {showConfirmation && reservationDetails && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-3 rounded-md shadow-lg max-w-sm">
          <h3 className="font-bold text-lg mb-2">Réservation confirmée !</h3>
          <p><strong>Nom de l'hôtel :</strong> {hotelNameState}</p>
          <p><strong>Période :</strong> {reservationDetails.startDate} - {reservationDetails.endDate}</p>
          <p><strong>Prix à la nuit :</strong> {pricePerNight} €</p>
          <p><strong>Prix total :</strong> {reservationDetails.totalPrice} €</p>
          <p><strong>Nombre de personnes :</strong> {reservationDetails.numberOfPeople}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Réservation pour {hotelNameState}</h3>
      <p className="text-lg text-gray-700 mb-4"><strong>Prix par nuit :</strong> {pricePerNight} €</p>

      <DatePicker
        selected={selectedDate?.[0] || undefined}
        onChange={handleDateChange}
        startDate={selectedDate?.[0] || undefined}
        endDate={selectedDate?.[1] || undefined}
        selectsRange
        inline
        minDate={new Date()}
        className="w-full"
      />

      {isReservationPage && (
        <div className="mt-4">
          <label className="block text-lg mb-2">Nombre de personnes</label>
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={handlePeopleChange}
            className="w-full p-2 border rounded-md"
          />
          {selectedDate && selectedDate[0] && selectedDate[1] && (
            <div className="mt-4 flex justify-between">
              <span>Total :</span>
              <span>
                {calculateTotalPrice(selectedDate[0], selectedDate[1], numberOfPeople).toFixed(2)} €
              </span>
            </div>
          )}
          <button
            onClick={handleReservation}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Réserver maintenant
          </button>
        </div>
      )}
    </motion.div>
  );
};
