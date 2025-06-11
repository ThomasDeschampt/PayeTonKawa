'use client';

import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { usePanier } from '@/hooks/usePanier';

export default function Header() {
  const { totalArticles } = usePanier();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography variant="h6" component="div">
            Ma Boutique
          </Typography>
        </Link>

        <Box>
          <IconButton color="inherit" aria-label="Profil">
            <AccountCircle />
          </IconButton>

          <Link href="/panier" passHref>
            <IconButton color="inherit" aria-label="Panier">
              <Badge badgeContent={totalArticles} color="error" showZero={false}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}