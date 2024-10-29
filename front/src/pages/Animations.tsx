// Animations.tsx
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Cards.tsx' // Assure-toi que le chemin est correct

export const Animations = () => {
    const [visibleCards, setVisibleCards] = useState([true, false, false, false, false]);

    const handleScroll = useCallback(() => {
        const cardElements = document.querySelectorAll('.card');
        const newVisibleCards = [...visibleCards];

        cardElements.forEach((card, index) => {
            const position = card.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                newVisibleCards[index] = true;
            }
        });

        setVisibleCards(newVisibleCards);
    }, [visibleCards]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="p-4 bg-black">
            <h1 className="text-3xl font-bold mb-6 text-center mt-[150px] text-white">
                Toutes nos animations
            </h1>

            <div className="flex flex-col gap-6 mt-32">
                <Card
                    title="La Montée du Chaos"
                    description="Le grand 8."
                    image="./src/assets/images/grand8.png"
                />

                <div className="card bg-base-100 shadow-xl w-5/6 mx-auto flex flex-col p-4">
                    <h2 className="card-title text-center">Et de nombreuses autres attractions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <img
                            src="./src/assets/images/manege.png"
                            alt="Attraction 1"
                            className="w-full h-32 object-cover rounded"
                        />
                        <img
                            src="./src/assets/images/roue.png"
                            alt="Attraction 2"
                            className="w-full h-48 object-cover rounded"
                        />
                        <img
                            src="./src/assets/images/trainzombie.webp"
                            alt="Attraction 3"
                            className="w-full h-40 object-cover rounded"
                        />
                        <img
                            src="./src/assets/images/manege2.png"
                            alt="Attraction 4"
                            className="w-full h-56 object-cover rounded"
                        />
                    </div>
                    <Link to="/attractions" className="text-blue-500 mt-4 self-center">
                        Plus d'informations
                    </Link>
                </div>

                <Card
                    title="Le passage secret"
                    description="Un labyrinthe sombre où les visiteurs doivent utiliser des indices pour trouver leur chemin tout en évitant des obstacles et des créatures dangereuses."
                    image="./src/assets/images/labyrinthe.png"
                    link="/labyrinthe"
                    reverse
                />

                <Card
                    title="Le laboratoire"
                    description="Escape Game où il faudra trouver un vaccin avant que le virus ne se propage."
                    image="./src/assets/images/escape.webp"
                    link="/escape"
                />

                <Card
                    title="L'immersif 360°"
                    description="Cinéma 4DX avec des écrans du sol au plafond pour une immersion totale."
                    image="./src/assets/images/cinema.png"
                    link="/cinema"
                    reverse
                />
            </div>
        </div>
    );
};
