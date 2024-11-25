import { useState, useEffect } from 'react';
import axios from 'axios';
import { IProfile } from '../@types';

interface FormCreateProfileProps {
  userId: string;
  initialData?: IProfile; // initialData est optionnel, utilisé pour la modification du profil
  onProfileCreated: (profile: IProfile) => void; // Fonction callback pour transmettre le profil créé ou modifié
  onClose: () => void;
}

export const FormCreateProfile: React.FC<FormCreateProfileProps> = ({
  userId,
  initialData = {} as IProfile, // Par défaut, initialData est un objet vide si non fourni
  onProfileCreated,
  onClose,
}) => {
  const [formData, setFormData] = useState<IProfile>({
    id: 0,
    userId: parseInt(userId, 10),
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Remplir le formulaire avec les données initiales si elles existent
  useEffect(() => {
    if (initialData?.birthDate) {
      const birthDate = initialData.birthDate.split('T')[0]; // Formatage de la date au format YYYY-MM-DD
      setFormData({
        ...initialData,
        birthDate,
      });
    }
  }, [initialData]);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const requiredFields: (keyof IProfile)[] = [
      'firstName', 'lastName', 'phone', 'address', 'postalCode', 'city', 'birthDate',
    ];

    // Vérification des champs obligatoires
    for (const field of requiredFields) {
      if (typeof formData[field] === 'string' && formData[field].trim() === '') {
        setErrorMessage(`Le champ ${field} est obligatoire.`);
        setIsSubmitting(false);
        return;
      }
    }

    const birthDate = formData.birthDate;
    if (!birthDate || birthDate.trim() === '') {
      setErrorMessage('La date de naissance est obligatoire.');
      setIsSubmitting(false);
      return;
    }

    if (!/\d{4}-\d{2}-\d{2}/.test(birthDate)) {
      setErrorMessage('Le format de la date de naissance est invalide.');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = 'http://localhost:3000';

      // Si initialData existe, nous faisons une requête PUT (modification), sinon une requête POST (création)
      const response = initialData?.id
        ? await axios.put(`${apiUrl}/api/profile/${userId}`, {
            ...formData,
            birthDate,
          }, { headers: { 'Content-Type': 'application/json' } })
        : await axios.post(`${apiUrl}/api/profile/${userId}`, {
            ...formData,
            birthDate,
          }, { headers: { 'Content-Type': 'application/json' } });

      if (response.data.success) {
        // Passer le profil créé ou modifié à onProfileCreated
        onProfileCreated(response.data.data);  // <-- Passer le profil à la fonction
        alert('Profil créé/modifié avec succès');
      } else {
        setErrorMessage(response.data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erreur réseau.');
      } else {
        setErrorMessage('Une erreur inconnue s\'est produite.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 relative">
      <form onSubmit={handleSubmit} className="bg-[#374151] p-6 rounded-lg shadow-lg w-96 mx-auto">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">{initialData?.id ? 'Modifier votre profil' : 'Créer votre profil'}</h2>

        {/* Prénom */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800">Prénom</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Nom */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800">Nom</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Date de naissance */}
        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-800">Date de naissance</label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Téléphone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">Téléphone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Adresse */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-800">Adresse</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Code postal */}
        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-800">Code Postal</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Ville */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-semibold text-gray-800">Ville</label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-[#095F2D] bg-[#1F2937]"
            required
          />
        </div>

        {/* Zone des boutons : Soumettre et Fermer */}
        <div className="flex space-x-4 justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            {isSubmitting ? 'Soumission...' : 'Soumettre'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Fermer
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-600 text-sm">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};
