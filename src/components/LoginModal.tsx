import React, { useState } from 'react';
import axios from 'axios';

interface LoginModalProps {
    isOpen: boolean;
    onLoginSuccess: () => void;
    onClose: () => void;
    setLoginCredentials: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>; // Prop modifiée
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onClose, setLoginCredentials }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Vérification des valeurs des champs
        console.log("Email:", email);
        console.log("Password:", password);
    
        if (!email || !password) {
            console.error("Email et mot de passe sont requis");
            return; // Empêche l'envoi de la requête si les données sont manquantes
        }
    
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            // Vérification de la réponse du backend
            console.log("Réponse de l'API:", response.data);
    
            const { success, message, data } = response.data;
            
            if (success) {
                const { id, role } = data.user; // Utilisation des informations de l'utilisateur
                const token = data.token; // Récupération du token
    
                // Vous pouvez stocker le token dans le localStorage ou un autre endroit sécurisé
                localStorage.setItem('authToken', token);
                console.log("Token enregistré:", token);
    
                if (role === "admin") {
                    console.log("Connexion réussie en tant qu'admin :", id);
                } else {
                    console.log("Connexion réussie en tant qu'utilisateur :", id);
                }
    
                onLoginSuccess(); // Appel de la fonction pour mettre à jour l'état de la connexion
            } else {
                console.error("Erreur de connexion:", message);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    // Mise à jour des champs de connexion à chaque changement
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setLoginCredentials((prev) => ({ ...prev, email: newEmail })); // Mettre à jour les informations dans setLoginCredentials
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setLoginCredentials((prev) => ({ ...prev, password: newPassword })); // Mettre à jour les informations dans setLoginCredentials
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} // Utiliser la fonction de mise à jour
                        placeholder="Email" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} // Utiliser la fonction de mise à jour
                        placeholder="Mot de passe" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-[#BF2D6E] text-white py-2 rounded hover:bg-[#FF7828] transition"
                    >
                        Se connecter
                    </button>
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
                    >
                        Fermer
                    </button>
                </form>
            </div>
        </div>
    );
};
