// src/components/Header.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Assure-toi d'avoir installé react-icons

const Header = () => {
  return (
    <header className="relative bg-black text-white py-4 shadow-lg">
      {/* Superposition de l'image */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-start p-4 z-10 second-image">
        <Link to="/" className="block">
          <img 
            src="./src/assets/images/survival-parc.png" 
            alt="Survival Parc Logo"
            className="w-[250px] h-auto" // Ajuste la taille selon tes besoins
          />
        </Link>
      </div>

      {/* Superposition de la deuxième image */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-start p-4 z-10">
        <img 
          src="./src/assets/images/logo.png" 
          alt="Another Logo"
          className="w-[150px] h-auto" // Ajustez la taille selon vos besoins
        />
      </div>
      
      <div className="container list-none text-lg mx-auto flex items-center justify-between px-4 pt-4 max-w-screen-xl relative z-20">
        {/* Navigation Links */}
        <nav className="flex-grow flex items-center justify-center space-x-20">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hover:text-gray-400"
          >
            <Link to="/">Attractions</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hover:text-gray-400"
          >
            <Link to="/about">Hotels</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hover:text-gray-400"
          >
            <Link to="/contact">Infos pratiques</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hover:text-gray-400"
          >
            <Link to="/contact">Réserver</Link>
          </motion.li>

        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <FaUser className="text-2xl hover:text-gray-400" />
          </Link>
          <Link to="/cart">
            <FaShoppingCart className="text-2xl hover:text-gray-400" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
