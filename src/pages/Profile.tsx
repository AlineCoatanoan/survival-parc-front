import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IProfile, IReservation } from '../@types';  // Assurez-vous d'avoir un type IReservation
import { FormCreateProfile } from '../components/FormCreateProfile';

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [createdProfile, setCreatedProfile] = useState<IProfile | null>(null);
  const [reservations, setReservations] = useState<IReservation[]>([]); // Nouveau state pour les réservations
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Charger les données de profil
  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setError("Aucun identifiant utilisateur fourni dans l'URL.");
        return;
      }

      try {
        // Charger le profil
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
        if (response.data.success) {
          setCreatedProfile(response.data.data); // Charger les données du profil
        } else {
          setError("Impossible de récupérer le profil de l'utilisateur.");
        }

        // Charger les réservations de l'utilisateur
        const reservationResponse = await axios.get(`http://localhost:3000/api/reservations/${userId}`);
        if (reservationResponse.data.success) {
          setReservations(reservationResponse.data.data); // Charger les réservations
        } else {
          setError("Impossible de récupérer les réservations de l'utilisateur.");
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError("Erreur lors de la récupération des données.");
      }
    };

    loadProfile();
  }, [userId]);

  // Mise à jour après la création ou modification du profil
  const handleProfileCreated = (profile: IProfile) => {
    setCreatedProfile(profile); // Mettre à jour l'état avec les nouvelles données du profil
    setShowForm(false); // Fermer le formulaire
  };

  // Fonction de soumission du formulaire (mise à jour du profil)
  const handleProfileUpdate = async (updatedProfile: IProfile) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/profile/${userId}`, updatedProfile);

      if (response.data.success) {
        setCreatedProfile(response.data.data); // Mettre à jour l'état avec les nouvelles données du profil
        setShowForm(false); // Fermer le formulaire
      } else {
        setError("Impossible de mettre à jour le profil.");
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError("Erreur lors de la mise à jour des données.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Fermer le formulaire
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] min-h-screen p-6">
      <h1 className="text-center text-2xl font-semibold mb-6 text-white">Votre Profil</h1>

      {/* Affichage des erreurs */}
      {error && (
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
        </div>
      )}

      {/* Affichage du profil si existant */}
      {!userId ? (
  <p className="text-center text-white">Chargement des informations utilisateur...</p>
) : createdProfile ? (
  <div className="profile-info p-6 bg-[#374151] rounded-lg shadow-lg w-96 ml-16 mt-40">
    <h2 className="text-2xl font-semibold text-white mb-6">Votre Profil</h2>
    <p><strong>Prénom :</strong> {createdProfile.firstName}</p>
    <p><strong>Nom :</strong> {createdProfile.lastName}</p>
    <p><strong>Date de naissance :</strong> {createdProfile.birthDate.split('T')[0]}</p>
    <p><strong>Téléphone :</strong> {createdProfile.phone}</p>
    <p><strong>Adresse :</strong> {createdProfile.address}</p>
    <p><strong>Code Postal :</strong> {createdProfile.postalCode}</p>
    <p><strong>Ville :</strong> {createdProfile.city}</p>

    {/* Bouton Modifier */}
    <div className="mt-6 text-center">
      <button onClick={() => setShowForm(true)} className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700">
        Modifier
      </button>
    </div>
  </div>
) : (
  <div className="text-white text-center p-6">
    <p>Aucun profil trouvé. Veuillez en créer un.</p>
    {/* Bouton pour créer un profil */}
    <button onClick={() => setShowForm(true)} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
      Créer un profil
    </button>
  </div>
)}


      {/* Affichage des réservations */}
      {reservations.length > 0 && (
        <div className="mt-12 text-white">
          <h3 className="text-xl font-semibold mb-4">Vos Réservations</h3>
          <ul className="space-y-4">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="bg-[#374151] p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold">{reservation.hotelName}</h4>
                <p><strong>Réservé le :</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulaire de création ou modification */}
      {showForm && userId && (
        <FormCreateProfile
          userId={userId}
          onProfileCreated={handleProfileCreated}
          onClose={handleCloseForm}
          initialData={createdProfile} // Passer les données du profil pour pré-remplir le formulaire
          onSubmit={handleProfileUpdate} // Passer la fonction pour soumettre la mise à jour
        />
      )}
    </div>
  );
};
