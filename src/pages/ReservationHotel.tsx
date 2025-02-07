import React, { useState, useEffect } from "react";
import axios from "axios";
import { IHotel, IPass } from "../@types";
import { CalendarPass } from "../components/CalendarHotel";
import { apiBaseUrl } from "../services/config";

export const ReservationHotel = () => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [hotelId, setHotelId] = useState<number | null>(null); 
  const [selectedReservationHotel, setSelectedReservationHotel] = useState<IPass | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [showModal, setShowModal] = useState(false);
  const [calendarPrice, setCalendarPrice] = useState(80);
  const [hotelName, setHotelName] = useState<string>("");

  // Fetch des hôtels depuis l'API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/hotel`);
        setHotels(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des hôtels", error);
      }
    };
    fetchHotels();
  }, []);

  const handlePassSelection = (pass: IPass, price: number, hotelName: string, hotelId: number) => {
    console.log("Sélection du pass :", pass);
    console.log("Prix défini :", price);
    console.log("Nom de l'hôtel défini :", hotelName);

    setSelectedReservationHotel(pass);
    setCalendarPrice(price); // Définir le prix du calendrier
    setHotelName(hotelName); // Nom de l'hôtel
    setHotelId(hotelId); // Enregistrer l'ID de l'hôtel
    setShowModal(true); // Ouvrir la modale

    // Ajout d'un console.log pour vérifier l'état après mise à jour
    console.log("Hotel ID après sélection:", hotelId);
    console.log("Pass sélectionné après mise à jour:", selectedReservationHotel);
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    console.log("Dates sélectionnées :", dates);
    setSelectedDateRange(dates || [null, null]);
  };

  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  const handleReservationSubmit = async () => {
    if (hotelId && selectedReservationHotel && selectedDateRange[0] && selectedDateRange[1]) {
      try {
        const reservationData = {
          hotelId,
          passId: selectedReservationHotel.id,
          startDate: selectedDateRange[0],
          endDate: selectedDateRange[1],
        };

        await axios.post(`${apiBaseUrl}/api/reservation`, reservationData);
        console.log("Réservation réussie !");
        setShowModal(false); // Fermer la modale après la soumission
      } catch (error) {
        console.error("Erreur de réservation", error);
      }
    } else {
      console.log("Données manquantes pour la réservation");
    }
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen p-6" style={{ paddingTop: "210px" }}>
      <h1 className="text-3xl font-bold text-center mb-8">Choisissez votre Pass</h1>

      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <form key={hotel.id} className="bg-gray-800 p-8 rounded-lg shadow-lg mb-6 w-10/12 mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{hotel.name}</h2>
              <span className="bg-red-500 text-white text-sm py-1 px-3 rounded-full">Réservez tout de suite et payez en caisse</span>
            </div>

            <div className="text-lg mb-6">
              <p><strong>Prix:</strong> {hotel.priceByNight ? `${hotel.priceByNight}€ par personne` : "Prix non disponible"}</p>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
                onClick={() =>
                  handlePassSelection(
                    { id: hotel.id, name: hotel.name, description: hotel.description, price: Number(hotel.priceByNight) || 0 },
                    index === 0 ? 80 : 60,
                    hotel.name,
                    hotel.id // Passer l'ID ici
                  )
                }
              >
                Réserver Maintenant
              </button>

              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md w-full max-w-[48%]"
                onClick={() => setSelectedReservationHotel(null)}
              >
                Annuler
              </button>
            </div>
          </form>
        ))
      ) : (
        <p>Chargement des hôtels...</p>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeModal}
        >
          <div className="bg-white p-6 rounded-lg max-w-[1000px] mx-auto mt-24">
            <h3 className="text-2xl mb-4">Choisir la plage de dates pour {hotelName}</h3>
            <CalendarPass
              selectedDate={selectedDateRange}
              handleDateChange={handleDateChange}
              isReservationPage={true}
              pricePerNight={calendarPrice}
              hotelName={hotelName}  // Le nom de l'hôtel est transmis ici
            />

            <button
              type="button"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={handleReservationSubmit} // Soumettre la réservation
            >
              Confirmer la réservation
            </button>

            <button
              type="button"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setShowModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
