import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/authContext'; // Assurez-vous que le chemin est correct

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: () => void;
  onClose: () => void;
  setLoginCredentials: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>; // Prop modifiée
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onClose, setLoginCredentials }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useAuth();  // Utilisation de loginUser au lieu de login

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Email et mot de passe sont requis");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { success, message, data } = response.data;

      if (success) {
        const token = data.token;

        localStorage.setItem('authToken', token);

        // Mettre à jour le contexte d'authentification
        loginUser(email, password);  // Utilisation de loginUser ici

        onLoginSuccess();  // Appel de la fonction de succès
      } else {
        console.error("Erreur de connexion:", message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setLoginCredentials((prev) => ({ ...prev, email: newEmail }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setLoginCredentials((prev) => ({ ...prev, password: newPassword }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Mot de passe" 
            required 
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button 
            type="submit" 
            className="w-full bg-[#BF2D6E] text-white py-2 rounded hover:bg-[#FF7828] transition"
          >
            Se connecter
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
          >
            Fermer
          </button>
        </form>
      </div>
    </div>
  );
};
