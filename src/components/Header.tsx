'use client';

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Container
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import Link from 'next/link';
import { usePanier } from '@/hooks/usePanier';

export default function Header() {
  const { totalArticles } = usePanier();
  const logo = '/paye-ton-kawa-logo.png';

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#2E2E2E',
          color: '#D4AF37',
          py: 0.5,
          fontSize: '0.875rem',
          borderBottom: '1px solid #444',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2
            }}
          >
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="/boutiques" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <StoreIcon sx={{ fontSize: 16 }} />
                NOS BOUTIQUES
              </Link>
              <Link href="/conseils" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
                <InfoIcon sx={{ fontSize: 16 }} />
                NOS CONSEILS
              </Link>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="/mon-compte" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AccountCircle sx={{ fontSize: 16 }} />
                MON COMPTE
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#FEFEFE',
          color: '#2E2E2E',
          borderBottom: '1px solid #E0E0E0',
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, sm: 0 }
            }}
          >

            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box component="img" src={logo} alt="Logo Paye Ton Kawa" sx={{ height: 60, width: 'auto' }} />
            </Link>

            <Box sx={{ textAlign: 'center', flex: 1, pointerEvents: 'none' }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 400,
                  fontSize: '1.8rem',
                  color: '#2E2E2E',
                  letterSpacing: '0.15em',
                }}
              >
                PAYE TON KAWA
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '0.9rem',
                  color: '#D4AF37',
                  letterSpacing: '0.1em',
                  fontStyle: 'italic'
                }}
              >
                Depuis 2025
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href="/panier" passHref>
                <IconButton
                  aria-label="Panier"
                  sx={{
                    color: '#2E2E2E',
                    '&:hover': { color: '#D4AF37' }
                  }}
                >
                  <Badge
                    badgeContent={totalArticles}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#D4AF37',
                        color: '#2E2E2E',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: 24 }} />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                aria-label="Recherche"
                sx={{
                  color: '#2E2E2E',
                  '&:hover': { color: '#D4AF37' }
                }}
              >
                <SearchIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
