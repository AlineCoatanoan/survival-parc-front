import React from 'react';

export const Calendrier: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-800 text-white min-h-screen pt-[200px]">
      <h1 className="text-4xl font-bold mb-6 animate-bounce">
        Calendrier d'ouverture du parc
      </h1>
      <div className="flex flex-col w-full max-w-5xl shadow-lg bg-gray-900 rounded-lg overflow-hidden">
        {/* Contenu principal */}
        <div className="flex-grow bg-gray-800 p-6 space-y-6">
          {/* Période Basse Saison */}
          <section className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Période Basse Saison
            </h2>
            <h3 className="text-lg font-semibold mb-2">
              Vacances scolaires Zone B et week-ends avec jours fériés
            </h3>
            <ul className="space-y-2">
              <li>✔ Ouverture : 10h00 - 18h00</li>
              <li>✔ Week-ends prolongés et jours fériés : 09h30 - 19h00</li>
            </ul>
          </section>

          {/* Parc Fermé */}
          <section className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Parc Fermé</h2>
            <ul className="space-y-2">
              <li>🚫 Lundi 31 mars 2024 et mardi 1er avril 2024</li>
              <li>🚫 Les lundis et mardis, du 1er septembre au 14 octobre inclus</li>
            </ul>
          </section>

          {/* Hors Saison */}
          <section className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Hors Saison</h2>
            <ul className="space-y-2">
              <li>🕒 Fermé du 12 novembre 2024 au 25 mars 2025</li>
              <li>🕒 Fermé du 2 novembre 2025 au 31 décembre 2025</li>
            </ul>
          </section>

          {/* Note */}
          <section className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-500 mb-2">Note importante</h3>
            <p className="text-sm">
              Les horaires peuvent être sujets à modification en cas
              d'événements exceptionnels ou de conditions météorologiques.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
