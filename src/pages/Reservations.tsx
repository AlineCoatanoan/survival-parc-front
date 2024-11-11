import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { IReservation } from '../@types'; // Assure-toi de mettre le bon chemin

export function Reservations() {
  const { userId } = useParams<{ userId: string }>();
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    if (!userId) {
      setError("User ID non trouvé dans l'URL");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3000/api/reservation/${userId}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setReservations(data.data as IReservation[]); // Type assertion pour s'assurer que data.data est bien un tableau de IReservation
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération des réservations');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Une erreur s\'est produite lors de la récupération des réservations.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  if (loading) return <div className="text-center text-lg text-gray-600">Chargement...</div>;
  if (error) return (
    <div className="text-center text-lg text-red-500">
      {error}
      <button onClick={fetchReservations} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Mes réservations</h1>
      
      {reservations.length > 0 ? (
        <>
          <button onClick={fetchReservations} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Actualiser
          </button>
          <ul className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4 space-y-4">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg hover:bg-gray-200">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">{reservation.description}</span>
                  <span className="text-gray-500 text-sm">
                    {reservation.startDate ? new Date(reservation.startDate).toLocaleDateString() : 'Date inconnue'} - 
                    {reservation.endDate ? new Date(reservation.endDate).toLocaleDateString() : 'Date inconnue'}
                  </span>
                  <span className="text-gray-500 text-sm">{reservation.nights} nuit(s) pour {reservation.person} personne(s)</span>
                </div>
                <span className="text-xl font-semibold text-gray-800">{reservation.price} €</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-lg text-gray-600 mt-4">Aucune réservation trouvée</p>
      )}
    </div>
  );
}
