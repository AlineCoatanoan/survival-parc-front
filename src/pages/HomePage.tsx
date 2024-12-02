import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const HomePage = () => {
  const [index, setIndex] = useState(0);

  const items = [
    { image: './src/assets/images/carrousel/1.jpg', title: 'Parc' },
    { image: './src/assets/images/carrousel/2.jpg', title: 'Camp de Survivants' },
    { image: './src/assets/images/carrousel/3.jpg', title: 'Le labyrinthe' },
    { image: './src/assets/images/carrousel/4.jpg', title: 'Le train - Evasion des Infectés' },
    { image: './src/assets/images/carrousel/5.jpg', title: 'Escape game - le laboratoire' },
    { image: './src/assets/images/carrousel/6.jpg', title: 'Cinéma 4D' },
    { image: './src/assets/images/carrousel/7.jpg', title: 'Tour infernale' },
    { image: './src/assets/images/carrousel/8.jpg', title: 'Des survivants' },
  ];

  const hotels = [
    { image: './src/assets/images/hotel1.jpg', name: 'Hôtel des Survivants' },
    { image: './src/assets/images/hotel2.jpg', name: 'Hôtel post-apocalyptique' },
  ];

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? items.length - 3 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex >= items.length - 3 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white pb-50 sm:pb-12 min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-cover bg-center h-screen text-center relative mt-20 sm:mt-[80px] md:mt-[100px]">
      {/* Vidéo uniquement sur grand écran */}
      <div className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          src="./src/assets/movies/quarantaine.mp4"
          style={{ objectPosition: 'center -1%' }}
        />
      </div>

      {/* Image mobile uniquement sur petits écrans */}
      <div className="absolute inset-0 w-full h-full object-cover z-0 md:hidden">
        <img
          className="w-full h-full object-contain"
          src="./src/assets/images/mobile.jpg"
          alt="Image mobile"
          style={{ objectPosition: 'center top' }} 
        />
      </div>

      <div className="relative p-6 rounded-lg z-10">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bienvenue à Survival Parc
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-2xl mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Vivez l'expérience ultime dans une zone de quarantaine post-apocalyptique.
        </motion.p>
      </div>
      </section>


      {/* Attractions Section (Carrousel supprimé pour mobile) */}
      <section className="p-6 md:p-12 bg-gray-800 relative mt-[80px]">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nos Animations
        </motion.h2>

        {/* Carrousel visible uniquement sur desktop */}
        <div className="relative hidden md:flex items-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            &#10094;
          </button>

          <div className="overflow-hidden w-full flex justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
            >
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 bg-gray-700 p-4 sm:p-6 rounded-lg mx-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="h-40 sm:h-60 md:h-80 bg-gray-600 rounded-lg mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-3 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            &#10095;
          </button>
        </div>

        {/* Carrousel pour petits écrans (avec affichage différent si sur mobile) */}
        <div className="md:hidden">
          {/* Bouton au-dessus des images */}
          <div className="flex justify-center mt-6">
            <Link to="/animations">
              <motion.button
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Découvrez Toutes Les Animations
              </motion.button>
            </Link>
          </div>

          {/* Affichage des images restantes */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            {items.slice(0, 2).map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-700 p-4 sm:p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="h-40 bg-gray-600 rounded-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </section>


      {/* Hôtels Section */}
      <section className="p-6 md:p-12 bg-gray-800 mt-[80px]">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos Hôtels
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 p-4 sm:p-6 rounded-lg text-center w-full sm:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-40 sm:h-60 md:h-80 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{hotel.name}</h3>
                <Link
                  to={index === 0 ? "/refuge" : "/postapo"}
                  className="text-red-600 hover:underline"
                >
                  En savoir plus
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
       {/* Informations Section */}
       <section className="bg-gray-800 text-white py-8 mt-[80px]">
        <div className="container mx-auto flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-center">
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <a href="#" className="hover:underline">Nos engagements RSE</a>
            <a href="#" className="hover:underline">Actualités</a>
            <a href="#" className="hover:underline">CGV</a>
            <a href="#" className="hover:underline">Mentions légales</a>
          </div>
          <div className="text-center md:text-left md:mx-12">
            <p className="font-semibold">Coordonnées</p>
            <p>D619 – 10850 SAFEPLACE</p>
            <p>Téléphone : 00 20 07 04 50</p>
            <a href="mailto:survival-parc@survival.com" className="hover:underline">Contactez-nous</a>
          </div>
          <div className="flex items-center justify-center">
            <img src="./src/assets/images/logo.png" alt="Logo Survival Parc" className="h-16" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 md:p-12 bg-gray-800 relative mt-[80px] pb-20 sm:pb-24 md:pb-16 flex justify-center items-center">
        <div className="text-center">
          <p className="text-white">&copy; 2024 Survival Parc. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
};
