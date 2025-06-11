'use client';

import Link from 'next/link';
import { useProduits } from '@/hooks/useProduits';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material';
import ProduitCard from '@/components/ProduitCard';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProduitsPage() {
  const { produits, loading } = useProduits();

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: 1400, mx: 'auto' }}>
<Box
        sx={{
          backgroundColor: '#F8F8F8',
          borderBottom: '1px solid #E0E0E0',
          py: 1.5
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                color: '#2E2E2E',
                fontSize: '1.2rem',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                position: 'relative',
                display: 'inline-block',
                fontFamily: 'Montserrat, sans-serif',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  width: '60px',
                  height: '1px',
                  backgroundColor: '#D4AF37'
                },
                '&::before': {
                  left: '-80px'
                },
                '&::after': {
                  right: '-80px'
                }
              }}
            >
              CAFÉS
            </Typography>
          </Box>
        </Container>
      </Box>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Trouvez ce dont vous avez besoin parmi notre sélection.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {produits.map((prod) => (
            <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
              <ProduitCard produit={prod} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
