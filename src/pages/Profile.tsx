import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IProfile, IReservation, IHotelReservation } from '../@types'; // Importer IHotelReservation
import { FormCreateProfile } from '../components/FormCreateProfile';

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const profileId = userId;
  const [createdProfile, setCreatedProfile] = useState<IProfile | null>(null);
  const [reservations, setReservations] = useState<IReservation[]>([]); // Initialiser comme tableau vide
  const [hotelReservations, setHotelReservations] = useState<IHotelReservation[]>([]); // Initialiser comme tableau vide
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setError("Aucun identifiant utilisateur fourni dans l'URL.");
        return;
      }

      try {
        // Récupération du profil
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
        if (response.data.success) {
          setCreatedProfile(response.data.data);
        } else {
          setError("Impossible de récupérer le profil de l'utilisateur.");
          return;
        }

        // Récupération des réservations classiques
        const reservationResponse = await axios.get(`http://localhost:3000/api/reservation/${profileId}`);
        if (reservationResponse.data.success) {
          setReservations(reservationResponse.data.data || []); // Assurez-vous que c'est un tableau
        } else {
          setError("Impossible de récupérer les réservations classiques de l'utilisateur.");
        }

        // Récupération des réservations d'hôtel
        const hotelReservationResponse = await axios.get(`http://localhost:3000/api/profilehotel/${profileId}`);
        if (hotelReservationResponse.data.success) {
          setHotelReservations(hotelReservationResponse.data.message || []); // Assurez-vous que c'est un tableau
        } else {
          setError("Impossible de récupérer les réservations d'hôtel.");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Erreur Axios:', err.response?.data || err.message);
          setError(err.response?.data?.message || "Erreur lors de la récupération des données.");
        } else if (err instanceof Error) {
          console.error('Erreur standard:', err.message);
          setError("Erreur lors de la récupération des données.");
        } else {
          console.error('Erreur inconnue:', err);
          setError("Une erreur inattendue s'est produite.");
        }
      }
    };

    loadProfile();
  }, [userId, profileId]);

  const handleProfileCreated = (profile: IProfile) => {
    setCreatedProfile(profile);
    setShowForm(false);
  };

  const handleProfileUpdate = async (updatedProfile: IProfile) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/profile/${userId}`, updatedProfile);

      if (response.data.success) {
        setCreatedProfile(response.data.data);
        setShowForm(false);
      } else {
        setError("Impossible de mettre à jour le profil.");
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError("Erreur lors de la mise à jour des données.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Déterminer la valeur de padding en fonction de l'état de la modale
  const paddingBottom = showForm ? 'pb-32' : 'pb-6';

  return (
    <div className={`bg-gradient-to-b from-black via-gray-800 to-gray-800 min-h-screen p-6 ${paddingBottom}`}>
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-6 text-white">
        Votre Profil
      </h1>

      {error && (
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
        </div>
      )}

      {!userId ? (
        <p className="text-center text-white">Chargement des informations utilisateur...</p>
      ) : createdProfile ? (
        <div className="profile-info p-6 bg-gray-700 rounded-lg shadow-lg mx-auto mt-10 max-w-md sm:max-w-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
            Informations du Profil
          </h2>
          <p>
            <strong>Prénom :</strong> {createdProfile.firstName}
          </p>
          <p>
            <strong>Nom :</strong> {createdProfile.lastName}
          </p>
          <p>
            <strong>Date de naissance :</strong>{' '}
            {createdProfile.birthDate.split('T')[0]}
          </p>
          <p>
            <strong>Téléphone :</strong> {createdProfile.phone}
          </p>
          <p>
            <strong>Adresse :</strong> {createdProfile.address}
          </p>
          <p>
            <strong>Code Postal :</strong> {createdProfile.postalCode}
          </p>
          <p>
            <strong>Ville :</strong> {createdProfile.city}
          </p>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition"
            >
              Modifier
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white text-center p-6">
          <p>Aucun profil trouvé. Veuillez en créer un.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Créer un profil
          </button>
        </div>
      )}

      {reservations && reservations.length > 0 && (
        <div className="mt-12 text-white max-w-4xl mx-auto">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
            Vos Réservations
          </h3>
          <ul className="space-y-4">
            {reservations.map((reservation) => (
              <li
                key={reservation.id}
                className="bg-gray-700 p-4 rounded-lg shadow-md"
              >
                <h4 className="text-md md:text-lg font-semibold">
                  {reservation.description}
                </h4>
                <p>
                  <strong>Réservé le :</strong>{' '}
                  {new Date(reservation.startDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Affichage des réservations d'hôtel */}
      {hotelReservations && hotelReservations.length > 0 ? (
  <div className="mt-6 text-white max-w-4xl mx-auto">
    <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
      Vos Réservations d'Hôtel
    </h3>
    <ul className="space-y-4">
      {hotelReservations.map((hotelReservation) => (
        <li key={hotelReservation.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h4 className="text-md md:text-lg font-semibold">{hotelReservation.hotel.name}</h4>
          <p>
            <strong>Réservé du :</strong> {new Date(hotelReservation.startDate).toLocaleDateString()} 
            <strong> au </strong> {new Date(hotelReservation.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Nombre de personnes :</strong> {hotelReservation.numberOfPeople || 'Non précisé'}
          </p>
          <p>
            <strong>Prix par nuit :</strong> {hotelReservation.priceByNight} €
          </p>
          <p>
            <strong>Prix total :</strong> 
            {hotelReservation.totalPrice && !isNaN(Number(hotelReservation.totalPrice)) 
              ? Number(hotelReservation.totalPrice).toFixed(2) + ' €' 
              : 'Prix non disponible'}
          </p>

        </li>
      ))}
    </ul>
  </div>
) : (
  <div className="text-white text-center p-6">
    <p>Aucune réservation d'hôtel trouvée.</p>
  </div>
)}





      {showForm && userId && (
        <FormCreateProfile
          userId={userId}
          onProfileCreated={handleProfileCreated}
          onClose={handleCloseForm}
          initialData={createdProfile}
          onSubmit={handleProfileUpdate}
        />
      )}

      {showForm && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 shadow-lg"></div>
      )}
    </div>
  );
};
