// src/components/HomePage.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-cover bg-center h-screen text-center relative">
        <video 
          className="absolute inset-0 w-full h-full object-cover clip-bottom mt-20" // Ajoutez mt-20 ici
          autoPlay 
          loop 
          muted
          src="./src/assets/movies/quarantaine.mp4" // Assurez-vous que le chemin est correct
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative p-6 rounded-lg z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bienvenue à Survival Parc
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Vivez l'expérience ultime dans une zone de quarantaine post-apocalyptique.
          </motion.p>
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
      </section>

      {/* Attractions Section */}
      <section className="p-6 md:p-12 bg-gray-800">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos Attractions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="bg-gray-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">Parcours Interactif</h3>
              <p>Évitez les agents des Fedra et échappez aux 'cliqueurs' dans ce parcours immersif.</p>
            </motion.div>
            <motion.div
              className="bg-gray-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-2">Camp de Survivants</h3>
              <p>Explorez un camp de survivants et découvrez les défis de la survie dans un environnement hostile.</p>
            </motion.div>
            <motion.div
              className="bg-gray-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-2">Checkpoints</h3>
              <p>Passez à travers des checkpoints et réalisez des missions pour tester vos compétences.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; 2024 Survival Parc. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

