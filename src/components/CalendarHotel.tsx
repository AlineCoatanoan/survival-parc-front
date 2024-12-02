import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/authContext';
import axios from 'axios';

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
}

export const CalendarPass: React.FC<CalendrierHotelProps> = ({
  selectedDate,
  handleDateChange,
  isReservationPage = false,
  pricePerNight = 80,
  hotelName = "Nom de l'hôtel",
}) => {
  const { isAuthenticated, userId } = useAuth();  // Récupère userId via le contexte d'authentification
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);  // Pour afficher le message de warning
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);  // Spécification du type
  const [hotelNameState, setHotelName] = useState<string>(hotelName);  // Nouveau state pour le nom de l'hôtel
  const [profileId, setProfileId] = useState<number | null>(null);  // profileId devrait être un nombre ou null
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs

  // Fonction pour récupérer le profil de l'utilisateur et définir le profileId
  const fetchProfileId = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
      if (response.data.success) {
        console.log('Profile récupéré:', response.data.data);
        const profileId = response.data.data.id; // Assurez-vous que vous extrayez un nombre ici
        console.log('Profile ID:', profileId);  // Vérification de la valeur
        setProfileId(profileId);  // Mise à jour du state;
      } else {
        setError("Impossible de récupérer le profil de l'utilisateur.");
      }
    } catch {
      setError("Erreur lors de la récupération du profil.");
    }
  };

  // Récupérer le profil dès que userId est disponible
  useEffect(() => {
    if (userId) {
      fetchProfileId(userId);
    }
  }, [userId]);

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(e.target.value));
  };

  const calculateTotalPrice = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return 0;
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return nights * pricePerNight;
  };

  // Fonction pour formater la date au format 'YYYY-MM-DD'
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleReservation = async () => {
    // Si l'utilisateur n'est pas connecté ou que le profileId n'existe pas, afficher un message d'avertissement
    if (!isAuthenticated || !profileId) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000); // Effacer après 3 secondes
      return;
    }
  
    // Vérifier si la date est correctement sélectionnée
    if (!selectedDate || !selectedDate[0] || !selectedDate[1]) {
      console.log('Veuillez sélectionner une date valide.');
      return;
    }
  
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    const totalPrice = calculateTotalPrice(startDate, endDate) * numberOfPeople;
  
    const reservationData = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      nights: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)),
      person: numberOfPeople,
      price: totalPrice,
      userId: userId,  // Utiliser userId ou profileId
      profileId: profileId,
      hotelId: 2,  // Remplacer par l'ID réel de l'hôtel
      hotelName: hotelNameState,
      status: 'pending',  // Statut par défaut
    };
  
    console.log('Données envoyées à l\'API :', reservationData);
  
    try {
      const response = await axios.post(
        `http://localhost:3000/api/profilehotel/${profileId}`,  // Utilisez profileId ici
        reservationData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Réponse de l'API : ", response.data);
  
      if (response.data.success && response.data.data) {  // Vérification de la réponse
        const confirmedReservation = response.data.data;  // Accéder à la réservation confirmée dans data
        console.log("Réservation confirmée : ", confirmedReservation);
  
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 5000);
  
        setHotelName(confirmedReservation.hotel.name);
        setReservationDetails({
          startDate: confirmedReservation.startDate,
          endDate: confirmedReservation.endDate,
          priceByNight: confirmedReservation.hotel.priceByNight,  // Prix par nuit de l'hôtel
          totalPrice: parseFloat(confirmedReservation.hotel.priceByNight) * numberOfPeople,  // Calcul du total en fonction du nombre de personnes
          numberOfPeople: numberOfPeople,
        });
      } else {
        console.error("Aucune réservation confirmée trouvée dans la réponse.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'Une réservation existe déjà pour ce profil et cet hôtel dans cette période.') {
          setError('Une réservation existe déjà pour ces dates.');
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 3000); // Masquer après 3 secondes
        } else {
          console.error('Erreur lors de la réservation :', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('Erreur inconnue :', error);
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
          <p>{error || 'Merci de vous connecter pour effectuer une réservation !'}</p>
        </div>
      )}

      {showConfirmation && reservationDetails && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-20">
          <p>Réservation confirmée !</p>
          <p><strong>Nom de l'hôtel :</strong> {hotelNameState}</p>
          <p><strong>Période :</strong> {reservationDetails.startDate} - {reservationDetails.endDate}</p>
          <p><strong>Prix par nuit :</strong> {reservationDetails.priceByNight} €</p>
          <p><strong>Prix total :</strong> {reservationDetails.totalPrice} €</p>
          <p><strong>Nombre de personnes :</strong> {reservationDetails.numberOfPeople}</p>
        </div>
      )}

      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Réservation pour {hotelNameState}</h3>
        <DatePicker
          selected={selectedDate && selectedDate[0] ? selectedDate[0] : undefined}
          onChange={handleDateChange}
          startDate={selectedDate && selectedDate[0] ? selectedDate[0] : undefined}
          endDate={selectedDate && selectedDate[1] ? selectedDate[1] : undefined}
          selectsRange
          inline
          minDate={new Date()}
          className={`border-0 p-4 w-full ${isReservationPage ? 'text-white' : 'text-black'}`}
          calendarClassName="bg-gray-200"
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

          {selectedDate && selectedDate[0] && selectedDate[1] && (
            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total :</span>
              <span>
                {(calculateTotalPrice(selectedDate[0], selectedDate[1]) * numberOfPeople).toFixed(2)} €
              </span>
            </div>
          )}

          <button
            onClick={handleReservation}
            className={`mt-4 py-2 px-4 rounded-md ${isReservationPage ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}
          >
            {isReservationPage ? 'Réserver maintenant' : 'Vérifier la disponibilité'}
          </button>
        </div>
      )}
    </motion.div>
  );
};
