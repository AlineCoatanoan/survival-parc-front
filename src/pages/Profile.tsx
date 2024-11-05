import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  name: string;
  email: string;
}

export function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Une erreur inconnue est survenue');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Mon compte pour l'utilisateur ID: {userId}</h1>
      {userData && (
        <div>
          <p>Nom: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
}
