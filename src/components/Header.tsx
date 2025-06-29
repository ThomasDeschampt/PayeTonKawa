'use client';

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import { useState } from 'react';
import { usePanier } from '@/context/PanierContext';
import { useAuth } from '@/hooks/useAuth';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function Header() {
  const { user, logout } = useAuth();
  const logo = '/paye-ton-kawa-logo.png';

  const { totalArticles } = usePanier();
  const hasItems = totalArticles > 0;
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    if (logout) {
      logout();
    }
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#2E2E2E',
          color: '#D4AF37',
          py: 0.5,
          fontSize: '0.875rem',
          borderBottom: '1px solid #444',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="/conseils"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <InfoIcon sx={{ fontSize: 16 }} />
                NOS CONSEILS
              </Link>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {user ? (
                <>
                  <Tooltip title="Compte">
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                      <PersonOutlineIcon sx={{ fontSize: 32, color: '#D4AF37' }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleMenuClose} component={Link} href="/compte">
                      Mon compte
                    </MenuItem>
                    {user.role?.toLowerCase() === 'admin' && (
                      <MenuItem onClick={handleMenuClose} component={Link} href="/admin">
                        Administration
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    CONNEXION
                  </Link>
                  <Link
                    href="/inscription"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    INSCRIPTION
                  </Link>
                </>
              )}
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
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, sm: 0 },
            }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                component="img"
                src={logo}
                alt="Logo Paye Ton Kawa"
                sx={{ height: 60, width: 'auto' }}
              />
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
                  fontStyle: 'italic',
                }}
              >
                Depuis 2018
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href="/panier" passHref>
                <IconButton
                  aria-label="Panier"
                  sx={{
                    color: hasItems ? '#D4AF37' : '#2E2E2E',
                    backgroundColor: hasItems ? '#2E2E2E' : 'transparent',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#D4AF37',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Badge
                    badgeContent={totalArticles}
                    invisible={!hasItems}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#D4AF37',
                        color: '#2E2E2E',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    {hasItems ? (
                      <ShoppingCartCheckoutIcon sx={{ fontSize: 24 }} />
                    ) : (
                      <ShoppingCartIcon sx={{ fontSize: 24 }} />
                    )}
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                aria-label="Recherche"
                sx={{
                  color: '#2E2E2E',
                  '&:hover': { color: '#D4AF37' },
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
