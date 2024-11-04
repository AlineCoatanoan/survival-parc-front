import { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createAccount } from '../features/auth/authService'; 
import { RegisterResponse } from '../features/auth/authService';

interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpModalProps {
  onClose: () => void;
}

export const SignUpModal = forwardRef<HTMLDivElement, SignUpModalProps>(({ onClose }, ref) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignUpFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const password = useRef({});
  password.current = watch("password", "");

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const onSubmit: SubmitHandler<ISignUpFormData> = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null); 
  
    try {
      const response: RegisterResponse = await createAccount({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
  
      if (response.success) {
        if (response.data && response.data.user) {
          setSuccessMessage("Inscription réussie, bienvenue !");
          console.log("Inscription réussie, ID utilisateur:", response.data.user.id);
          setTimeout(onClose, 2000); 
        } else {
          setError("L'utilisateur a été créé, mais aucune donnée n'a été retournée.");
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
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
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
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
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email invalide"
                }
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

          <button
            type="submit"
            className="bg-slate-50 text-stone-950 hover:bg-[#B4C636] font-semibold w-full py-2 px-4 my-4 rounded transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Inscription..." : "Valider"}
          </button>
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
});

SignUpModal.displayName = 'SignUpModal';
