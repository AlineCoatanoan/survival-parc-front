import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createAccount, loginUser } from '../features/auth/authService'; 
import { RegisterResponse, LoginResponse } from '../features/auth/authService';

interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  setSignUpCredentials: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; email: string; password: string }>>; // Prop modifiée
}

export const SignUpModal = forwardRef<HTMLDivElement, SignUpModalProps>(({ onClose }, ref) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignUpFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<ISignUpFormData> = async (data: ISignUpFormData) => {
    console.log('Form Data:', data);  // Vérifie ce qui est envoyé
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const response: RegisterResponse = await createAccount({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.success) {
        setSuccessMessage("Inscription réussie, bienvenue !");
        localStorage.setItem("isRegistered", "true");

        // Connexion automatique après l'inscription
        const loginResponse: LoginResponse = await loginUser(data.email, data.password);
        if (loginResponse.success) {
          localStorage.setItem("authToken", loginResponse.data.token || '');
          setTimeout(() => {
            onClose(); // Ferme la modal après un délai
          }, 2000);
        } else {
          setError("Erreur de connexion après l'inscription.");
        }
      } else {
        setError(response.message || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription.");
      console.error("Erreur d'inscription:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fermer la modale si on clique en dehors de celle-ci
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    // Ajouter un gestionnaire d'événement lors de l'ouverture de la modale
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyer l'événement lorsqu'on ferme la modale
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50 text-white">
      <motion.div
        ref={(node) => {
          modalRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 rounded-lg p-8 shadow-lg w-96 relative"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-center text-red-500">Rejoignez la Zone de Quarantaine</h2>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-full mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="firstName">
              Prénom
            </label>
            <input
              {...register("firstName", { required: "Ce champ est requis" })}
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
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
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Veuillez entrer une adresse email valide"
                }
              })}
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
              {...register("password", { required: "Ce champ est requis" })}
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              id="password"
              type="password"
              placeholder="Votre mot de passe"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmez le mot de passe
            </label>
            <input
              {...register("confirmPassword", { 
                required: "Ce champ est requis", 
                validate: value => value === password.current || "Les mots de passe ne correspondent pas"
              })}
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              id="confirmPassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "Chargement..." : "S'inscrire"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-400 hover:text-white"
            >
              Fermer
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
});
