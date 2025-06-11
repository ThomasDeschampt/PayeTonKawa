'use client';

import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Link from 'next/link';

const DEFAULT_IMAGE = '/test.jpg';

type Produit = {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  stock: number;
  photo_url?: string;
};

export default function ProduitCard({ produit }: { produit: Produit }) {
  const imgSrc = produit.photo_url?.trim() ? produit.photo_url : DEFAULT_IMAGE;

  return (
    <Link href={`/produits/${produit.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 6,
          },
        }}
      >
        {/* Image avec hauteur fixe */}
        <CardMedia
          component="img"
          image={imgSrc}
          alt={produit.nom}
          sx={{
            height: 200,
            objectFit: 'cover',
            backgroundColor: '#f5f5f5',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
          }}
        />

        {/* Contenu avec espace flexible */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom noWrap>
              {produit.nom}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {produit.description || 'Pas de description'}
            </Typography>
          </Box>

          <Box mt="auto">
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              {produit.prix.toFixed(2)} €
            </Typography>
            <Typography
              variant="caption"
              color={produit.stock > 0 ? 'success.main' : 'error.main'}
            >
              {produit.stock > 0 ? `Stock: ${produit.stock}` : 'Rupture de stock'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
