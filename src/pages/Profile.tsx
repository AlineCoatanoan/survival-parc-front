import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import axios from 'axios'; 
import { IProfile, IReservation } from '../@types';

export function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // Permet de contrôler l'édition du profil
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });

  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
      if (response.data.success) {
        setFormData((prevState) => ({
          ...prevState,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  const fetchProfileData = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
      if (response.data.success) {
        setProfileData(response.data.data);
        setFormData((prevState) => ({
          ...prevState,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          birthDate: response.data.data.birthDate,
          phone: response.data.data.phone,
          address: response.data.data.address,
          postalCode: response.data.data.postalCode,
          city: response.data.data.city,
        }));
      } else {
        setProfileData(null);
      }
    } catch (err) {
      console.error(err);
      setProfileData(null);
    }
  }, [userId]);

  const fetchReservations = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/reservations/${userId}`);
      if (response.data.success) {
        setReservations(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserInfo();
    fetchProfileData();
    fetchReservations();
  }, [fetchUserInfo, fetchProfileData, fetchReservations]);

  const handleUpdateProfile = async () => {
    try {
      setIsCreating(true);
      const response = await axios.put(`http://localhost:3000/api/profile/${userId}`, formData);
      if (response.status === 200 && response.data.success) {
        setProfileData(response.data.data); // Mettez à jour les données du profil
        setFormData({
          ...formData,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email,
          phone: response.data.data.phone,
          address: response.data.data.address,
          postalCode: response.data.data.postalCode,
          city: response.data.data.city,
          birthDate: response.data.data.birthDate,
        });
      } else {
        console.error('Erreur lors de la mise à jour du profil.');
      }
    } catch (err) {
      console.error('Erreur réseau:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre profil ?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/profile/${userId}`);
        if (response.status === 200) {
          alert('Profil supprimé');
          // Rediriger ou faire d'autres actions après la suppression
        } else {
          alert('Erreur lors de la suppression du profil');
        }
      } catch (error) {
        console.error('Erreur de suppression:', error);
        alert('Erreur de suppression du profil');
      }
    }
  };

  const renderEditProfileForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isEditable) handleUpdateProfile(); // Appel de la fonction pour mettre à jour le profil
      }}
      className="bg-[#374151] p-6 rounded-lg shadow-lg w-96 mx-auto"
    >
      {/* Form Fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Prénom</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Nom</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Email</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Téléphone</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Adresse</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Code Postal</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800">Ville</label>
        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!isEditable} // Champs non modifiable si "isEditable" est false
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setIsEditable(!isEditable)} // Bascule l'état d'édition
          className="bg-[#FF7828] text-white px-4 py-2 rounded-md"
        >
          {isEditable ? 'Annuler' : 'Modifier'}
        </button>
        <button
          type="submit"
          disabled={!isEditable || isCreating} // Désactive le bouton si non modifiable
          className="bg-[#095F2D] text-white px-4 py-2 rounded-md"
        >
          {isCreating ? 'Enregistrement...' : 'Sauvegarder'}
        </button>
      </div>
      {/* Bouton de suppression */}
    <div className="mt-4">
      <button
        type="button"
        onClick={handleDeleteProfile}
        className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
      >
        Supprimer le profil
      </button>
    </div>
    </form>
  );

  const renderReservations = () => (
    <div className="ml-10">
      <h2 className="text-xl font-semibold pt-8">Mes réservations</h2>
      <div>
        {reservations.length === 0 ? (
          <p>Aucune réservation</p>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id} className="mb-4">
                <p><strong>Date:</strong> {format(new Date(reservation.startDate), 'dd/MM/yyyy')}</p>
                <p><strong>Hôtel:</strong> {reservation.hotelName}</p>
                <p><strong>Ticket:</strong> {reservation.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  return (
    <div className="flex pt-32 pb-12 bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937]">
      <div className="flex-1 text-center"> {/* Utilisation de text-center pour centrer le texte */}
        <h1 className="text-2xl font-semibold pt-10">Mon profil</h1>
        <div className="mt-[80px]">
          {profileData ? (
            renderEditProfileForm() // Affichage du formulaire d'édition
          ) : (
            <p>Votre profil est en cours de création.</p>
          )}
        </div>
      </div>

      <div className="w-1/3 mt-6">
        {renderReservations()} {/* Affichage des réservations */}
      </div>
    </div>
  );
  
  
}
