'use client';

import React from 'react';
import { useProduits } from '@/hooks/useProduits';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import ProduitCard from '@/components/ProduitCard';
import { useAuth } from '@/hooks/useAuth';

export default function ProduitsPage() {
  const { produits, loading } = useProduits();
  const { user } = useAuth();
  console.log('userrrrrrr',user)

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, mx: 'auto' }}>
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
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px',
        }}>
          {produits.map((prod) => (
            <Box key={prod.id}>
              <ProduitCard produit={prod} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}