import { useEffect, useState } from 'react';
import { Card } from '../components/Cards';
import { IAnimation } from '../@types';
import { AnimationService } from '../services/animationService';

export const Animations = () => {
    const [animations, setAnimations] = useState<IAnimation[]>([]);
    const [filteredAnimations, setFilteredAnimations] = useState<IAnimation[]>([]);
    const [filterType, setFilterType] = useState('');
    const [animationTypes, setAnimationTypes] = useState<string[]>([]); // État pour stocker les types d'animations

    const imageMap: { [key: string]: string[] } = {
        1: ['./src/assets/images/grand8.png'],
        2: ['./src/assets/images/trainzombie.webp'],
        3: ['./src/assets/images/manege1.png', './src/assets/images/manege2.png', './src/assets/images/roue.png'],
        4: ['./src/assets/images/labyrinthe.png'],
        5: ['./src/assets/images/escape.webp'],
        6: ['./src/assets/images/cinema.png'],
    };

    const fetchAnimations = async () => {
        try {
            const data = await AnimationService.getAllAnimations();
            setAnimations(data);
            setFilteredAnimations(data); // Initialise les animations filtrées
        } catch (error) {
            console.error('Erreur lors de la récupération des animations:', error);
        }
    };

    const fetchAnimationTypes = async () => {
        try {
            const response = await AnimationService.getAllAnimations(); // Récupérer toutes les animations pour obtenir les types
            const uniqueTypes = [...new Set(response.map(animation => animation.type))]; // Récupérez les types uniques à partir des animations
            setAnimationTypes(uniqueTypes);
        } catch (error) {
            console.error('Erreur lors de la récupération des types d\'animations:', error);
        }
    };
    
    useEffect(() => {
        fetchAnimations();
        fetchAnimationTypes(); // Appel pour récupérer les types d'animations
    }, []);

    useEffect(() => {
        // Filtrage des animations en fonction du type
        const filtered = animations.filter(animation =>
            (filterType === '' || animation.type === filterType)
        );
        setFilteredAnimations(filtered);
    }, [filterType, animations]);

    if (animations.length === 0) {
        return <div className="text-white">Aucune animation disponible.</div>;
    }

    return (
        <div className="p-4 bg-gradient-to-b from-black via-[#1F2937] via-10% to-[#1F2937]">
            <h1 className="text-3xl font-bold mb-6 text-center mt-[150px] text-white">
                Toutes nos animations
            </h1>

            <div className="flex justify-center gap-4 mb-8">
                {/* Filtre de type */}
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="p-2 rounded-md border border-gray-300"
                >
                    <option value="">Tous les types</option>
                    {animationTypes.map((type, index) => (
                        <option key={index} value={type}>{type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-6 mt-32">
                {filteredAnimations.map((animation) => (
                    <div key={animation.id}>
                        <Card
                            title={animation.name}
                            description={animation.description}
                            image={imageMap[animation.id.toString()] || []}
                            link={`/animations/${animation.id}`}
                            reverse={false}
                            className="w-2/3 p-4"  // Réduit la taille de la carte
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};
