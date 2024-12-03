import { motion } from 'framer-motion';
import franceImage from '../assets/images/france.png'; // Importer l'image de la carte France.

export const Acces = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-black via-[#1F2937] to-[#1F2937] text-white min-h-screen pt-[100px]">
      {/* Section Adresse en haut */}
      <motion.div
        className="bg-gray-900 w-full align-center flex flex-col justify-center items-center mb-8 p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeIn' }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500 hover:scale-105 transition-transform">
          Adresse
        </h2>
        <p>
          Survival Parc<br />
          Route de l'Aventure, 1234<br />
          Z.A. des Montagnes Sauvages,<br />
          Région de Bourgogne,<br />
          71300 Montbeau-sur-Loire, France
        </p>
      </motion.div>

      {/* Section Carte et informations */}
      <div className="flex flex-col md:flex-row items-center w-full max-w-12xl gap-8">
        {/* Image Carte France */}
        <motion.div
          className="relative w-full md:w-1/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <img
            src={franceImage}
            alt="Carte de France Survival Parc"
            className="w-full max-w-[250px] md:max-w-[500px] rounded-lg shadow-xl"
          />
        </motion.div>

        {/* Informations de voyage */}
        <motion.div
          className="w-full md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-lg mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          {/* Accès en voiture */}
          <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-[#FF7828] hover:scale-105 transition-transform">
            Accès en voiture
          </h2>

          {/* Depuis Paris */}
          <h3 className="text-xl font-medium mb-2 text-[#075D2C] bg-clip-text hover:scale-105 transition-transform">
            Depuis Paris (1h30 en voiture)
          </h3>
          <p>
            1. Prenez l'autoroute A6 depuis Paris en direction du sud.<br />
            2. Continuez sur l'A6 et prenez la sortie 23 vers <strong>Montbeau-sur-Loire</strong>.<br />
            3. Suivez la D123 jusqu'à la <strong>Route de l'Aventure</strong>, où le parc se trouve à environ 1,5 km sur votre droite.<br />
            4. Le parc est bien indiqué, vous ne pouvez pas le manquer !
          </p>

          {/* Depuis Lyon */}
          <h3 className="text-xl font-medium mt-4 mb-2 text-[#075D2C] bg-clip-text hover:scale-105 transition-transform">
            Depuis Lyon (3h45 en voiture)
          </h3>
          <p>
            1. Prenez l'autoroute A7 en direction de Paris.<br />
            2. Continuez sur l'A7 jusqu'à l'échangeur 35, puis prenez l'A6 en direction de Dijon.<br />
            3. Prenez la sortie 23 pour <strong>Montbeau-sur-Loire</strong>.<br />
            4. Une fois sur la D123, suivez les panneaux indiquant "Survival Parc" à environ 3 km.
          </p>

          {/* Depuis Dijon */}
          <h3 className="text-xl font-medium mt-4 mb-2 text-[#075D2C] bg-clip-text hover:scale-105 transition-transform">
            Depuis Dijon (0h30 en voiture)
          </h3>
          <p>
            1. Prenez l'A38 en direction de <strong>Montbeau-sur-Loire</strong>.<br />
            2. Continuez sur la N73 jusqu'à la sortie vers <strong>Route de l'Aventure</strong>.<br />
            3. Le parc se trouve à 5 minutes de route.
          </p>
        </motion.div>
      </div>

      {/* Section Parkings */}
      <motion.div
        className="bg-gray-900 w-full max-w-5xl rounded-lg p-6 shadow-lg mb-12 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-[#FF7828] hover:scale-105 transition-transform">
          Parkings
        </h2>
        <ul className="space-y-2">
          <li>
            <strong>Parking Principal</strong>: Grand parking gratuit, accessible directement depuis la <strong>Route de l'Aventure</strong> (500 places).
          </li>
          <li>
            <strong>Parking VIP</strong>: Espace réservé pour les détenteurs de pass VIP à proximité de l'entrée.
          </li>
          <li>
            <strong>Parking Bus & Caravans</strong>: Espace pour autocars et camping-cars, à 300 mètres de l'entrée.
          </li>
        </ul>
      </motion.div>

      {/* Section Transport Public */}
      <motion.div
        className="bg-gray-900 w-full max-w-5xl rounded-lg p-6 shadow-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <h2 className="text-3xl font-semibold mb-4 bg-clip-text text-[#FF7828] hover:scale-105 transition-transform">
          Transport Public
        </h2>
        <p>
          La gare la plus proche est <strong>Gare de Montbeau-sur-Loire</strong>, à 5 km du parc. Des navettes gratuites sont disponibles toutes les 30 minutes pour rejoindre le parc.<br />
          Des bus régionaux <strong>RSE 301</strong> desservent le parc depuis la gare en 15 minutes.
        </p>
      </motion.div>
    </div>
  );
};
