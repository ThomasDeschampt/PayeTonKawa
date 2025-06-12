'use client';

import { usePanier } from '@/hooks/usePanier';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box, Typography, List, ListItem, IconButton,
  Paper, Divider, Button, RadioGroup, FormControlLabel,
  Radio, FormHelperText, FormControl, FormLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Cookies from 'universal-cookie';

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
  const { user, loading } = useAuth();
  const router = useRouter();

  const [modePaiement, setModePaiement] = useState('');
  const [erreurModePaiement, setErreurModePaiement] = useState('');

  if (!isReady || loading) return <Typography>Chargement...</Typography>;

  const total = panier.reduce((acc, produit) => acc + produit.prix * (produit.quantity || 1), 0);

  const validerCommande = async () => {
    if (!user) {
      router.push('/connexion');
      return;
    }
    if (!modePaiement) {
      setErreurModePaiement('Veuillez choisir un mode de paiement.');
      return;
    }
    setErreurModePaiement('');

    const cookies = new Cookies();
    const token = cookies.get('token');
    try {
      const res = await fetch('/api/commandes/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          produits: panier.map(p => ({
            uuid_produit: p.id,
            quantite: p.quantity || 1,
          })),
          mode_paiement: modePaiement,
          statut: 'en attente',
          uuid_client: user.id,
        }),        
      });

      if (!res.ok) throw new Error('Erreur lors de la commande');

      viderPanier();
      router.push('/confirmation');
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue lors de la commande.');
    }
  };

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

          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset" error={!!erreurModePaiement}>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Mode de paiement
              </FormLabel>
              <RadioGroup
                value={modePaiement}
                onChange={(e) => setModePaiement(e.target.value)}
                row
              >
                <FormControlLabel value="cb" control={<Radio />} label="Carte bancaire" />
                <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                <FormControlLabel value="virement" control={<Radio />} label="Virement bancaire" />
              </RadioGroup>
              {!!erreurModePaiement && (
                <FormHelperText>{erreurModePaiement}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total: {total.toFixed(2)} €</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="error" onClick={viderPanier}>
                Vider le panier
              </Button>
              <Button variant="contained" color="primary" onClick={validerCommande}>
                Valider la commande
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
