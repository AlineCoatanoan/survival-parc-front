import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginModalProps {
    onLoginSuccess: () => void; // Prop pour notifier le Header
    onClose: () => void; // Prop pour fermer la modale
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const userId = response.data.data.user.id;

            console.log("Utilisateur connecté :", userId);

            if (userId && userId > 0) {
                onLoginSuccess(); // Appeler la fonction de succès
                navigate(`/mon-compte/${userId}`);
            } else {
                console.error("Aucun utilisateur trouvé dans la réponse.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
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
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
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
