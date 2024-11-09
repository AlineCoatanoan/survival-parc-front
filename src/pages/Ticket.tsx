import React, { useState } from 'react';
import { CalendrierPicker } from '../components/Calendar'; // Utilisation de CalendrierPicker au lieu de Calendrier

// Définir un type pour la réservation
interface Reservation {
  numberOfPeople: number;
  selectedDate: Date | null;
  totalPrice: number;
}

export const Ticket = () => {
  const [showCalendrier, setShowCalendrier] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Ajout de l'état pour la date sélectionnée
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Etat représentant si l'utilisateur est connecté
  const [cart, setCart] = useState<Reservation[]>([]); // Panier sous forme de tableau de réservations
  const [showWarning, setShowWarning] = useState(false); // Etat pour afficher le warning

  const ticketPrice = 25; // Prix du ticket

  // Fonction pour ajouter une réservation au panier
  const addToCart = (reservation: Reservation) => {
    setCart((prevCart) => [...prevCart, reservation]);
    console.log('Panier mis à jour', cart);
  };

  // Fonction de gestion de la fermeture de la modale et de la réservation
  const handleReserve = () => {
    if (isAuthenticated) {
      // Si l'utilisateur est connecté, on ajoute la réservation au panier
      const reservation: Reservation = {
        numberOfPeople,
        selectedDate,
        totalPrice: numberOfPeople * ticketPrice, // Calcul du prix total
      };

      // Ajout de la réservation au panier
      addToCart(reservation);

      // Fermer la modale après la réservation
      handleCloseCalendrier();
    } else {
      // Si l'utilisateur n'est pas connecté, on affiche une alerte
      setShowWarning(true);

      // Masquer le warning après 3 secondes
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
    }
  };

  // Fonction pour afficher la modale calendrier
  const handleShowCalendrier = () => {
    setShowCalendrier(true);
  };

  const handleCloseCalendrier = () => {
    setShowCalendrier(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseCalendrier();
    }
  };

  // Fonction de mise à jour de la date sélectionnée
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-[200px]">
      <h1 className="text-4xl font-bold text-center mb-6">Billetterie</h1>
      <p className="text-center text-lg mb-6">
        Retrouvez nos offres disponibles en ligne et/ou en caisse pour une exploration adaptée à vos besoins !
      </p>

      <div className="max-w-4xl mx-auto">
        <form className="bg-gray-800 p-8 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Réservation Ticket 1 Jour</h2>
            <span className="bg-red-500 text-white text-sm py-1 px-3 rounded-full">Réservez tout de suite et payez en caisse</span>
          </div>

          <div className="text-lg mb-6">
            <p><strong>Prix:</strong> €25 par personne</p>
            <p><strong>Validité:</strong> Accès au parc pendant 1 journée.</p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
              onClick={handleShowCalendrier}
            >
              Réserver Maintenant
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
            >
              Annuler
            </button>
          </div>
        </form>

        <form className="bg-gray-800 p-8 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Réservation Ticket 2 Jours</h2>
            <span className="bg-red-500 text-white text-sm py-1 px-3 rounded-full">Réservez tout de suite et payez en caisse</span>
          </div>

          <div className="text-lg mb-6">
            <p><strong>Prix:</strong> €40 par personne</p>
            <p><strong>Validité:</strong> Accès au parc pendant 2 journées consécutives.</p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
              onClick={handleShowCalendrier}
            >
              Réserver Maintenant
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
            >
              Annuler
            </button>
          </div>
        </form>

        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-yellow-400">
            Le nombre d'entrées au parc est limité, n'hésitez pas à réserver vos tickets !
          </p>
        </div>
      </div>

      {showCalendrier && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
          onClick={handleBackdropClick}
        >
          <div className="bg-gray-800 p-4 rounded-lg w-[70%] max-w-2xl max-h-[70vh] overflow-hidden">
            <h2 className="text-2xl font-semibold text-center mb-4">Sélectionnez une date</h2>
            <div className="w-full rounded-md overflow-hidden"> {/* Conteneur du calendrier */}
              <CalendrierPicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                isReservationPage={true} // Active le nombre de personnes et le prix
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={handleCloseCalendrier}
              >
                Fermer
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={handleReserve}
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-warning text-white p-4 rounded-lg shadow-lg z-20">
          <p>Merci de vous connecter pour effectuer une réservation !</p>
        </div>
      )}
    </div>
  );
};
