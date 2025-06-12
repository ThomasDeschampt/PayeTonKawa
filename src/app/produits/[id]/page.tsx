'use client';

import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import ProduitDetail from '@/components/ProduitDetail';


type Produit = {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  stock: number;
  photo_url?: string;
};

export default function ProduitDetailPage({ params }: { params: { id: string } }) {
  const [produit, setProduit] = useState<Produit | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduit = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/produits/${id}`);
      const data = await res.json();
      if (data.success && data.data) {
        setProduit(data.data);
      } else {
        setProduit(null);
      }
    } catch {
      setProduit(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduit(params.id);
    }
  }, [params]);

  if (loading) return <Typography>Chargement du produit...</Typography>;
  if (!produit) return <Typography>Produit non trouvé.</Typography>;

  return (
    <ProduitDetail produit={produit} />
  );
}
