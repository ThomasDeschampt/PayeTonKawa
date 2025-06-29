'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { usePanier } from '@/context/PanierContext';

const DEFAULT_IMAGE = '/test.jpg';

type Produit = {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  stock: number;
  photo_url?: string;
};

const StyledImage = styled('img')({
  width: '100%',
  maxHeight: 400,
  objectFit: 'cover',
  borderRadius: 16,
  backgroundColor: '#f9f9f9',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
});

export default function ProduitDetail({ produit }: { produit: Produit }) {
  const router = useRouter();
  const imgSrc = produit.photo_url?.trim() ? produit.photo_url : DEFAULT_IMAGE;
  const { ajouterProduit } = usePanier();

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: 1200, mx: 'auto' }}>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={() => router.back()}>
        ← Retour
      </Button>

      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <StyledImage
            src={imgSrc}
            alt={produit.nom}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
            }}
          />
        </Box>

        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {produit.nom}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {produit.description || 'Pas de description disponible.'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
            {produit.prix.toFixed(2)} €
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1, color: produit.stock > 0 ? 'green' : 'error.main' }}>
            {produit.stock > 0 ? `En stock (${produit.stock})` : 'Rupture de stock'}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, px: 4, py: 1.5 }}
            disabled={produit.stock <= 0}
            onClick={() => {
              ajouterProduit({ id: produit.id, nom: produit.nom, prix: produit.prix, photo_url: produit.photo_url });
            }}
          >
            Ajouter au panier
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
