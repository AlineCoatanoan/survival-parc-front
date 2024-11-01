import { motion } from 'framer-motion';
import { useEffect, useRef, useCallback } from 'react';

// Définition des types pour les props
interface LoginModalProps {
  onClose: () => void; // onClose est une fonction qui ne prend aucun argument et ne retourne rien
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Utilisation de useCallback pour mémoriser la fonction
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fermer la modale si on clique en dehors
    }
  }, [onClose]);

  useEffect(() => {
    // Ajouter l'écouteur d'événements
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Nettoyer l'écouteur d'événements à la désinstallation du composant
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]); // Inclure handleClickOutside dans les dépendances

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Connexion</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="block mb-2 w-full border rounded p-2"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="block mb-4 w-full border rounded p-2"
            required
          />
          <button type="submit" className="w-full bg-[#FF7828] text-white py-2 rounded">
            Se connecter
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Fermer
        </button>
      </motion.div>
    </div>
  );
};
