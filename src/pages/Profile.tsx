import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres de l'URL
import { useEffect, useState } from 'react'; // Pour gérer l'état et les effets
import { format } from 'date-fns'; // Pour formater les dates
import { IProfile } from '../@types'; // Types de profil

export function Profile() {
  const { userId } = useParams<{ userId: string }>(); // Récupère userId de l'URL
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return; // Si pas de userId dans l'URL, on ne fait pas la requête

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/${userId}`); // Envoi de la requête pour récupérer le profil
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }
        const data = await response.json(); // Récupère les données JSON de l'API
        if (data.success) { // Si la réponse est réussie
          setProfileData(data.data); // On met à jour l'état avec les données de l'utilisateur
        } else {
          throw new Error("Erreur : " + data.message); // Si l'API renvoie un message d'erreur
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Affiche l'erreur si une erreur survient
        } else {
          setError("Une erreur inconnue est survenue");
        }
      } finally {
        setLoading(false); // Arrête de charger une fois la requête terminée
      }
    };

    fetchProfileData(); // Appel à la fonction pour récupérer les données
  }, [userId]); // Cette fonction se réexécute chaque fois que userId change

  if (loading) return <div className="text-center py-10 text-lg">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-lg text-red-500">Erreur: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Mon profil</h1>
        {profileData ? (
          <div>
            <p className="text-xl mb-4">Nom: <span className="font-bold">{profileData.firstName} {profileData.lastName}</span></p>
            <p className="text-xl mb-4">Email: <span className="font-bold">{profileData.userId}</span></p> {/* Vous pouvez remplacer par l'email réel si vous avez cette information */}
            <p className="text-xl mb-4">Téléphone: <span className="font-bold">{profileData.phone}</span></p>
            <p className="text-xl mb-4">Adresse: <span className="font-bold">{profileData.address}</span></p>
            <p className="text-xl mb-4">Code Postal: <span className="font-bold">{profileData.postalCode}</span></p>
            <p className="text-xl mb-4">Ville: <span className="font-bold">{profileData.city}</span></p>
            <p className="text-xl mb-4">Date de naissance: <span className="font-bold">{profileData.birthDate ? format(new Date(profileData.birthDate), 'dd/MM/yyyy') : 'Inconnue'}</span></p>
          </div>
        ) : (
          <div className="text-center text-lg text-red-500">Aucun profil trouvé.</div>
        )}
      </div>
    </div>
  );
}
