'use client';

import { useEffect, useState } from 'react';

export type Produit = {
  id: string;
  nom: string;
  prix: number;
  quantity?: number;
  photo_url?: string;
};

const PANIER_KEY = 'panier';

export function usePanier() {
  const [panier, setPanier] = useState<Produit[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PANIER_KEY);
    if (stored) {
      setPanier(JSON.parse(stored));
    }
    setIsReady(true);
  }, []);

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

  const viderPanier = () => {
    setPanier([]);
  };

  const totalArticles = panier.reduce((acc, p) => acc + (p.quantity || 1), 0);

  return { panier, ajouterProduit, retirerProduit, viderPanier, totalArticles, isReady };
}
