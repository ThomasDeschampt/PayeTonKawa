'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ProduitDetail from '@/components/ProduitDetail';

const DEFAULT_IMAGE = '/test.jpg';

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
  const router = useRouter();

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
    } catch (e) {
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
