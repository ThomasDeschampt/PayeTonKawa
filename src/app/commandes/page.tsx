'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { Commande, ProduitCommande, Produit } from '@/lib/types';
import Cookies from 'universal-cookie';
import Link from 'next/link';

export default function ToutesCommandes() {
  const { user, loading } = useAuth();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [produitsDetails, setProduitsDetails] = useState<Produit[]>([]);
  const [error, setError] = useState<string | null>(null);

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    const fetchCommandes = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/commandes/afficherparclient/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && data.data) {
          const sortedCommandes = data.data.sort(
            (a: Commande, b: Commande) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setCommandes(sortedCommandes);


          const idsProduits = Array.from(
            new Set(
              sortedCommandes.flatMap((c: Commande) =>
                c.produits.map((p: ProduitCommande) => p.id_prod)
              )
            )
          );                  

          const produitsFaits = await Promise.all(
            idsProduits.map(async (id) => {
              try {
                const resProd = await fetch(`/api/produits/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (!resProd.ok) return null;
                const dataProd = await resProd.json();
                if (dataProd.success) return dataProd.data as Produit;
                return null;
              } catch {
                return null;
              }
            })
          );

          setProduitsDetails(produitsFaits.filter(Boolean) as Produit[]);
        } else {
          setError(data.message || 'Erreur lors de la récupération');
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des commandes');
      }
    };

    fetchCommandes();
  }, [user]);

  if (loading) return <CircularProgress />;
  if (!user) return <Typography>Veuillez vous connecter.</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Mes Commandes
      </Typography>

      {commandes.length === 0 ? (
        <Typography>Aucune commande trouvée.</Typography>
      ) : (
        commandes.map((commande) => (
          <Box
            key={commande.id}
            sx={{
              mb: 3,
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Commande #{commande.id}</Typography>
            <Typography>Date : {new Date(commande.created_at).toLocaleString()}</Typography>
            <Typography>Montant : {commande.montant.toFixed(2)} €</Typography>
            <Typography>Statut : {commande.statut}</Typography>
            <Typography>Mode de paiement : {commande.mode_paiement}</Typography>

            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1">Produits :</Typography>
              <ul>
                {commande.produits.map((produit: ProduitCommande, index) => {
                  const details = produitsDetails.find((p) => p.id === produit.id_prod);
                  return (
                    <li key={index}>
                      {details ? details.nom : produit.nom || 'Produit inconnu'} – {produit.quantite} × {(details?.prix ?? 0).toFixed(2)} €
                    </li>
                  );
                })}
              </ul>
            </Box>
          </Box>
        ))
      )}

      <Divider sx={{ my: 4 }} />

      <Link href="/mon-compte" passHref>
        <Button variant="outlined">Retour à mon compte</Button>
      </Link>
    </Container>
  );
}
