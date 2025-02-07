import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IProfile, IReservation, IHotelReservation } from '../@types'; // Importer IHotelReservation
import { FormCreateProfile } from '../components/FormCreateProfile';
import { apiBaseUrl } from '../services/config';

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const profileId = userId;
  const [createdProfile, setCreatedProfile] = useState<IProfile | null>(null);
  const [reservations, setReservations] = useState<IReservation[]>([]); // Initialiser comme tableau vide
  const [hotelReservations, setHotelReservations] = useState<IHotelReservation[]>([]); // Initialiser comme tableau vide
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (createdProfile && reservations.length > 0 && hotelReservations.length > 0) {
      return; // Si les données sont déjà chargées, on ne refait pas la requête
    }
  
    const loadProfile = async () => {
      if (!userId) {
        setError("Aucun identifiant utilisateur fourni dans l'URL.");
        return;
      }
  
      try {
        // Récupération du profil pour obtenir profileId
        const response = await axios.get(`${apiBaseUrl}/api/profile/${userId}`);
        if (response.data.success) {
          const profile = response.data.data;
          setCreatedProfile(profile);
          
          // Récupération du profileId à partir du profil
          const profileId = profile.id;
  
          // Récupération des réservations classiques avec le profileId
          const reservationResponse = await axios.get(`${apiBaseUrl}/api/reservation/${profileId}`);
          if (reservationResponse.data.success) {
            setReservations(reservationResponse.data.data || []);
          } else {
            setError("Impossible de récupérer les réservations.");
          }
  
          // Récupération des réservations d'hôtel avec le profileId
          const hotelReservationResponse = await axios.get(`${apiBaseUrl}/api/profilehotel/${profileId}`);
          if (hotelReservationResponse.data.success) {
            setHotelReservations(hotelReservationResponse.data.message || []);
          } else {
            setError("Impossible de récupérer les réservations d'hôtel.");
          }
        } else {
          setError("Impossible de récupérer le profil de l'utilisateur.");
        }
      } catch (err) {
        handleApiError(err, "Erreur lors de la récupération des données.");
      }
    };
  
    loadProfile();
  }, [userId, createdProfile, reservations, hotelReservations]);  // Assurez-vous que les dépendances sont bien gérées
  
  
  // Fonction de gestion des erreurs API
  const handleApiError = (err, customMessage) => {
    if (axios.isAxiosError(err)) {
      console.error('Erreur Axios:', err.response?.data || err.message);
      setError(err.response?.data?.message || customMessage);
    } else if (err instanceof Error) {
      console.error('Erreur standard:', err.message);
      setError(customMessage);
    } else {
      console.error('Erreur inconnue:', err);
      setError("Une erreur inattendue s'est produite.");
    }
  };

  

  const handleProfileCreated = (profile: IProfile) => {
    setCreatedProfile(profile);
    setShowForm(false);
  };

  const handleProfileUpdate = async (updatedProfile: IProfile) => {
    try {
      const response = await axios.put(`${apiBaseUrl}/api/profile/${userId}`, updatedProfile);

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

// Fonction d'annulation pour une réservation de ticket
const handleCancelReservation = async (reservationId: number, startDate: string | Date) => {
  try {
    // Vérifiez si startDate est une chaîne de caractères (type string)
    const date = (startDate instanceof Date) ? startDate : new Date(startDate); // Convertir en Date si nécessaire
    const now = new Date();

    // Calculer la différence en jours
    const timeDifference = date.getTime() - now.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24); // Différence en jours

    // Vérifier si l'annulation est possible (par exemple, jusqu'à 10 jours avant la réservation)
    if (daysRemaining < 10) {
      setError("Vous ne pouvez annuler cette réservation que jusqu'à 10 jours avant la date.");
      return;
    }

    // Si l'annulation est possible, envoyer la demande au backend
    const response = await axios.delete(
      `${apiBaseUrl}/api/reservation/${reservationId}`,
      {
        data: { profileId: profileId } // L'ID du profil dans le corps de la requête
      }
    );

    if (response.data.success) {
      // Mise à jour de l'état local pour retirer la réservation annulée
      setReservations(reservations.filter((res) => res.id !== reservationId));
      setError(null); // Réinitialiser les erreurs si la suppression est réussie
    } else {
      setError("Erreur lors de l'annulation de la réservation.");
    }
  } catch (err) {
    setError("Une erreur s'est produite lors de l'annulation.");
    console.error(err);
  }
};



  
  
  
  
  
  
// Fonction pour supprimer une réservation d'hôtel
const handleCancelHotelReservation = async (profileHotelId: number, hotelId: number, startDate: string | Date) => {
  try {
    // Vérifier si startDate est une chaîne de caractères (type string)
    const date = (startDate instanceof Date) ? startDate : new Date(startDate); // Convertir en Date si nécessaire
    const now = new Date();

    // Calculer la différence en jours
    const timeDifference = date.getTime() - now.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24); // Différence en jours

    // Vérifier si l'annulation est possible (par exemple, jusqu'à 10 jours avant la réservation)
    if (daysRemaining < 10) {
      setError("Vous ne pouvez annuler cette réservation d'hôtel que jusqu'à 10 jours avant la date.");
      return;
    }

    // Si l'annulation est possible, envoyer la demande au backend
    const response = await axios.delete(
      `${apiBaseUrl}/api/profilehotel/${profileHotelId}`, // L'ID de la réservation dans l'URL
      {
        data: { // Profil et ID de l'hôtel dans le corps de la requête
          profileId: profileId,  // L'ID du profil de l'utilisateur
          hotelId: hotelId,      // L'ID de l'hôtel associé à la réservation
        }
      }
    );

    if (response.data.success) {
      // Mise à jour de l'état pour refléter la suppression
      setHotelReservations(hotelReservations.filter((res) => res.id !== profileHotelId));  // Utilisation de profileHotelId pour la suppression
      setError(null); // Réinitialiser les erreurs si la suppression est réussie
    } else {
      setError("Erreur lors de l'annulation de la réservation d'hôtel.");
    }
  } catch (err) {
    setError("Une erreur s'est produite lors de l'annulation.");
    console.error(err);
  }
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
              <li key={reservation.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h4 className="text-md md:text-lg font-semibold">
                  {reservation.description}
                </h4>
                <p>
                  <strong>Réservé le :</strong>{' '}
                  {new Date(reservation.startDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleCancelReservation(reservation.id, new Date(reservation.startDate))} 
                  className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Annuler la réservation
                </button>

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
                <button
                  onClick={() => handleCancelHotelReservation(
                    hotelReservation.id, 
                    hotelReservation.hotel.id, 
                    new Date(hotelReservation.startDate)
                  )}
                  className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Annuler la réservation d'hôtel
                </button>
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
