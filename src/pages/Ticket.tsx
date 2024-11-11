import React, { useState } from 'react';
import { CalendrierPicker } from '../components/CalendarTicket';

interface Reservation {
  numberOfPeople: number;
  selectedDate: Date | null;
  totalPrice: number;
  ticketType: string; // Ajout d'un type de ticket (1 jour ou 2 jours)
}

export const Ticket = () => {
  const [showCalendrier, setShowCalendrier] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Reservation[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [pricePerPerson, setPricePerPerson] = useState(25);
  const [ticketType, setTicketType] = useState('1 Jour'); // État pour gérer le type de ticket

  const addToCart = (reservation: Reservation) => {
    setCart((prevCart) => [...prevCart, reservation]);
  };

  const handleReserve = () => {
    if (!isAuthenticated) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    if (!selectedDate || (Array.isArray(selectedDate) && selectedDate.some(date => isNaN(date.getTime())))) {
      console.log('Veuillez sélectionner une date valide.');
      return;
    }

    const reservation: Reservation = {
      numberOfPeople,
      selectedDate,
      totalPrice: numberOfPeople * pricePerPerson,
      ticketType, // Inclure le type de ticket dans la réservation
    };

    addToCart(reservation);
    handleCloseCalendrier();
  };

  const handleShowCalendrier = (price: number, type: string) => {
    setPricePerPerson(price);
    setTicketType(type); // Mettez à jour le type de ticket
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
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
              onClick={() => handleShowCalendrier(25, '1 Jour')} // Définit le prix à 25 et le type de ticket à 1 Jour
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
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
              onClick={() => handleShowCalendrier(40, '2 Jours')} // Définit le prix à 40 et le type de ticket à 2 Jours
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
              />
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
