'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  Container, Typography, Divider, Box, CircularProgress
} from '@mui/material';
import { Client } from '@/lib/types';
import Cookies from 'universal-cookie';

export default function MonCompte() {
  const { user, loading } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    const fetchClient = async () => {
      if (!user) return;
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
        setError('Erreur lors de la récupération');
      }
    };

    fetchClient();
  }, [user]);

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
        <Typography>Créé le : {new Date(client.createdAt).toLocaleDateString()}</Typography>
      </Box>

    </Container>
  );
}
