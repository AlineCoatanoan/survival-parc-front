import React, { useState, useEffect } from 'react';
import { useCart } from '../features/auth/cartContext';  // Assurez-vous d'importer le contexte Cart
import axios from 'axios';  // Utilisation d'Axios pour les requêtes API
import { IReservation, IHotel, IUser, IProfile } from '../@types'; // Import des interfaces

export interface ICartItem {
    reservationId: number;
    hotel: IHotel;
    startDate: Date;
    endDate: Date;
    nights: number;
    numberOfPeople: number;
    totalPrice: number;
  }
  

export const Reservations = () => {
  // États pour stocker les informations
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IProfile | null>(null);  // Profil de l'utilisateur
  const [reservations, setReservations] = useState<IReservation[]>([]);  // Réservations de l'utilisateur
  const [hotels, setHotels] = useState<IHotel[]>([]);  // Hôtels réservés
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);  // Items dans le panier

  const { clearCart } = useCart();  // Récupérer une fonction pour vider le panier

  // Cette fonction récupère les informations de l'utilisateur connecté
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
  
      // Récupération du profil de l'utilisateur
      const profileResponse = await axios.get<IUser>('/api/user/profile');  // Exemple d'API pour récupérer le profil
      // Vérification si le profil existe
      setUserProfile(profileResponse.data.profile || null);  // Si le profil est indéfini, on met null
  
      // Récupérer les réservations de l'utilisateur et les hôtels associés
      const reservationsResponse = await axios.get<IReservation[]>(`/api/reservations/${profileResponse.data.id}`);
      const hotelIds = reservationsResponse.data.map(reservation => reservation.hotelId); // Extraire les IDs des hôtels
      const hotelsResponse = await axios.get<IHotel[]>(`/api/hotels`, { params: { ids: hotelIds } });
  
      setReservations(reservationsResponse.data);
      setHotels(hotelsResponse.data);
  
      // Générer les items du panier à partir des réservations et des hôtels
      const cartData: ICartItem[] = reservationsResponse.data.map(reservation => {
        const hotel = hotelsResponse.data.find(hotel => hotel.id === reservation.hotelId);
        return {
          reservationId: reservation.id,
          hotel: hotel!, // Assurez-vous que hotel n'est jamais undefined ici
          startDate: reservation.startDate,
          endDate: reservation.endDate,
          nights: reservation.nights,
          numberOfPeople: reservation.person,
          totalPrice: reservation.price,
        };
      });
  
      setCartItems(cartData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Appeler la fonction de récupération des données utilisateur lorsque le composant est monté
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();  // Récupérer les données quand l'utilisateur est connecté
    }
  }, [isLoggedIn]);

  // Fonction pour gérer la connexion de l'utilisateur
  const handleLogin = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoggedIn(true); // Connexion réussie
      setIsLoading(false);
    }, 1000); // Vous pouvez remplacer ceci par un vrai appel API
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Déconnexion
    clearCart(); // Vider le panier lors de la déconnexion
  };

  return (
    <div className="p-4 mt-20">
      {/* Afficher un message si l'utilisateur n'est pas connecté */}
      {!isLoggedIn && !isLoading ? (
        <div className="alert alert-warning mb-4">
          Vous devez être connecté pour effectuer une réservation.
        </div>
      ) : null}

      {/* Afficher la page de réservation seulement si l'utilisateur est connecté */}
      {isLoggedIn ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Détails de votre réservation</h1>
          
          {/* Afficher le profil utilisateur */}
          {userProfile && (
            <div className="mb-4">
              <p><strong>Profil ID:</strong> {userProfile.id}</p>
              <p><strong>Nom:</strong> {userProfile.firstName} {userProfile.lastName}</p>
              <p><strong>Date de naissance:</strong> {new Date(userProfile.birthDate).toLocaleDateString()}</p>
              <p><strong>Téléphone:</strong> {userProfile.phone}</p>
              <p><strong>Adresse:</strong> {userProfile.address}, {userProfile.city}, {userProfile.postalCode}</p>
            </div>
          )}

          {/* Afficher les éléments du panier */}
          {cartItems.length === 0 ? (
            <p>Aucune réservation dans votre panier.</p>
          ) : (
            <div>
              {cartItems.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <p className="font-medium text-lg">Réservation pour {item.numberOfPeople} personne(s)</p>
                  <p>Date : {item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}</p>
                  <p>Prix total : {item.totalPrice} €</p>
                  <p>Hôtel : {item.hotel.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* Afficher les réservations */}
          {reservations.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Vos réservations</h2>
              {reservations.map((reservation, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <p><strong>Date de réservation:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
                  <p><strong>Nombre de personnes:</strong> {reservation.person}</p>
                  <p><strong>Description:</strong> {reservation.description}</p>
                  <p><strong>Prix total:</strong> {reservation.price} €</p>
                  <p><strong>Hôtel réservé:</strong> {reservation.hotel?.name}</p> {/* Afficher le nom de l'hôtel */}
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune réservation trouvée.</p>
          )}

          {/* Afficher les hôtels réservés */}
          {hotels.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Hôtels réservés</h2>
              {hotels.map((hotel, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <p><strong>Nom de l'hôtel:</strong> {hotel.name}</p>
                  <p><strong>Description:</strong> {hotel.description}</p>
                  <p><strong>Adresse:</strong> {hotel.address}, {hotel.city}, {hotel.postalCode}</p>
                  <p><strong>Prix par nuit:</strong> {hotel.priceByNight} €</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun hôtel réservé.</p>
          )}

        </div>
      ) : (
        <div>
          <button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </div>
      )}

      {/* Déconnexion */}
      {isLoggedIn && (
        <button 
          onClick={handleLogout} 
          className="mt-4 p-2 bg-red-500 text-white rounded-md"
        >
          Se déconnecter
        </button>
      )}
    </div>
  );
};
