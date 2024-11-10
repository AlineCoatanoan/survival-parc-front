import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Reservation {
  id: string;
  description: string;
  price: number;
}

export function Reservations() {
  const { userId } = useParams<{ userId: string }>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('userId:', userId); // Vérifie si userId est correct

    if (!userId) {
      setError('User ID non trouvé dans l\'URL');
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/reservation/${userId}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Données récupérées : ", data); // Vérifier ce qui est retourné

        if (data.success) {
          setReservations(data.data); // Assurez-vous que 'data.data' contient les réservations
        } else {
          throw new Error(`Erreur : ${data.message}`);
        }
      } catch (err: unknown) {
        setError((err as Error).message || 'Une erreur s\'est produite lors de la récupération des réservations.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  if (loading) return <div className="text-center text-lg text-gray-600">Chargement...</div>;
  if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Mes réservations</h1>

      {reservations.length > 0 ? (
        <ul className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4 space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg hover:bg-gray-200">
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">{reservation.description}</span>
                <span className="text-gray-500 text-sm">
                  {new Date().toLocaleDateString()} {/* Example for showing current date */}
                </span>
              </div>
              <span className="text-xl font-semibold text-gray-800">{reservation.price} €</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 mt-4">Aucune réservation trouvée</p>
      )}
    </div>
  );
}
