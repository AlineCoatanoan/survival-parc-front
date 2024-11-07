import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };



  const toggleSearch = () => {
    setShowSearch(!showSearch);
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
                  <Link to="/cinema" className="block hover:text-[#FF7828]">Cinéma</Link>
                  <Link to="/escape" className="block hover:text-[#FF7828]">Escape Game</Link>
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
              <h1 className="mx-6">Hôtels</h1>
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
                  <Link to="/acces" className="block hover:text-[#FF7828]">Accès</Link>
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
                  <Link to="/mes-reservations" className="block hover:text-[#FF7828]">Mes réservations</Link>
                  <Link to="/annuler" className="block hover:text-[#FF7828]">Annuler une réservation</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center">
          <Link to="/panier" className="relative z-10">
            <FiShoppingCart className="text-2xl" />
          </Link>

          {/* Ajout de l'icône de recherche */}
          <div className="relative flex items-center">
            <button 
              onClick={toggleSearch} 
              className="flex items-center ml-4" 
              aria-expanded={showSearch} 
              aria-controls="search-bar"
            >
              <FiSearch className="text-2xl hover:text-[#FF7828]" />
            </button>
            
            {showSearch && (
              <div className="absolute left-0 mt-20 w-40"> {/* Augmenté de mt-2 à mt-4 pour descendre la barre de recherche */}
                <SearchBar 
                  showSearch={showSearch} 
                  setShowSearch={setShowSearch} 
                />
              </div>
            )}
          </div>

          
            
          
        </div>
      </div>


    </header>
  );
};
