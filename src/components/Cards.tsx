import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    title: string;
    description: string;
    image?: string[]; // Rendre l'image optionnelle
    link?: string;
    reverse?: boolean;
    className?: string; // Ajout de la propriété className
    features?: string[]; // Ajout d'une propriété pour les points forts spécifiques
}

export const Card: React.FC<CardProps> = ({ title, description, image, reverse, className, features }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            ref={cardRef}
            className={`card bg-[#374151] shadow-xl flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} md:items-center w-full mx-auto h-auto ${className}`} // Utilisation de className
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover="hover"
            transition={{ duration: 0.5 }}
        >
            {/* Partie texte */}
            <div className="card-body md:w-1/2 flex flex-col justify-center p-6 space-y-4">
                <h2 className="card-title text-2xl font-semibold text-white">{title}</h2>
                <p className="text-white text-base leading-loose">{description}</p> {/* Ajout de leading-loose pour aérer les interlignes */}
                {/* Ajout de sections pour la lisibilité */}
                {features && features.length > 0 && (
                    <div className="text-white text-base">
                        <ul className="list-disc pl-5">
                            {features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Partie image */}
            {image && image.length > 0 && (
                <div className="md:w-1/2 p-4 flex justify-center items-center">
                    {/* Si 3 images, affichage particulier */}
                    {image.length === 3 ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                {/* Première et deuxième images côte à côte */}
                                <img
                                    src={image[0]}
                                    alt="image-1"
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                />
                                <img
                                    src={image[1]}
                                    alt="image-2"
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                />
                            </div>
                            {/* Troisième image centrée sous les deux premières */}
                            <div className="flex justify-center mt-4">
                                <img
                                    src={image[2]}
                                    alt="image-3"
                                    className="w-2/3 h-auto object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    ) : (
                        // Cas générique pour moins de 3 images
                        <div className="grid grid-cols-1 gap-4">
                            {image.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`image-${index}`}
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};
