import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IReservation } from '../../@types';

// Déclarez une interface pour les éléments du panier (CartItem)
interface CartItem extends IReservation {
  quantity: number; // Ajouter la quantité pour gérer le nombre de personnes ou autres items
}

// Déclarez les types pour le contexte du panier
interface CartContextProps {
  cartItems: CartItem[];
  addItemToCart: (item: IReservation) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

// Créer le contexte du panier
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Composant CartProvider qui gère l'état du panier
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Ajouter un article au panier
  const addItemToCart = (item: IReservation) =>
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } // Augmenter la quantité
            : cartItem
        );
      }
      // Si l'article n'existe pas déjà, on l'ajoute avec une quantité de 1
      return [...prevItems, { ...item, quantity: 1 }];
    });

  // Supprimer un article du panier
  const removeItemFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculer le prix total du panier
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour accéder au contexte du panier
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
