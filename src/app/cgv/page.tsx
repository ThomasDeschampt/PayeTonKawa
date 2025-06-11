'use client';

import { Box, Container, Typography } from '@mui/material';

export default function ConditionsVente() {
  return (
    <Box sx={{ backgroundColor: '#FEFEFE', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, serif', mb: 4, textAlign: 'center', color: '#2E2E2E' }}>
          Conditions Générales de Vente
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 1 – Objet
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Les présentes conditions régissent les ventes effectuées sur le site PayeTonKawa entre PayeTonKawa et tout client effectuant un achat.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 2 – Produits
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Les produits proposés sont décrits et présentés avec la plus grande exactitude possible. Toutefois, des erreurs ou omissions peuvent survenir.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 3 – Prix
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC). L’entreprise se réserve le droit de modifier ses prix à tout moment.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 4 – Commande
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Toute commande implique l’acceptation pleine et entière des présentes CGV. Après validation, un e-mail de confirmation est envoyé au client.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 5 – Paiement
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Le paiement est exigible immédiatement à la commande. Il peut s’effectuer par carte bancaire, virement ou tout autre moyen proposé sur le site.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 6 – Livraison
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Les produits sont livrés à l’adresse indiquée par le client. Les délais sont donnés à titre indicatif. Aucun remboursement ne pourra être exigé pour un léger retard.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 7 – Droit de rétractation
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Conformément à la loi, le client dispose de 14 jours pour se rétracter à compter de la réception du produit. Les frais de retour sont à la charge du client.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 8 – Responsabilité
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          L’entreprise ne saurait être tenue pour responsable des dommages résultant d’une mauvaise utilisation du produit acheté.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 9 – Litiges
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          En cas de litige, une solution amiable sera recherchée. À défaut, le litige sera porté devant les tribunaux compétents.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#2E2E2E' }}>
          Article 10 – Données personnelles
        </Typography>
        <Typography sx={{ color: '#555', lineHeight: 1.8 }}>
          Les informations collectées sont nécessaires à la gestion des commandes. Elles ne sont en aucun cas transmises à des tiers sans consentement.
        </Typography>
      </Container>
    </Box>
  );
}
