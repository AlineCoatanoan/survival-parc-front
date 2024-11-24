import { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { SignUpModal } from '../components/SignUpModal';
import { useAuth } from '../features/auth/authContext';
import { useNavigate } from 'react-router-dom';

export const FixedModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [signUpCredentials, setSignUpCredentials] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const { loginUser, logoutUser, registerUser, isAuthenticated, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Authentification mise à jour:", isAuthenticated);
  }, [isAuthenticated]);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };

  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false);
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
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleGoToProfile = () => {
    navigate(`/mon-compte/${userId}`);
  };

  return (
    <div className="fixed bottom-4 inset-x-0 sm:inset-auto sm:right-4 sm:top-40 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10 mx-auto w-11/12 max-w-md sm:w-auto">
      {!isAuthenticated ? (
        <>
          <button
            onClick={openLoginModal}
            className="block w-full py-2 px-4 mb-2 text-center bg-[#FF7828] hover:bg-[#FF7828]-focus rounded text-white"
          >
            Connexion
          </button>
          <button
            onClick={openSignupModal}
            className="block w-full py-2 px-4 text-center bg-[#075D2C] hover:bg-[#075D2C]-focus rounded text-white"
          >
            Inscription
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="block w-full py-2 px-4 mb-2 text-center bg-[#075D2C] hover:bg-primary-focus rounded text-white"
          >
            Déconnexion
          </button>
          <button
            onClick={handleGoToProfile}
            className="block w-full py-2 px-4 text-center bg-[#FF7828] hover:bg-secondary-focus rounded text-white"
          >
            Mon compte
          </button>
        </>
      )}

      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
          setLoginCredentials={setLoginCredentials}
        />
      )}

      {isSignupModalOpen && (
        <SignUpModal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          onSuccess={handleSignUpSuccess}
          setSignUpCredentials={setSignUpCredentials}
        />
      )}
    </div>
  );
};
