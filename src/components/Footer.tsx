export const Footer = () => {
  return (
    <footer className="p-6 pb-48 sm:pb-60 md:p-12 bg-gray-800 text-white mt-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo ou nom */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold">&copy; 2024 Survival Parc</p>
          <p className="text-sm text-gray-400">Tous droits réservés.</p>
        </div>

        {/* Liens utiles */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <a href="#engagements" className="hover:underline text-sm">
            Nos engagements RSE
          </a>
          <a href="#actualites" className="hover:underline text-sm">
            Actualités
          </a>
          <a href="#cgv" className="hover:underline text-sm">
            CGV
          </a>
          <a href="#mentions-legales" className="hover:underline text-sm">
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
};
