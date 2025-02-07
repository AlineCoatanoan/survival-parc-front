import React, { useEffect, useState } from 'react';
import { IAnimation, IHotel, IReservation, IHotelReservation } from '../@types'; // Assurez-vous que IHotel est bien défini
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { apiBaseUrl } from '../services/config';

export const Dashboard = () => {
  const [animations, setAnimations] = useState<IAnimation[]>([]);
  const [hotels, setHotels] = useState<IHotel[]>([]);  // Etat pour stocker les hôtels
  const [newAnimation, setNewAnimation] = useState({ name: '', type: '', description: '' });
  const [newHotel, setNewHotel] = useState({ name: '', description: '', address: '', priceByNight: '' }); // Formulaire de création d'un hôtel
  const [editingAnimation, setEditingAnimation] = useState<IAnimation | null>(null);
  const [editingHotel, setEditingHotel] = useState<IHotel | null>(null); 
  const [reservations, setReservations] = useState<IReservation[]>([]); 
  const [reservationHotel, setReservationHotel] = useState<IHotelReservation[]>([]);

  // Fonction pour récupérer les animations depuis l'API
  const fetchAnimations = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/animations`);
      const animationsData = response.data?.data || response.data;
      if (Array.isArray(animationsData)) {
        setAnimations(animationsData);
      } else {
        console.error('Données incorrectes reçues de l\'API', animationsData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des animations:', error);
    }
  };

  // Fonction pour récupérer les hôtels depuis l'API
  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/hotel`);
      const hotelsData = response.data?.data || response.data;
      if (Array.isArray(hotelsData)) {
        setHotels(hotelsData);
      } else {
        console.error('Données incorrectes reçues de l\'API', hotelsData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des hôtels:', error);
    }
  };

  // Fonction pour récupérer les réservations depuis l'API
  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/reservation`);
      const reservationsData = response.data?.data || response.data;
      if (Array.isArray(reservationsData)) {
        setReservations(reservationsData);
      } else {
        console.error('Données incorrectes reçues de l\'API', reservationsData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  };

  const fetchHotelReservation = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/profilehotel`);
      const hotelReservationData = response.data?.data || response.data;
  
      // Vérifie que l'API renvoie un tableau de réservations d'hôtel
      if (Array.isArray(hotelReservationData)) {
        setReservationHotel(hotelReservationData);  // Sauvegarde toutes les réservations d'hôtel
      } else {
        console.error('Données incorrectes reçues de l\'API', hotelReservationData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  };

  // Appel de la fonction pour récupérer les animations et les hôtels au chargement du composant
  useEffect(() => {
    fetchAnimations();
    fetchHotels();
    fetchReservations();
    fetchHotelReservation();
  }, []);

  // Fonction pour ajouter une animation
  const handleAddAnimation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnimation.name || !newAnimation.type || !newAnimation.description) {
      console.log("Erreur : Tous les champs doivent être remplis.");
      return;
    }
    try {
      const response = await axios.post(`${apiBaseUrl}/api/animations`, newAnimation);
      setAnimations((prevAnimations) => [...prevAnimations, response.data]);
      setNewAnimation({ name: '', type: '', description: '' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'animation :", error);
    }
  };

  // Fonction pour ajouter un hôtel
  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotel.name || !newHotel.description || !newHotel.address || !newHotel.priceByNight) {
      console.log("Erreur : Tous les champs doivent être remplis.");
      return;
    }
    try {
      const response = await axios.post(`${apiBaseUrl}/api/hotel`, newHotel);
      setHotels((prevHotels) => [...prevHotels, response.data]);
      setNewHotel({ name: '', description: '', address: '', priceByNight: '' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'hôtel :", error);
    }
  };

  // Fonction pour supprimer une animation
  const handleDeleteAnimation = async (id: number) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/animations/${id}`);
      fetchAnimations();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'animation:', error);
    }
  };

  // Fonction pour supprimer un hôtel
  const handleDeleteHotel = async (id: number) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/hotel/${id}`);
      fetchHotels();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'hôtel:', error);
    }
  };

  // Fonction pour modifier une animation
  const handleEditAnimation = (animation: IAnimation) => {
    setEditingAnimation(animation);
  };

  // Fonction pour modifier un hôtel
  const handleEditHotel = (hotel: IHotel) => {
    setEditingHotel(hotel);
  };

  // Fonction pour mettre à jour une animation
  const handleUpdateAnimation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnimation) return;
    try {
      await axios.put(`${apiBaseUrl}/api/animations/${editingAnimation.id}`, editingAnimation);
      fetchAnimations();
      setEditingAnimation(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'animation:', error);
    }
  };

  // Fonction pour mettre à jour un hôtel
  const handleUpdateHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel) return;
    try {
      await axios.put(`${apiBaseUrl}/api/hotel/${editingHotel.id}`, editingHotel);
      fetchHotels();
      setEditingHotel(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'hôtel:', error);
    }
  };

  if (animations.length === 0 && hotels.length === 0) {
    return <div className="text-white">Aucune animation et hôtel disponible.</div>;
  }

  return (
    <div className="p-6 bg-black">
      <h1 className="text-3xl font-bold mb-6 text-center mt-[150px] text-white">Tableau de bord</h1>
  
      {/* Conteneur Flex pour animations et hôtels */}
      <div className="flex gap-12 justify-between">
        {/* Section Animations */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Animations</h2>
  
          {/* Formulaire d'ajout d'une nouvelle animation */}
          <form onSubmit={handleAddAnimation} className="mb-6 space-x-4 flex max-w-[50%] pl-0 mt-[50px]">
            <input
              type="text"
              value={newAnimation.name}
              onChange={(e) => setNewAnimation({ ...newAnimation, name: e.target.value })}
              placeholder="Nom"
              className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
              required
            />
            <input
              type="text"
              value={newAnimation.type}
              onChange={(e) => setNewAnimation({ ...newAnimation, type: e.target.value })}
              placeholder="Type"
              className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
              required
            />
            <input
              type="text"
              value={newAnimation.description}
              onChange={(e) => setNewAnimation({ ...newAnimation, description: e.target.value })}
              placeholder="Description"
              className="p-2 rounded-md border border-gray-300 text-sm w-[180px] ml-4"
              required
            />
            <button type="submit" className="p-2 bg-green-600 text-white rounded-md text-sm">
              <FaPlusCircle className="inline mr-2" /> Ajouter
            </button>
          </form>
  
          {/* Liste des animations */}
          <div className="flex flex-col gap-6 mt-15 w-[60%] pr-22 ml-4">
            {animations.map((animation) => (
              <div key={animation.id} className="text-white border-b border-gray-600 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{animation.name}</h2>
                    <p><strong>Type :</strong> {animation.type}</p>
                    <p><strong>Description :</strong> {animation.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleEditAnimation(animation)} className="text-blue-500 text-sm">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteAnimation(animation.id)} className="text-red-500 text-sm">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
  
                {/* Formulaire d'édition de l'animation */}
                {editingAnimation && editingAnimation.id === animation.id && (
                  <form onSubmit={handleUpdateAnimation} className="mb-6 space-x-4 flex max-w-[50%] pl-0 mt-6">
                    <input
                      type="text"
                      value={editingAnimation.name}
                      onChange={(e) => setEditingAnimation({ ...editingAnimation, name: e.target.value })}
                      placeholder="Nom"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
                      required
                    />
                    <input
                      type="text"
                      value={editingAnimation.type}
                      onChange={(e) => setEditingAnimation({ ...editingAnimation, type: e.target.value })}
                      placeholder="Type"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
                      required
                    />
                    <input
                      type="text"
                      value={editingAnimation.description}
                      onChange={(e) => setEditingAnimation({ ...editingAnimation, description: e.target.value })}
                      placeholder="Description"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[180px] ml-4"
                      required
                    />
                    <button type="submit" className="p-2 bg-blue-600 text-white rounded-md text-sm">
                      Mettre à jour
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Section Hôtels */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Hôtels</h2>
  
          {/* Formulaire d'ajout d'un nouvel hôtel */}
          <form onSubmit={handleAddHotel} className="mb-6 space-x-4 flex max-w-[50%] pl-0 mt-[50px]">
            <input
              type="text"
              value={newHotel.name}
              onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
              placeholder="Nom"
              className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
              required
            />
            <input
              type="text"
              value={newHotel.description}
              onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
              placeholder="Description"
              className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
              required
            />
            <input
              type="text"
              value={newHotel.address}
              onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
              placeholder="Adresse"
              className="p-2 rounded-md border border-gray-300 text-sm w-[180px] ml-4"
              required
            />
            <input
              type="number"
              value={newHotel.priceByNight}
              onChange={(e) => setNewHotel({ ...newHotel, priceByNight: e.target.value })}
              placeholder="Prix par nuit"
              className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
              required
            />
            <button type="submit" className="p-2 bg-green-600 text-white rounded-md text-sm">
              <FaPlusCircle className="inline mr-2" /> Ajouter
            </button>
          </form>
  
          {/* Liste des hôtels */}
          <div className="flex flex-col gap-6 mt-15 max-w-[80%] pl-0 ml-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="text-white border-b border-gray-600 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{hotel.name}</h2>
                    <p><strong>Description :</strong> {hotel.description}</p>
                    <p><strong>Adresse :</strong> {hotel.address}</p>
                    <p><strong>Prix par nuit :</strong> {hotel.priceByNight} €</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleEditHotel(hotel)} className="text-blue-500 text-sm">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteHotel(hotel.id)} className="text-red-500 text-sm">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
  
                {/* Formulaire d'édition de l'hôtel */}
                {editingHotel && editingHotel.id === hotel.id && (
                  <form onSubmit={handleUpdateHotel} className="mb-6 space-x-4 flex max-w-[50%] pl-0 mt-6">
                    <input
                      type="text"
                      value={editingHotel.name}
                      onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                      placeholder="Nom"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
                      required
                    />
                    <input
                      type="text"
                      value={editingHotel.description}
                      onChange={(e) => setEditingHotel({ ...editingHotel, description: e.target.value })}
                      placeholder="Description"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
                      required
                    />
                    <input
                      type="text"
                      value={editingHotel.address}
                      onChange={(e) => setEditingHotel({ ...editingHotel, address: e.target.value })}
                      placeholder="Adresse"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[180px] ml-4"
                      required
                    />
                    <input
                      type="number"
                      value={editingHotel.priceByNight}
                      onChange={(e) => setEditingHotel({ ...editingHotel, priceByNight: e.target.value })}
                      placeholder="Prix par nuit"
                      className="p-2 rounded-md border border-gray-300 text-sm w-[120px] ml-4"
                      required
                    />
                    <button type="submit" className="p-2 bg-blue-600 text-white rounded-md text-sm">
                      Mettre à jour
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Section pour afficher les réservations générales */}
      <div className="flex gap-12 justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Réservations Générales</h2>
          <div className="flex flex-col gap-6 mt-15 max-w-[80%] pl-0 ml-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="text-white border-b border-gray-600 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{reservation.description}</h2>
                    <p><strong>Personnes :</strong> {reservation.person}</p>
                    <p><strong>Prix :</strong> {reservation.price} €</p>
                    <p><strong>Date de début :</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p><strong>Date de fin :</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Section pour afficher les réservations d'hôtel */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Réservations Hôtels</h2>
          {reservationHotel && reservationHotel.length > 0 ? (
            <div className="flex flex-col gap-6 mt-15 max-w-[80%] pl-0 ml-4">
              {reservationHotel.map((resHotel) => (
                <div key={resHotel.id} className="text-white border-b border-gray-600 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{resHotel.hotel.name}</h2>
                      <p><strong>Prix total :</strong> {resHotel.totalPrice} €</p>
                      <p><strong>Nombre de personnes :</strong> {resHotel.numberOfPeople}</p>
                      <p><strong>Date de début :</strong> {new Date(resHotel.startDate).toLocaleDateString()}</p>
                      <p><strong>Date de fin :</strong> {new Date(resHotel.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">Aucune réservation d'hôtel trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
}  