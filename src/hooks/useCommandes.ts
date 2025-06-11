'use client';

import { useEffect, useState, useCallback } from 'react';

type ProduitCommande = {
  id: number;
  id_commande: string;
  id_prod: string;
  quantite: number;
};

type Commande = {
  id: string;
  created_at: string;
  id_client: string;
  statut: string;
  montant: number;
  mode_paiement: string;
  produits: ProduitCommande[];
};

export function useCommandes(token: string) {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCommandes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/commandes/afficherAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) setCommandes(data.data || []);
      else setCommandes([]);
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
      setCommandes([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCommandes();
  }, [fetchCommandes]);

  return { commandes, loading, refresh: fetchCommandes };
}
