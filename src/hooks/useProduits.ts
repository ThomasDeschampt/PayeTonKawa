'use client';

import { useEffect, useState, useCallback } from 'react';

type Produit = {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  stock: number;
  photo_url?: string;
};

export function useProduits() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProduits = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/produits/afficherAll');

      const data = await res.json();
      if (data.success) setProduits(data.tools || data.data || []);
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProduits();
  }, [fetchProduits]);

  return { produits, loading, refresh: fetchProduits };
}
