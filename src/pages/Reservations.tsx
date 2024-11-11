import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { IReservation } from '../@types';
import { FaTrashAlt } from 'react-icons/fa';

export function Reservations() {
  const { userId } = useParams<{ userId: string }>();
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [reservationToDelete, setReservationToDelete] = useState<number | null>(null);

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
        setReservations(data.data as IReservation[]);
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération des réservations');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Une erreur s\'est produite lors de la récupération des réservations.');
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  

  const handleDeleteRequest = (reservationId: number) => {
    setReservationToDelete(reservationId);
    setWarning('Cliquez ici pour confirmer la suppression de la réservation');
  };

  const handleDeleteConfirmation = async () => {
    if (!reservationToDelete || !userId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/reservation/${reservationToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      });

      const data = await response.json();
      if (data.success) {
        setReservations(reservations.filter(reservation => reservation.id !== reservationToDelete));
        setWarning('Réservation supprimée avec succès');
      } else {
        throw new Error(data.message || 'Erreur lors de la suppression de la réservation');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Une erreur s\'est produite lors de la suppression de la réservation.');
    } finally {
      setReservationToDelete(null);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  if (loading) return <div className="text-center text-lg text-gray-600">Chargement...</div>;
  if (error) return (
    <div className="text-center text-lg text-red-500">
      <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
      <button onClick={fetchReservations} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 pt-40">

    <h1 className="text-3xl font-semibold text-gray-800 mb-6 mx-auto w-fit">Mes réservations</h1>


      {warning && (
        <div
          onClick={handleDeleteConfirmation}
          className="cursor-pointer p-4 mb-4 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
        >
          {warning}
        </div>
      )}

      {/* Section pour les tickets sans hôtels */}
      <div className="ml-0">
  <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10 mr-2 ml-60">Tickets sans hôtels</h2>
  {reservations.length > 0 ? (
    <ul className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 space-y-4">
      {reservations.map((reservation) => (
        <li key={reservation.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg hover:bg-gray-200">
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">{reservation.description}</span>
            <span className="text-gray-500 text-sm">
              {reservation.startDate ? new Date(reservation.startDate).toLocaleDateString() : 'Date inconnue'} - 
              {reservation.endDate ? new Date(reservation.endDate).toLocaleDateString() : 'Date inconnue'}
            </span>
            <span className="text-gray-500 text-sm">
              {reservation.person} personne(s)
              {reservation.isHotelIncluded === false && " (Ticket sans hôtel)"}
            </span>
          </div>
          <span className="text-xl font-semibold text-gray-800">{reservation.price} €</span>
          <button onClick={() => handleDeleteRequest(reservation.id)} className="text-red-500 hover:text-red-700">
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-lg text-gray-600 mt-4">Aucune réservation trouvée</p>
  )}
</div>





    </div>
  );
}
