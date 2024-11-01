import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { LoginModal } from './LoginModal'; // Assurez-vous que le chemin d'importation est correct
import { SignUpModal } from './SignUpModal'; // Assurez-vous que le chemin d'importation est correct

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const profileIconRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
  
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(target) &&
      profileIconRef.current &&
      !profileIconRef.current.contains(target)
    ) {
      setProfileMenuVisible(false);
    }
  
    if (
      (showLoginModal && !target.closest('.login-modal')) ||
      (showSignupModal && !target.closest('.signup-modal'))
    ) {
      setShowLoginModal(false);
      setShowSignupModal(false);
    }
  }, [profileMenuRef, profileIconRef, showLoginModal, showSignupModal]);
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const ProfileMenu = () => (
    <div
      ref={profileMenuRef}
      className="absolute right-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg z-10"
    >
      <button onClick={() => setShowLoginModal(true)} className="block px-4 py-2 hover:text-[#FF7828]">
        Connexion
      </button>
      <button onClick={() => setShowSignupModal(true)} className="block px-4 py-2 hover:text-[#FF7828]">
        Inscription
      </button>
    </div>
  );

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
          {/* Navigation Links */}
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
                  <Link to="/cinema" className="block hover:text-[#FF7828]">Cinéma</Link>
                  <Link to="/escape" className="block hover:text-[#FF7828]">Escape Game</Link>
                </div>
              </div>
            )}
          </div>

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
                  <Link to="/acces" className="block hover:text-[#FF7828]">Accès</Link>
                </div>
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleMouseEnter('reservations')}
            className="relative group"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="hover:text-[#FF78228] cursor-pointer"
            >
              <h1 className="mx-6">Réservations</h1>
            </motion.div>
            {activeMenu === 'reservations' && (
              <div
                className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/reservations" className="block hover:text-[#FF78228]">pass hotel + parc</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <div ref={profileIconRef} className="relative">
            <button
              className="flex items-center hover:text-[#FF7828]"
              onClick={toggleProfileMenu}
            >
              <FaRegUser className="text-2xl" />
            </button>
            {profileMenuVisible && <ProfileMenu />}
          </div>
          <Link to="/panier" className="flex items-center hover:text-[#FF7828]">
            <FiShoppingCart className="text-2xl" />
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showSignupModal && <SignUpModal onClose={() => setShowSignupModal(false)} />}
    </header>
  );
};
