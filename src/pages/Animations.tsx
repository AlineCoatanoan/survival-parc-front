import { useEffect, useState } from 'react';
import { Card } from '../components/Cards'; // Retire .tsx si possible
import { IAnimation } from '../@types';
import { AnimationService } from '../services/animationService';

export const Animations = () => {
    const [animations, setAnimations] = useState<IAnimation[]>([]);

    const imageMap: { [key: string]: string[] } = {
        1: ['./src/assets/images/grand8.png'],
        2: ['./src/assets/images/trainzombie.webp'],
        3: ['./src/assets/images/labyrinthe.png'],
        4: ['./src/assets/images/escape.webp'],
        5: ['./src/assets/images/cinema.png'],
    };

    const fetchAnimations = async () => {
        try {
            const data = await AnimationService.getAllAnimations();
            console.log('Données récupérées:', data);
            setAnimations(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des animations:', error);
        }
    };

    useEffect(() => {
        fetchAnimations();
    }, []);

    // Vérifie si les animations sont récupérées
    if (animations.length === 0) {
        return <div className="text-white">Aucune animation disponible.</div>;
    }

    return (
        <div className="p-4 bg-black">
            <h1 className="text-3xl font-bold mb-6 text-center mt-[150px] text-white">
                Toutes nos animations
            </h1>

            <div className="flex flex-col gap-6 mt-32">
            {animations.map((animation, index) => (
                <div key={animation.id}>
                    <Card
                        title={animation.name}
                        description={animation.description}
                        image={imageMap[animation.id.toString()] || ['path/to/default/image.png']} // Passer le tableau d'images ici
                        link={`/animations/${animation.id}`}
                        reverse={index % 2 === 0}
                    />
                    {index === 0 && (
                        <Card
                            title="Carte Statique"
                            description="Ceci est une carte qui ne provient pas de l'API."
                            image={[
                                './src/assets/images/manege.png',
                                './src/assets/images/manege2.png',
                                './src/assets/images/roue.png',
                                './src/assets/images/trainzombie.webp',
                            ]}
                            link="/animations/statique"
                            reverse={animations.length % 2 === 0}
                            className="mt-8" // Ajustement de la marge ici
                        />
                    )}
                </div>
            ))}

            </div>
        </div>
    );
};
