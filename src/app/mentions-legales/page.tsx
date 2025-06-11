'use client';

import { Box, Container, Typography } from '@mui/material';

export default function MentionsLegales() {
  return (
    <Box sx={{ backgroundColor: '#FEFEFE', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, serif', mb: 4, textAlign: 'center', color: '#2E2E2E' }}>
          Mentions légales
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Éditeur du site
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Raison sociale : PayeTonKawa
          <br />
          Adresse : 7 rue Jean Marie Leclair, 69009 Lyon, France
          <br />
          Email : contact@payetonkawa.fr  
          <br />
          Téléphone : 01 23 45 67 89 
          <br />
          Numéro SIRET : A venir
          <br />
          Directeur de la publication : Paye Ton Kawa
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Propriété intellectuelle
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Le contenu du site (textes, images, graphismes, logo, icônes, etc.) est protégé par le droit d’auteur. Toute reproduction ou représentation, intégrale ou partielle, est interdite sans autorisation préalable.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Données personnelles
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant. Pour exercer ces droits, veuillez nous contacter à l’adresse indiquée ci-dessus.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Cookies
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Ce site utilise des cookies pour améliorer l’expérience utilisateur. En naviguant sur ce site, vous acceptez l’utilisation de cookies.
        </Typography>
      </Container>
    </Box>
  );
}
