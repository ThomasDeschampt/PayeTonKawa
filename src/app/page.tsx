'use client';

import Link from 'next/link';
import { useProduits } from '@/hooks/useProduits';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProduitCard from '@/components/ProduitCard';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProduitsPage() {
  const { produits, loading } = useProduits();

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Découvrez nos produits
      </Typography>

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
