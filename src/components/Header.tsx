import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LoginModal } from './LoginModal'; 
import { SignUpModal } from './SignUpModal'

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre si l'utilisateur est connecté
  const loginModalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleLogout = () => {
    // Logique de déconnexion ici
    console.log('Déconnexion réussie');
    setIsLoggedIn(false); // Met à jour l'état de connexion
    navigate('/'); // Redirige vers la page d'accueil
  };
  
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // Ferme la modale de connexion si le clic est à l'extérieur
    if (
      showLoginModal &&
      loginModalRef.current &&
      !loginModalRef.current.contains(target)
    ) {
      setShowLoginModal(false);
    }
  }, [showLoginModal, loginModalRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Fonction pour gérer le succès de la connexion
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Mettre à jour l'état de connexion
    setShowLoginModal(false); // Fermer la modale
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white py-4 shadow-lg z-20">
      <div className="absolute inset-x-0 top-[-30px] flex items-center justify-start p-3 z-10">
        <Link to="/" className="block">
          <img
            src="./src/assets/images/logo.png"
            alt="Survival Parc Logo"
            className="w-[250px] h-auto"
          />
        </Link>
      </div>

      <div className="container mx-auto flex justify-between items-center px-4 pt-4 max-w-screen-xl relative z-20">
        <nav className="flex items-center justify-center space-x-8 flex-grow">
          {/* Menu des attractions */}
          <div
            onMouseEnter={() => handleMouseEnter('attractions')}
            className="relative group"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hover:text-[#FF7828] cursor-pointer"
            >
              <h1 className="mx-6">Animations du parc</h1>
            </motion.div>
            {activeMenu === 'attractions' && (
              <div
                className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/attractions" className="block hover:text-[#FF7828]">Attractions</Link>
                  <Link to="/labyrinthe" className="block hover:text-[#FF7828]">Labyrinthe</Link>
                  <Link to="/cinema" className="block hover:text-[#FF78228]">Cinéma</Link>
                  <Link to="/escape" className="block hover:text-[#FF78228]">Escape Game</Link>
                </div>
              </div>
            )}
          </div>

          {/* Menu des hôtels */}
          <div
            onMouseEnter={() => handleMouseEnter('hotels')}
            className="relative group"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hover:text-[#FF7828] cursor-pointer"
            >
              <h1 className="mx-6">Hotels</h1>
            </motion.div>
            {activeMenu === 'hotels' && (
              <div
                className="absolute left-0 mt-2 w-60 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/refuge" className="block hover:text-[#FF7828]">Hôtel Le refuge des survivants</Link>
                  <Link to="/postapo" className="block hover:text-[#FF7828]">Hôtel Post-Apocalyptique</Link>
                </div>
              </div>
            )}
          </div>

          {/* Menu des infos pratiques */}
          <div
            onMouseEnter={() => handleMouseEnter('infos')}
            className="relative group"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hover:text-[#FF7828] cursor-pointer"
            >
              <h1 className="mx-6">Infos pratiques</h1>
            </motion.div>
            {activeMenu === 'infos' && (
              <div
                className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/plan" className="block hover:text-[#FF7828]">Plan du parc</Link>
                  <Link to="/calendrier" className="block hover:text-[#FF7828]">Dates et horaires d'ouverture</Link>
                  <Link to="/acces" className="block hover:text-[#FF78228]">Accès</Link>
                </div>
              </div>
            )}
          </div>

          {/* Menu des réservations */}
          <div
            onMouseEnter={() => handleMouseEnter('reservations')}
            className="relative group"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="hover:text-[#FF7828] cursor-pointer"
            >
              <h1 className="mx-6">Réservations</h1>
            </motion.div>
            {activeMenu === 'reservations' && (
              <div
                className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/mes-reservations" className="block hover:text-[#FF78228]">Mes réservations</Link>
                  <Link to="/annuler" className="block hover:text-[#FF78228]">Annuler une réservation</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center">
          <Link to="/panier" className="relative z-10">
            <FiShoppingCart className="text-2xl" />
          </Link>

          {/* Liens de profil */}
          {isLoggedIn ? (
            <>
              <Link to="/mon-compte" className="ml-6 hover:text-[#FF7828]">
                Mon compte
              </Link>
              <button onClick={handleLogout} className="ml-2 hover:text-[#FF7828]">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setShowLoginModal(true)} className="ml-6 hover:text-[#FF7828]">
                Connexion
              </button>
              <button onClick={() => setShowSignUpModal(true)} className="ml-6 hover:text-[#FF7828]">
                Inscription
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal de connexion */}
      {showLoginModal && (
        <LoginModal 
          onLoginSuccess={handleLoginSuccess} 
          onClose={() => setShowLoginModal(false)} // Passer la fonction pour fermer la modale
        />
      )}

      {/* Modal d'inscription */}
      {showSignUpModal && (
        <SignUpModal 
          onClose={() => setShowSignUpModal(false)} // Passer la fonction pour fermer la modale
        />
      )}
    </header>
  );
};
