import React, { useState } from 'react';
import { CalendrierPicker } from '../components/CalendarTicket'; // Utilisation de CalendrierPicker au lieu de Calendrier

// Définir un type pour la réservation
interface Reservation {
  numberOfPeople: number;
  selectedDate: Date | [Date | null, Date | null] | null;
  totalPrice: number;
}

export const Ticket = () => {
  const [showCalendrier, setShowCalendrier] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | [Date | null, Date | null] | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Reservation[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [pricePerPerson, setPricePerPerson] = useState(25); // État pour gérer le prix par personne

  // Fonction pour ajouter une réservation au panier
  const addToCart = (reservation: Reservation) => {
    setCart((prevCart) => [...prevCart, reservation]);
  };

  // Fonction de gestion de la fermeture de la modale et de la réservation
  const handleReserve = () => {
    // Si l'utilisateur n'est pas authentifié, afficher l'alerte
    if (!isAuthenticated) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }
  
    // Vérification de la validité de la date
    if (!selectedDate || (Array.isArray(selectedDate) && !selectedDate[0])) {
      console.log('Veuillez sélectionner une date valide.');
      return;
    }
  
    const reservation: Reservation = {
      numberOfPeople,
      selectedDate,
      totalPrice: numberOfPeople * pricePerPerson,
    };
  
    addToCart(reservation);
    handleCloseCalendrier();
  };

  const handleShowCalendrier = (price: number) => {
    setPricePerPerson(price); // Mettez à jour le prix par personne
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

  const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(date)) {
      // Si un tableau de 2 dates est sélectionné (plage de dates)
      setSelectedDate(date);
    } else {
      // Sinon, une seule date sélectionnée
      setSelectedDate(date);
    }
  };

  // Fonction pour formater la date
  const formatSelectedDate = (date: Date | [Date | null, Date | null] | null) => {
    if (!date) return 'Aucune date sélectionnée';
    if (Array.isArray(date)) {
      // Si une plage de dates est sélectionnée
      const start = date[0] ? date[0].toLocaleDateString() : '';
      const end = date[1] ? date[1].toLocaleDateString() : '';
      return `${start} - ${end}`;
    }
    // Si une seule date est sélectionnée
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white p-6 pt-[200px]">
      <h1 className="text-4xl font-bold text-center mb-6">Billetterie</h1>
      <p className="text-center text-lg mb-6">
        Retrouvez nos offres disponibles en ligne et/ou en caisse pour une exploration adaptée à vos besoins !
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Réservation 1 jour */}
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
              className="bg-[#075D2C] hover:bg-[#075D2C] text-white py-2 px-4 rounded-md w-full max-w-[48%]"
              onClick={() => handleShowCalendrier(25)} // Définit le prix à 25
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

        {/* Réservation 2 jours */}
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
              className="bg-[#075D2C] hover:bg-[#075D2C] text-white py-2 px-4 rounded-md w-full max-w-[48%]"
              onClick={() => handleShowCalendrier(40)} // Définit le prix à 40
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

      {/* Modale de sélection de date */}
      {showCalendrier && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
          onClick={handleBackdropClick}
        >
          <div className="bg-gray-800 p-4 rounded-lg w-[70%] max-w-2xl max-h-[70vh] overflow-hidden">
            <h2 className="text-2xl font-semibold text-center mb-4">Sélectionnez une date</h2>
            <div className="w-full rounded-md overflow-hidden">
              <CalendrierPicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                isReservationPage={true}
                pricePerPerson={pricePerPerson}
                hotelId={1} // Remplacez `1` par l'ID de l'hôtel réel si disponible
              />
            </div>
            {/* Afficher les dates sélectionnées */}
            <div className="mt-4 text-center">
              <p className="text-lg text-white">
                <strong>Date(s) sélectionnée(s): </strong> {formatSelectedDate(selectedDate)}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={handleCloseCalendrier}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
