import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { SearchBar } from './SearchBar';
import { useAuth } from '../features/auth/authContext';

interface LinkItem {
  to: string;
  label: string;
}

interface DropdownMenuProps {
  label: string;
  activeMenu: string | null;
  handleMouseEnter: (menu: string) => void;
  handleMouseLeave: () => void;
  links: LinkItem[];
}

interface MobileMenuProps {
  closeMenu: () => void;
}

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Pour le menu mobile
  const { isAuthenticated, isAdmin, user } = useAuth();

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle menu mobile
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false); // Fermer le menu mobile
  };

  const userId = user ? user.id : null;

  const handleLogoClick = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu(); // Fermer le menu mobile si ouvert
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[black] text-white py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-4 pt-4 max-w-screen-xl relative">
      <div className="fixed top-[10px] left-1/2 transform -translate-x-1/2 md:left-0 md:ml-[120px]">
        <Link to="/" className="flex w-full h-full" onClick={handleLogoClick}>
          <div className="w-[100px] h-[auto]">
            <img
              src="./src/assets/images/logo.png"
              alt="Survival Parc Logo"
              className="w-[100px] h-auto"
            />
          </div>
        </Link>
      </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-grow">
          <DropdownMenu
            label="Animations du parc"
            activeMenu={activeMenu}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            links={[
              { to: "/attractions", label: "Attractions" },
              { to: "/labyrinthe", label: "Labyrinthe" },
              { to: "/cinema", label: "Cinéma" },
              { to: "/escape", label: "Escape Game" },
            ]}
          />
          <DropdownMenu
            label="Hôtels"
            activeMenu={activeMenu}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            links={[
              { to: "/refuge", label: "Hôtel Le refuge des survivants" },
              { to: "/postapo", label: "Hôtel Post-Apocalyptique" },
            ]}
          />
          <DropdownMenu
            label="Infos pratiques"
            activeMenu={activeMenu}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            links={[
              { to: "/plan", label: "Plan du parc" },
              { to: "/calendrier", label: "Dates et horaires d'ouverture" },
              { to: "/acces", label: "Accès" },
            ]}
          />
          <DropdownMenu
            label="Réservations"
            activeMenu={activeMenu}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            links={[
              { to: "/Ticket", label: "Ticket journée(s)" },
              { to: "/Pass", label: "Pass" },
            ]}
          />
        </nav>

        {/* Bouton du menu burger */}
        <button className="md:hidden text-2xl z-50" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Icones de recherche et panier */}
        <div className="flex items-center">
          {userId && (
            <Link to={`/reservations/${userId}`} className="relative">
              <FiShoppingCart className="text-2xl" />
            </Link>
          )}
          {/* Loupe visible en mobile et desktop */}
          <div className="relative flex items-center">
            <button
              onClick={toggleSearch}
              className="flex items-center ml-4 md:ml-0"
              aria-expanded={showSearch}
              aria-controls="search-bar"
            >
              <FiSearch className="text-2xl hover:text-[#FF7828]" />
            </button>
            {showSearch && (
              <div className="absolute left-0 mt-20 w-40">
                <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
              </div>
            )}
            {isAuthenticated && isAdmin && (
              <Link to="/dashboard" className="ml-4 text-[#FF7828]">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="bg-black text-white fixed inset-0 p-6 mt-20 md:hidden z-40"
        >
          <div className="flex flex-col space-y-6">
            <MobileMenu closeMenu={closeMobileMenu} />
          </div>
        </motion.nav>
      )}
    </header>
  );
};




const DropdownMenu = ({ label, activeMenu, handleMouseEnter, handleMouseLeave, links }: DropdownMenuProps) => (
  <div onMouseEnter={() => handleMouseEnter(label)} className="relative group">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hover:text-[#FF7828] cursor-pointer"
    >
      <h1 className="mx-6">{label}</h1>
    </motion.div>
    {activeMenu === label && (
      <div
        className="absolute left-0 mt-2 w-40 bg-black text-white p-2 rounded shadow-lg"
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col space-y-2">
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="block hover:text-[#FF7828]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
);

const MobileMenu = ({ closeMenu }: MobileMenuProps) => (
  <>
    <Link to="/attractions" className="hover:text-[#FF7828]" onClick={closeMenu}>Attractions</Link>
    <Link to="/labyrinthe" className="hover:text-[#FF7828]" onClick={closeMenu}>Labyrinthe</Link>
    <Link to="/cinema" className="hover:text-[#FF7828]" onClick={closeMenu}>Cinéma</Link>
    <Link to="/escape" className="hover:text-[#FF7828]" onClick={closeMenu}>Escape Game</Link>
    <Link to="/refuge" className="hover:text-[#FF7828]" onClick={closeMenu}>Hôtel Le refuge des survivants</Link>
    <Link to="/postapo" className="hover:text-[#FF7828]" onClick={closeMenu}>Hôtel Post-Apocalyptique</Link>
    <Link to="/plan" className="hover:text-[#FF7828]" onClick={closeMenu}>Plan du parc</Link>
    <Link to="/calendrier" className="hover:text-[#FF7828]" onClick={closeMenu}>Dates et horaires d'ouverture</Link>
    <Link to="/acces" className="hover:text-[#FF7828]" onClick={closeMenu}>Accès</Link>
    <Link to="/Ticket" className="hover:text-[#FF7828]" onClick={closeMenu}>Ticket journée(s)</Link>
    <Link to="/Pass" className="hover:text-[#FF7828]" onClick={closeMenu}>Pass</Link>
  </>
);
