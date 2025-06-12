'use client';

import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 10,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green' }} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        Merci pour votre commande !
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, maxWidth: 500 }}>
        Votre commande a été enregistrée avec succès. Vous recevrez un e-mail de confirmation si nécessaire.
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => router.push('/')}
      >
        Retour à l’accueil
      </Button>
    </Box>
  );
}
