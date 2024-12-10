import { useState, useEffect } from 'react';
import axios from 'axios';
import { IProfile } from '../@types';
import { MdCheck, MdClose } from 'react-icons/md';

interface FormCreateProfileProps {
  userId: string;
  initialData?: IProfile | null; // Profil initial pour modification ou null
  onProfileCreated: (profile: IProfile) => void; // Callback pour profil créé ou modifié
  onClose: () => void; // Fonction pour fermer le formulaire
  onSubmit: (updatedProfile: IProfile) => Promise<void>; // Fonction pour soumettre le profil mis à jour
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
      'firstName',
      'lastName',
      'phone',
      'address',
      'postalCode',
      'city',
      'birthDate',
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
    if (!birthDate || !/\d{4}-\d{2}-\d{2}/.test(birthDate)) {
      setErrorMessage('La date de naissance est invalide.');
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = 'http://localhost:3000';
      const endpoint = initialData?.id
        ? `${apiUrl}/api/profile/${userId}`
        : `${apiUrl}/api/profile`;

      const method = initialData?.id ? 'put' : 'post';

      const response = await axios[method](endpoint, {
        ...formData,
        birthDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        // Callback pour notifier le parent
        onProfileCreated(response.data.data); // Passe le profil au parent
        alert('Profil créé/modifié avec succès');
      } else {
        setErrorMessage(response.data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
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
      <form onSubmit={handleSubmit} className="bg-[#374151] p-6 rounded-lg shadow-lg max-w-lg mx-auto sm:w-full">
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
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-transparent text-green-600 py-2 px-4 rounded-md hover:bg-green-100 w-full sm:w-auto flex justify-center items-center"
            >
              {isSubmitting ? (
                <span>Soumission...</span>
              ) : (
                <MdCheck size={24} />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-transparent text-red-600 py-2 px-4 rounded-md hover:bg-red-100 w-full sm:w-auto flex justify-center items-center"
            >
              <MdClose size={24} />
            </button>
          </div>




        {errorMessage && (
          <div className="mt-4 text-red-600 text-sm">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};
