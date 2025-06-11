'use client';

import { Box, Container, Typography } from '@mui/material';

export default function Confidentialite() {
  return (
    <Box sx={{ backgroundColor: '#FEFEFE', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, serif', mb: 4, textAlign: 'center', color: '#2E2E2E' }}>
          Politique de Confidentialité
        </Typography>

        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Cette politique de confidentialité décrit comment PayeTonKawa collecte, utilise et protège les informations personnelles que vous nous transmettez via notre site PayeTonKawa.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          1. Collecte des informations
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Nous collectons les informations que vous nous fournissez lors de l'inscription, de la commande ou du contact via le site. Cela inclut : nom, prénom, adresse e-mail, adresse postale, numéro de téléphone.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          2. Utilisation des données
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Vos données sont utilisées uniquement pour le traitement des commandes, la gestion de la relation client, l’envoi d’informations.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          3. Partage des données
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Vos données ne sont jamais vendues ni partagées à des tiers sans votre accord explicite, sauf obligations légales ou partenaires nécessaires à l’exécution de vos commandes (transporteurs, prestataires de paiement).
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          4. Sécurité
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Nous mettons en œuvre toutes les mesures nécessaires pour protéger vos données : chiffrement, protocoles sécurisés (HTTPS), accès restreint.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          5. Cookies
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Le site utilise des cookies pour améliorer l'expérience utilisateur et les statistiques de navigation. Vous pouvez les désactiver dans les paramètres de votre navigateur.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          6. Durée de conservation
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Vos données sont conservées pendant la durée strictement nécessaire à la gestion de la relation commerciale et au respect des obligations légales.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          7. Vos droits
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, de suppression, et d’opposition sur vos données. Contactez-nous à contact@payetonkawa.fr pour exercer vos droits.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          8. Contact
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Pour toute question concernant cette politique, vous pouvez nous contacter à : contact@payetonkawa.fr ou par courrier au : 7 rue Jean Marie Leclair.
        </Typography>
      </Container>
    </Box>
  );
}
