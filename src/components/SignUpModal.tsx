import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Définition des types pour les props
interface SignUpModalProps {
  onClose: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Utilisation de useCallback pour mémoriser handleClickOutside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      event.stopPropagation(); // Empêche la propagation de l'événement
      onClose(); // Fermer la modale si on clique en dehors
    }
  }, [onClose]); // Ajouter onClose comme dépendance

  useEffect(() => {
    // Ajouter l'écouteur d'événements
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Nettoyer l'écouteur d'événements à la désinstallation du composant
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]); // Ajouter handleClickOutside comme dépendance

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Remplacez cette URL par celle de votre API d'inscription
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Inscription réussie, vous pouvez éventuellement récupérer un token ou les informations de l'utilisateur ici
        onClose(); // Fermer la modale
        navigate('/profile'); // Rediriger vers la page de profil
      } else {
        // Gérer les erreurs ici (afficher un message, etc.)
        console.error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className="block mb-2 w-full border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="block mb-2 w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="block mb-4 w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-[#FF7828] text-white py-2 rounded">
            S'inscrire
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Fermer
        </button>
      </motion.div>
    </div>
  );
};
