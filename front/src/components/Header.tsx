import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="relative bg-black text-white py-4 shadow-lg">
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
        {/* Conteneur pour les liens centré */}
        <nav className="flex items-center justify-center space-x-8 flex-grow"> {/* Ajustez ici pour l'espacement des h1 */}
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
              <h1 className="mx-6">Activités du parc</h1>
            </motion.div>
            {activeMenu === 'attractions' && (
              <div 
                className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2"> {/* Espacement des sous-liens */}
                  <Link to="/attraction1" className="block hover:text-[#FF7828]">Attractions</Link>
                  <Link to="/attraction2" className="block hover:text-[#FF7828]">Cinéma</Link>
                  <Link to="/attraction3" className="block hover:text-[#FF7828]">Escape Game</Link>
                </div>
              </div>
            )}
          </div>

          {/* Autres liens de navigation... */}

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
                  <Link to="/hotel1" className="block hover:text-[#FF7828]">Hôtel Zone Securisée</Link>
                  <Link to="/hotel2" className="block hover:text-[#FF7828]">Hôtel Post-Apocalyptique</Link>
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
                  <Link to="/info1" className="block hover:text-[#FF7828]">Plan du parc</Link>
                  <Link to="/info2" className="block hover:text-[#FF7828]">Calendrier</Link>
                  <Link to="/info3" className="block hover:text-[#FF7828]">Accès</Link>
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
              className="hover:text-[#FF7828] cursor-pointer"
            >
              <h1 className="mx-6">Billeterie</h1>
            </motion.div>
            {activeMenu === 'reservations' && (
              <div 
                className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col space-y-2">
                  <Link to="/reservation1" className="block hover:text-[#FF7828]">Billets</Link>
                  <Link to="/reservation2" className="block hover:text-[#FF7828]">Séjour</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Icônes utilisateur et panier à droite */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-[#FF7828]">
            <FaRegUser size={24} />
          </Link>
          <Link to="/cart" className="text-[#FF7828]">
            <FiShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
