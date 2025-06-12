'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { verifyJwtToken } from '@/lib/auth';

export default function LoginPage() {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');
  const router = useRouter();

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErreur('');

    try {
      const res = await fetch('/api/clients/verifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, motDePasse })
      });

      if (!res.ok) throw new Error('Erreur serveur');

      const data = await res.json();

      if (data?.success === true) {
        console.log('Token reçu:', data.token);

        // Vérification du token
        const payload = await verifyJwtToken(data.token);
        console.log('Payload JWT vérifié:', payload);

        router.push('/');
      } else {
        setErreur('Identifiants incorrects.');
      }
    } catch {
      setErreur('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>

        <Box component="form" onSubmit={handleConnexion} sx={{ mt: 2 }}>
          <TextField
            label="Pseudo"
            fullWidth
            required
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            margin="normal"
          />

          {erreur && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {erreur}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Se connecter'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
