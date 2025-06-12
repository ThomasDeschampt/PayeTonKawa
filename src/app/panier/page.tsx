'use client';

import { usePanier } from '@/hooks/usePanier';
import { Box, Typography, List, ListItem, IconButton, Paper, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const DEFAULT_IMAGE = '/test.jpg';

const StyledImage = styled('img')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  borderRadius: 8,
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

export default function PanierPage() {
  const { panier, retirerProduit, viderPanier, isReady } = usePanier();

  if (!isReady) return <Typography>Chargement du panier...</Typography>;

  const total = panier.reduce((acc, produit) => acc + produit.prix * (produit.quantity || 1), 0);

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Mon Panier
      </Typography>

      {panier.length === 0 ? (
        <Typography>Votre panier est vide.</Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 4 }}>
          <List>
            {panier.map((produit) => {
              const imgSrc = produit.photo_url?.trim() ? produit.photo_url : DEFAULT_IMAGE;
              return (
                <Box key={produit.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StyledImage
                    src={imgSrc}
                    alt={produit.nom}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
                    }}
                  />
                  <ListItem
                    sx={{ flexGrow: 1 }}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => retirerProduit(produit.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Typography sx={{ flexGrow: 1 }}>
                      {produit.nom} x {produit.quantity || 1}
                    </Typography>
                    <Typography>{(produit.prix * (produit.quantity || 1)).toFixed(2)} €</Typography>
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
          </List>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Total: {total.toFixed(2)} €
            </Typography>
            <Button variant="contained" color="error" onClick={viderPanier}>
              Vider le panier
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
