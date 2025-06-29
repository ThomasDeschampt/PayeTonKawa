'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Produit = {
  id: string;
  nom: string;
  prix: number;
  quantity?: number;
  photo_url?: string;
};

type PanierContextType = {
  panier: Produit[];
  ajouterProduit: (produit: Produit) => void;
  retirerProduit: (id: string) => void;
  viderPanier: () => void;
  modifierQuantite: (id: string, quantity: number) => void;
  totalArticles: number;
  isReady: boolean;
};

const PanierContext = createContext<PanierContextType | undefined>(undefined);

const PANIER_KEY = 'panier';

export const PanierProvider = ({ children }: { children: React.ReactNode }) => {
  const [panier, setPanier] = useState<Produit[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem(PANIER_KEY);
    if (stored) {
      setPanier(JSON.parse(stored));
    }
    setIsReady(true);
  }, []);

  // Sauvegarder dans localStorage quand panier change, uniquement si prêt
  useEffect(() => {
    if (isReady) {
      localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
    }
  }, [panier, isReady]);

  const ajouterProduit = (produit: Produit) => {
    setPanier((prev) => {
      const existant = prev.find((p) => p.id === produit.id);
      if (existant) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...produit, quantity: 1 }];
    });
  };

  const retirerProduit = (id: string) => {
    setPanier((prev) => prev.filter((p) => p.id !== id));
  };

  const viderPanier = () => setPanier([]);

  // Modifier la quantité d’un produit (supprime si quantity <= 0)
  const modifierQuantite = (id: string, quantity: number) => {
    setPanier((prev) => {
      if (quantity <= 0) {
        return prev.filter((p) => p.id !== id);
      }
      return prev.map((p) => (p.id === id ? { ...p, quantity } : p));
    });
  };

  const totalArticles = panier.reduce((acc, p) => acc + (p.quantity || 1), 0);

  return (
    <PanierContext.Provider
      value={{
        panier,
        ajouterProduit,
        retirerProduit,
        viderPanier,
        modifierQuantite,
        totalArticles,
        isReady,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};

export function usePanier() {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error('usePanier must be used within a PanierProvider');
  }
  return context;
}
