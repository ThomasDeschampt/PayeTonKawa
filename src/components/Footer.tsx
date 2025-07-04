import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 'auto' }}>
      <Box
        sx={{
          backgroundColor: '#2E2E2E',
          color: 'white',
          py: 6,
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: 1, minWidth: '250px' }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.2rem',
                  color: '#D4AF37',
                  letterSpacing: '0.1em',
                  mb: 2
                }}
              >
                PAYE TON KAWA
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#CCCCCC'
                }}
              >
                Votre torréfacteur artisanal depuis 2018.
                Découvrez nos cafés d&apos;exception,
                sélectionnés avec passion pour vous offrir
                une expérience gustative unique.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: '150px' }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  mb: 2,
                  color: '#D4AF37'
                }}
              >
                Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/conseils" style={{ color: '#CCCCCC', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <InfoIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: '0.9rem', '&:hover': { color: '#D4AF37' } }}>
                    Nos conseils
                  </Typography>
                </Link>
                <Link href="/compte" style={{ color: '#CCCCCC', textDecoration: 'none' }}>
                  <Typography sx={{ fontSize: '0.9rem', '&:hover': { color: '#D4AF37' } }}>
                    Mon compte
                  </Typography>
                </Link>
                <Link href="/panier" style={{ color: '#CCCCCC', textDecoration: 'none' }}>
                  <Typography sx={{ fontSize: '0.9rem', '&:hover': { color: '#D4AF37' } }}>
                    Panier
                  </Typography>
                </Link>
              </Box>
            </Box>

            <Box sx={{ flex: 1, minWidth: '150px' }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  mb: 2,
                  color: '#D4AF37'
                }}
              >
                Informations légales
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/mentions-legales" style={{ color: '#CCCCCC', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GavelIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: '0.9rem', '&:hover': { color: '#D4AF37' } }}>
                    Mentions légales
                  </Typography>
                </Link>
                <Link href="/cgv" style={{ color: '#CCCCCC', textDecoration: 'none' }}>
                  <Typography sx={{ fontSize: '0.9rem', '&:hover': { color: '#D4AF37' } }}>
                    CGV
                  </Typography>
                </Link>
                <Link href="/confidentialite" style={{ color: '#CCCCCC', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SecurityIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: '0.9rem', '&:hover': { color: '#D4AF37' } }}>
                    Confidentialité
                  </Typography>
                </Link>
              </Box>
            </Box>

            <Box sx={{ flex: 1, minWidth: '200px' }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  mb: 2,
                  color: '#D4AF37'
                }}
              >
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: '#D4AF37' }} />
                  <Typography sx={{ fontSize: '0.9rem', color: '#CCCCCC' }}>
                    7 rue Jean Marie Leclair<br />
                    69009 Lyon, France
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, color: '#D4AF37' }} />
                  <Typography sx={{ fontSize: '0.9rem', color: '#CCCCCC' }}>
                    01 23 45 67 89
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#D4AF37' }} />
                  <Typography sx={{ fontSize: '0.9rem', color: '#CCCCCC' }}>
                    contact@payetonkawa.fr
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: '#1A1A1A',
          color: '#CCCCCC',
          py: 2,
          fontSize: '0.875rem',
          borderTop: '1px solid #444',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}
          >
            <Typography sx={{ fontSize: '0.8rem' }}>
              © 2025 Paye Ton Kawa. Tous droits réservés.
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#D4AF37' }}>
              Torréfacteur artisanal depuis 2018
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
