// Card.tsx
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CardProps {
    title: string;
    description: string;
    image: string;
    link?: string;
    reverse?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, description, image, link, reverse }) => {
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
            className={`card bg-base-100 shadow-xl flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center w-5/6 mx-auto h-[500px]`}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover="hover"
            transition={{ duration: 0.5 }}
        >
            <figure className="md:w-1/2">
                <img src={image} alt={title} className="w-full h-64 object-cover" />
            </figure>
            <div className="card-body md:w-1/2 flex flex-col justify-center p-4">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                {link && (
                    <Link to={link} className="text-blue-500 hover:underline mt-4">
                        Plus d'informations
                    </Link>
                )}
            </div>
        </motion.div>
    );
};
