'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { Client, Commande, ProduitCommande, Produit } from '@/lib/types';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { useRouter } from 'next/navigation';

export default function MonCompte() {
  const { user, loading } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [lastCommande, setLastCommande] = useState<Commande | null>(null);
  const [produitsDetails, setProduitsDetails] = useState<Produit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    if (!user) return;

    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setClient(data.data);
        } else {
          setError(data.message || 'Erreur inconnue');
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la récupération du compte');
      }
    };

    const fetchLastCommandeWithProduits = async () => {
      try {
        const res = await fetch(`/api/commandes/afficherparclient/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.success && data.data?.length > 0) {
          const commandes: Commande[] = data.data;
          commandes.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          const last = commandes[0];
          setLastCommande(last);

          const produits: ProduitCommande[] = last.produits;

          const detailsPromises = produits.map((p) =>
            fetch(`/api/produits/${p.id_prod}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((res) => res.json())
              .then((result) => (result.success ? result.data : null))
              .catch(() => null)
          );

          const details = await Promise.all(detailsPromises);
          setProduitsDetails(details.filter((p): p is Produit => p !== null));
        }
      } catch (err) {
        console.error('Erreur fetchLastCommandeWithProduits:', err);
      }
    };

    fetchClient();
    fetchLastCommandeWithProduits();
  }, [user]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`/api/clients/${user!.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
  
      if (data.success) {
        alert('Compte supprimé avec succès.');
        const cookies = new Cookies();
        cookies.remove('token', { path: '/' });
        router.push('/');
      } else {
        alert('Erreur lors de la suppression : ' + (data.message || 'Erreur inconnue'));
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression du compte.');
    } finally {
      setConfirmOpen(false);
    }
  };
  

  if (loading) return <CircularProgress />;
  if (!user) return <Typography>Veuillez vous connecter.</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!client) return <Typography>Chargement des informations...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Mon Compte
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Informations utilisateur</Typography>
        <Typography>ID : {client.id}</Typography>
        <Typography>Pseudo : {client.pseudo}</Typography>
        <Typography>Role ID : {client.roleId}</Typography>
        <Typography>
          Créé le : {new Date(client.createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Dernière commande
        </Typography>

        {lastCommande ? (
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography>Commande ID : {lastCommande.id}</Typography>
            <Typography>
              Date : {new Date(lastCommande.created_at).toLocaleString()}
            </Typography>
            <Typography>
              Montant : {lastCommande.montant.toFixed(2)} €
            </Typography>
            <Typography>Statut : {lastCommande.statut}</Typography>
            <Typography>Mode de paiement : {lastCommande.mode_paiement}</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Produits :</Typography>
              <ul>
                {lastCommande.produits.map((produit, index) => {
                  const details = produitsDetails.find((p) => p.id === produit.id_prod);
                  return (
                    <li key={index}>
                      {details ? details.nom : 'Produit inconnu'} – {produit.quantite} ×{' '}
                      {(details?.prix ?? 0).toFixed(2)} €
                    </li>
                  );
                })}
              </ul>
            </Box>
          </Box>
        ) : (
          <Typography>Aucune commande récente trouvée.</Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Link href="/commandes" passHref>
            <Button variant="outlined">Voir toutes mes commandes</Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setConfirmOpen(true)}
        >
          Supprimer mon compte
        </Button>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirmation de suppression"
        description="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        onConfirm={handleDeleteAccount}
        onCancel={() => setConfirmOpen(false)}
      />
    </Container>
  );
}
