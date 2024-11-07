import React, { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { SignUpModal } from '../components/SignUpModal';
import { useAuth } from '../features/auth/authContext'; // Assurez-vous que le chemin est correct

export const FixedModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [signUpCredentials, setSignUpCredentials] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const { loginUser, logoutUser, registerUser, isAuthenticated } = useAuth(); // Assurez-vous que setIsAuthenticated est inclus

  // Suivi de l'état de l'authentification
  useEffect(() => {
    console.log("Authentification mise à jour:", isAuthenticated);  // Debug
  }, [isAuthenticated]);

  // Fonction pour ouvrir la modale de connexion
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false); // Fermer la modal d'inscription si elle est ouverte
  };

  // Fonction pour fermer la modale de connexion
  const closeLoginModal = () => setLoginModalOpen(false);

  // Fonction pour ouvrir la modale d'inscription
  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false); // Fermer la modal de connexion si elle est ouverte
  };

  // Fonction pour fermer la modale d'inscription
  const closeSignupModal = () => setSignupModalOpen(false);

  // Lorsqu'un utilisateur se connecte
  const handleLoginSuccess = () => {
    const { email, password } = loginCredentials;
    loginUser(email, password)
      .then(() => {
        setIsAuthenticated(true);  // Mettez à jour l'authentification après la connexion
        closeLoginModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  };

  // Lorsqu'un utilisateur s'inscrit et se connecte immédiatement
  const handleSignUpSuccess = () => {
    const { firstName, lastName, email, password } = signUpCredentials;
    registerUser(firstName, lastName, email, password)
      .then(() => {
        setIsAuthenticated(true);  // Mettez à jour l'authentification après l'inscription
        closeSignupModal();
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
      });
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      await logoutUser(); // Utilisez la fonction du context pour déconnecter l'utilisateur
      setIsAuthenticated(false); // Mettez à jour l'authentification lors de la déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div className="fixed right-4 bottom-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10">
      {/* Vérification de l'état d'authentification et affichage des boutons correspondants */}
      {!isAuthenticated ? (
        <>
          <button
            onClick={openLoginModal}
            className="block w-full py-2 px-4 mb-2 text-center bg-primary hover:bg-primary-focus rounded text-white"
          >
            Connexion
          </button>
          <button
            onClick={openSignupModal}
            className="block w-full py-2 px-4 text-center bg-secondary hover:bg-secondary-focus rounded text-white"
          >
            Inscription
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="block w-full py-2 px-4 mb-2 text-center bg-primary hover:bg-primary-focus rounded text-white"
          >
            Déconnexion
          </button>
          <button
            onClick={() => console.log("Accéder au profil")}
            className="block w-full py-2 px-4 text-center bg-secondary hover:bg-secondary-focus rounded text-white"
          >
            Mon compte
          </button>
        </>
      )}

      {/* Modale de Connexion */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess} // Appel sans paramètres, juste la fonction de succès
        />
      )}

      {/* Modale d'Inscription */}
      {isSignupModalOpen && (
        <SignUpModal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          onSuccess={handleSignUpSuccess} // Appel sans paramètres, juste la fonction de succès
        />
      )}
    </div>
  );
};
