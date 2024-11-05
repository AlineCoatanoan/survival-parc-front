import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Element {
  name: string;
  type: string;
  link: string;
}

interface SearchBarProps {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const elements: Element[] = [
  { name: 'réservations', type: 'attraction', link: '/Reservations' },
  { name: 'attractions', type: 'attraction', link: '/Attractions' },
  { name: 'hôtel', type: 'hotel', link: '/refuge' },
  { name: 'plan', type: 'info', link: '/plan' },
  // Ajoutez d'autres éléments ici...
];

export const SearchBar: React.FC<SearchBarProps> = ({ showSearch, setShowSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Element[]>([]);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrer les éléments en fonction du terme de recherche
    const results = elements.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleResultClick = (link: string) => {
    setShowSearch(false); // Ferme le champ de recherche
    navigate(link); // Navigue vers la page correspondante
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      // Naviguer vers le premier résultat
      handleResultClick(searchResults[0].link);
    }
  };

  return (
    <div className={`relative ${showSearch ? 'block' : 'hidden'}`}>
      <input
        type="text"
        placeholder="Recherche..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // Ajoutez le gestionnaire ici
        className="w-40 bg-black text-white p-2 rounded" // Fixer la largeur ici
        onBlur={() => setShowSearch(false)} // Ferme le champ de recherche en perdant le focus
        autoFocus // Facultatif, pour donner le focus à l'input à l'ouverture
      />
      {searchResults.length > 0 && (
        <div className="absolute left-0 mt-1 w-40 bg-black text-white p-2 rounded shadow-lg">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="cursor-pointer hover:text-[#FF7828]"
              onClick={() => handleResultClick(result.link)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
