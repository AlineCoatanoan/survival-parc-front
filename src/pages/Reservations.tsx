import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { IReservation } from '../@types';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { apiBaseUrl } from 'services/config';

export function Reservations() {
  const { userId } = useParams<{ userId: string }>();
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [reservationToDelete, setReservationToDelete] = useState<number | null>(null);
  const [profileExists, setProfileExists] = useState<boolean>(false); // Vérification du profil

  // Fonction pour vérifier si le profil existe
  const checkProfileExists = useCallback(async () => {
    if (!userId) {
      setError("User ID non trouvé dans l'URL");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${apiBaseUrl}/api/profile/${userId}`);
      if (response.data.success) {
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Erreur lors de la vérification du profil: " + err.message);
      } else {
        setError("Erreur inconnue lors de la vérification du profil.");
      }
      setProfileExists(false);
    }
  }, [userId]);

  // Fonction pour récupérer les réservations de l'utilisateur
  const fetchReservations = useCallback(async () => {
    if (!userId) {
      setError("User ID non trouvé dans l'URL");
      setLoading(false);
      return;
    }

    if (!profileExists) {
      setError("Aucun profil trouvé pour cet utilisateur.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiBaseUrl}/api/reservation/${userId}`);  // Correction ici
      const data = response.data;
      if (data.success) {
        const reservationsWithHotelName = await Promise.all(
          data.data.map(async (reservation: IReservation) => {
            const hotelResponse = await axios.get(`${apiBaseUrl}/api/hotel/${reservation.hotelId}`);
            const hotelName = hotelResponse.data.name;
            return { ...reservation, hotelName };
          })
        );
        setReservations(reservationsWithHotelName);
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération des réservations');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Une erreur s\'est produite lors de la récupération des réservations.');
      } else {
        setError('Erreur inconnue lors de la récupération des réservations.');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, profileExists]);

  // Fonction de suppression de réservation
  const handleDeleteRequest = (reservationId: number) => {
    setReservationToDelete(reservationId);
    setWarning('Cliquez ici pour confirmer la suppression de la réservation');
  };

  const handleDeleteConfirmation = async () => {
    if (!reservationToDelete || !userId) return;

    try {
      const response = await axios.delete(`${apiBaseUrl}/api/reservation/${reservationToDelete}`, {
        data: { userId: userId },
      });

      const data = response.data;
      if (data.success) {
        setReservations(reservations.filter(reservation => reservation.id !== reservationToDelete));
        setWarning('Réservation supprimée avec succès');
      } else {
        throw new Error(data.message || 'Erreur lors de la suppression de la réservation');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Une erreur s\'est produite lors de la suppression de la réservation.');
      } else {
        setError('Erreur inconnue lors de la suppression de la réservation.');
      }
    } finally {
      setReservationToDelete(null);
    }
  };

  useEffect(() => {
    checkProfileExists(); // Vérifier si le profil existe
  }, [checkProfileExists]);

  useEffect(() => {
    if (profileExists) {
      fetchReservations(); // Si le profil existe, récupérer les réservations
    }
  }, [profileExists, fetchReservations]);

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
                  <span className="text-sm text-gray-600">Hôtel: {reservation.hotelName}</span>
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
