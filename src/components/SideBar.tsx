import React, { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { SignUpModal } from '../components/SignUpModal';
import { useAuth } from '../features/auth/authContext';
import { useNavigate } from 'react-router-dom';

export const FixedModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  // Définir les états pour loginCredentials et signUpCredentials
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [signUpCredentials, setSignUpCredentials] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const { loginUser, logoutUser, registerUser, isAuthenticated, userId } = useAuth();
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger

  useEffect(() => {
    console.log("Authentification mise à jour:", isAuthenticated);
  }, [isAuthenticated]);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false); // Fermer la modal d'inscription si elle est ouverte
  };

  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false); // Fermer la modal de connexion si elle est ouverte
  };

  const closeSignupModal = () => setSignupModalOpen(false);

  const handleLoginSuccess = () => {
    const { email, password } = loginCredentials;

    if (!email || !password) {
      console.error("Erreur : Email et mot de passe sont requis");
      return;
    }

    loginUser(email, password)
      .then(() => {
        closeLoginModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  };

  const handleSignUpSuccess = () => {
    const { firstName, lastName, email, password } = signUpCredentials;

    registerUser(firstName, lastName, email, password)
      .then(() => {
        closeSignupModal();
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
      });
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Redirection vers la page d'accueil après la déconnexion
      navigate('/'); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleGoToProfile = () => {
    // Rediriger vers la page du profil avec l'ID utilisateur
    navigate(`/mon-compte/${userId}`);
  };

  return (
    <div className="fixed right-4 bottom-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10">
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
            onClick={handleGoToProfile} // Appel à la fonction de redirection vers le profil
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
          setLoginCredentials={setLoginCredentials} // Passage de setLoginCredentials pour gérer les modifications d'email et password
        />
      )}

      {/* Modale d'Inscription */}
      {isSignupModalOpen && (
        <SignUpModal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          onSuccess={handleSignUpSuccess} // Appel sans paramètres, juste la fonction de succès
          setSignUpCredentials={setSignUpCredentials} // Passage de setSignUpCredentials pour gérer les modifications d'email, password, etc.
        />
      )}
    </div>
  );
};
