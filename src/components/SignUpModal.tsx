import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignUpFormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialisez useNavigate

  const modalRef = useRef<HTMLDivElement | null>(null);
  const password = useRef({});
  password.current = watch("password", "");

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fermer la modale si on clique en dehors
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFormSubmit = async (data: ISignUpFormData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/user/register', { // Utilisez la route /register
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Inscription réussie
        navigate('/profile'); // Redirection vers la page de profil
      } else {
        // Gestion des erreurs, par exemple en affichant un message
        const errorData = await response.json();
        console.error('Erreur d\'inscription:', errorData.message);
      }
    } catch (error) {
      console.error('Erreur de connexion au serveur:', error);
    } finally {
      setLoading(false);
      // Si l'inscription échoue, vous pouvez décider de garder la modale ouverte
      // ou la fermer ici, selon votre logique de gestion des erreurs
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="firstName">
              Prénom
            </label>
            <input
              {...register("firstName", { required: "Ce champ est requis" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? 'border-red-500' : ''}`}
              id="firstName"
              type="text"
              placeholder="Votre prénom"
            />
            {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="lastName">
              Nom
            </label>
            <input
              {...register("lastName", { required: "Ce champ est requis" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? 'border-red-500' : ''}`}
              id="lastName"
              type="text"
              placeholder="Votre nom"
            />
            {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { 
                required: "Ce champ est requis", 
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Email invalide" }
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              type="email"
              placeholder="Votre email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              {...register("password", { required: "Ce champ est requis", minLength: { value: 6, message: "Le mot de passe doit contenir au moins 6 caractères" } })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              placeholder="Votre mot de passe"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>
            <input
              {...register("confirmPassword", { 
                required: "Ce champ est requis", 
                validate: value => value === password.current || "Les mots de passe ne correspondent pas" 
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : ''}`}
              id="confirmPassword"
              type="password"
              placeholder="Confirmer votre mot de passe"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-slate-50 text-stone-950 hover:bg-[#B4C636] font-semibold w-full py-2 px-4 my-4 rounded transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Inscription..." : "Valider"}
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-red-500 hover:text-red-700"
        >
          Fermer
        </button>
      </motion.div>
    </div>
  );
};

export default SignUpModal;
