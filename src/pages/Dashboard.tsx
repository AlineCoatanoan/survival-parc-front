import React, { useEffect, useState } from 'react';
import { IAnimation } from '../@types';
import { AnimationService } from '../services/animationService';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa'; // Icônes

export const Dashboard = () => {
    const [animations, setAnimations] = useState<IAnimation[]>([]);
    const [newAnimation, setNewAnimation] = useState({ name: '', type: '', description: '' });
    const [editingAnimation, setEditingAnimation] = useState<IAnimation | null>(null);
  
    // Fonction pour récupérer les animations depuis l'API
    const fetchAnimations = async () => {
      try {
        const data = await AnimationService.getAllAnimations();
        setAnimations(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des animations:', error);
      }
    };
  
    // Appel de la fonction pour récupérer les animations au chargement du composant
    useEffect(() => {
      fetchAnimations();
    }, []);
  
    const handleAddAnimation = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Nouvelle animation :", newAnimation); // Affichage de l'objet newAnimation
    
      if (!newAnimation.name || !newAnimation.type || !newAnimation.description) {
        console.log("Erreur : Tous les champs doivent être remplis.");
        return;
      }
    
      try {
        const addedAnimation = await AnimationService.createAnimation(newAnimation);
        console.log("Animation ajoutée avec succès !");
        setAnimations((prevAnimations) => [...prevAnimations, addedAnimation]); // Ajoute l'animation avec l'ID
        setNewAnimation({ name: '', type: '', description: '' }); // Réinitialisation du formulaire
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'animation :", error);
      }
    };
  
    // Fonction pour supprimer une animation
    const handleDelete = async (id: number) => {
      try {
        await AnimationService.deleteAnimation(id);
        fetchAnimations(); // Rafraîchissement des animations
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'animation:', error);
      }
    };
  
    // Fonction pour modifier une animation
    const handleEdit = (animation: IAnimation) => {
      setEditingAnimation(animation);
    };
  
    // Fonction pour mettre à jour une animation
    const handleUpdateAnimation = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingAnimation) return;
  
      try {
        await AnimationService.updateAnimation(editingAnimation.id, editingAnimation);
        fetchAnimations(); // Rafraîchissement des animations
        setEditingAnimation(null); // Ferme le formulaire d'édition
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'animation:', error);
      }
    };
  
    if (animations.length === 0) {
      return <div className="text-white">Aucune animation disponible.</div>;
    }
  
    return (
      <div className="p-4 bg-black">
        <h1 className="text-3xl font-bold mb-6 text-center mt-[150px] text-white">
          Tableau de bord
        </h1>

        {/* Titre "Animations" */}
        <h2 className="text-2xl font-semibold text-white mb-4">Animations</h2>

        {/* Formulaire d'ajout d'une nouvelle animation */}
        <form onSubmit={handleAddAnimation} className="mb-6 space-x-4 flex max-w-[50%] pl-0 mt-[50px]">
          <input
            type="text"
            value={newAnimation.name}
            onChange={(e) => setNewAnimation({ ...newAnimation, name: e.target.value })}
            placeholder="Nom"
            className="p-2 rounded-md border border-gray-300 text-sm w-[120px]"
            required
          />
          <input
            type="text"
            value={newAnimation.type}
            onChange={(e) => setNewAnimation({ ...newAnimation, type: e.target.value })}
            placeholder="Type"
            className="p-2 rounded-md border border-gray-300 text-sm w-[120px]"
            required
          />
          <input
            type="text"
            value={newAnimation.description}
            onChange={(e) => setNewAnimation({ ...newAnimation, description: e.target.value })}
            placeholder="Description"
            className="p-2 rounded-md border border-gray-300 text-sm w-[180px]"
            required
          />
          <button type="submit" className="p-2 bg-green-600 text-white rounded-md text-sm">
            <FaPlusCircle className="inline mr-2" /> Ajouter
          </button>
        </form>
  
        {/* Liste des animations */}
        <div className="flex flex-col gap-6 mt-15 max-w-[40%] pl-0">
          {animations.map((animation) => (
            <div key={animation.id} className="text-white border-b border-gray-600 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{animation.name}</h2>
                  <p><strong>Type:</strong> {animation.type}</p>
                  <p><strong>Description:</strong> {animation.description}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleEdit(animation)} className="text-blue-500 text-sm">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(animation.id)} className="text-red-500 text-sm">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
  
              {/* Formulaire d'édition de l'animation sous la ligne */}
              {editingAnimation && editingAnimation.id === animation.id && (
                <form onSubmit={handleUpdateAnimation} className="mb-6 space-x-4 flex max-w-[50%] pl-0 mt-6">
                  <input
                    type="text"
                    value={editingAnimation.name}
                    onChange={(e) => setEditingAnimation({ ...editingAnimation, name: e.target.value })}
                    placeholder="Nom"
                    className="p-2 rounded-md border border-gray-300 text-sm w-[120px]"
                    required
                  />
                  <input
                    type="text"
                    value={editingAnimation.type}
                    onChange={(e) => setEditingAnimation({ ...editingAnimation, type: e.target.value })}
                    placeholder="Type"
                    className="p-2 rounded-md border border-gray-300 text-sm w-[120px]"
                    required
                  />
                  <input
                    type="text"
                    value={editingAnimation.description}
                    onChange={(e) => setEditingAnimation({ ...editingAnimation, description: e.target.value })}
                    placeholder="Description"
                    className="p-2 rounded-md border border-gray-300 text-sm w-[180px]"
                    required
                  />
                  <button type="submit" className="p-2 bg-blue-600 text-white rounded-md text-sm">
                    Mettre à jour
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};
