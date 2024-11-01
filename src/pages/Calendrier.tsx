import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import 'react-calendar/dist/Calendar.css'; // Styles par défaut pour le calendrier

const horairesOuverture = {
  "2024-11-01": "10h00 - 18h00",
  "2024-11-02": "10h00 - 20h00",
  "2024-11-03": "10h00 - 18h00",
  // Ajoutez d'autres dates et horaires ici
};

export const Calendrier = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const formattedDate = format(date, "yyyy-MM-dd");
  const horaire = horairesOuverture[formattedDate] || "Fermé"; // Récupérer l'horaire ou indiquer "Fermé"

  return (
    <div className="calendrier-container min-h-screen bg-black text-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Calendrier d'Ouverture</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="bg-[#1f2937] text-white rounded-lg p-4 shadow-lg" // Style du calendrier
      />
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">Horaires pour le {formattedDate} :</h2>
        <p className="mt-2 text-lg">{horaire}</p>
      </div>
    </div>
  );
};
