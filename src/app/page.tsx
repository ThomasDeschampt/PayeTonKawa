'use client';

import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f7f3ef 60%, #e9dbc7 100%)', minHeight: '100vh', pb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            position: 'relative',
            height: { xs: 280, md: 420 },
            width: '100%',
            mb: 6,
            overflow: 'hidden',
            borderRadius: { xs: '0 0 32px 32px', md: '0 0 48px 48px' },
            boxShadow: '0 8px 32px #0002',
          }}
        >
          <Image
            src="/images/cafe.jpg"
            alt="Ambiance café Paye Ton Kawa"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
            priority
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              zIndex: 2,
              textShadow: '0 2px 16px #000a',
              gap: { xs: 2, md: 6 },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: '0.08em', mb: 2, fontFamily: 'Montserrat, serif', fontSize: { xs: '2rem', md: '3.5rem' }, textShadow: '0 2px 12px #bfa76a33' }}>
                Paye Ton Kawa
              </Typography>
              <Typography variant="h5" sx={{ color: '#D4AF37', fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.7rem' }, textShadow: '0 2px 12px #bfa76a33' }}>
                L'art du café, la passion du goût
              </Typography>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{ marginTop: 32 }}
              >
                <Link href="/produits" style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 1.5,
                      bgcolor: '#D4AF37',
                      color: '#fff',
                      borderRadius: '32px',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 16px #0003',
                      transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        bgcolor: '#bfa76a',
                        transform: 'scale(1.07)',
                        boxShadow: '0 0 0 4px #e9dbc7',
                      },
                      cursor: 'pointer',
                      display: 'inline-block',
                    }}
                  >
                    Découvrir nos cafés
                  </Box>
                </Link>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="md" sx={{ mt: { xs: 2, md: 4 }, mb: 2 }}>
          <Box sx={{
            bgcolor: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 32px #0001',
            p: { xs: 2, md: 4 },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}>
            <Typography variant="h5" sx={{ color: '#bfa76a', fontWeight: 700, letterSpacing: '0.04em' }}>
              Notre mission
            </Typography>
            <Typography variant="body1" sx={{ color: '#6B4F27', fontSize: '1.15rem', maxWidth: 500 }}>
              <b>Paye Ton Kawa</b> s'engage à offrir un café d'exception, respectueux de la planète et des producteurs, pour transformer chaque pause en un moment unique de partage et de plaisir.
            </Typography>
          </Box>
        </Container>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: { xs: 2, md: 4 } }}>
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12 Q30 24 60 12 Q90 0 120 12" stroke="#bfa76a" strokeWidth="3" fill="none" />
          </svg>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
            <Box sx={{ flex: 1, minWidth: 260 }}>
              <Image
                src="/images/histoire-cafe.jpg"
                alt="Notre histoire"
                width={500}
                height={340}
                style={{ borderRadius: '18px', boxShadow: '0 4px 32px #0002', objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="h4" sx={{ color: '#6B4F27', fontWeight: 700, mb: 2 }}>
                Notre histoire
              </Typography>
              <Typography variant="body1" sx={{ color: '#4B3A1A', fontSize: '1.15rem', mb: 2 }}>
                Depuis 2018, <b>Paye Ton Kawa</b> sélectionne les meilleurs grains pour offrir une expérience café unique. Notre passion : révéler la richesse des arômes, respecter la terre et partager l'art du café avec vous.
              </Typography>
              <Typography variant="body2" sx={{ color: '#8d6e4a', fontStyle: 'italic' }}>
                "Chaque tasse raconte une histoire, chaque grain est une invitation au voyage."
              </Typography>
            </Box>
          </Box>
        </Container>
      </motion.div>

      <motion.div
        id="valeurs"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ color: '#6B4F27', fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Nos valeurs
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 4,
              mb: 6,
            }}
          >
            <ValueCard icon="☕" title="Torréfaction artisanale" desc="Respect des arômes et du savoir-faire traditionnel." />
            <ValueCard icon="🌱" title="Commerce équitable" desc="Soutien aux producteurs et agriculture durable." />
            <ValueCard icon="👨‍🌾" title="Sélection rigoureuse" desc="Grains d'exception, fraîcheur garantie." />
            <ValueCard icon="💡" title="Conseils experts" desc="Astuces pour préparer le café parfait chez vous." />
          </Box>
        </Container>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="md">
          <Box sx={{
            bgcolor: '#fffbe9',
            borderRadius: '18px',
            boxShadow: '0 2px 24px #0001',
            p: { xs: 3, md: 5 },
            textAlign: 'center',
            mt: 4,
          }}>
            <Typography variant="h5" sx={{ color: '#8d6e4a', fontStyle: 'italic', mb: 1 }}>
              « Le café, c'est bien plus qu'une boisson, c'est un art de vivre. »
            </Typography>
            <Typography variant="body2" sx={{ color: '#bfa76a' }}>
              — L'équipe Paye Ton Kawa
            </Typography>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
}

function CafeCupSteam() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tasse */}
      <ellipse cx="60" cy="90" rx="36" ry="12" fill="#bfa76a" fillOpacity="0.18" />
      <rect x="32" y="60" width="56" height="32" rx="16" fill="#fff" stroke="#bfa76a" strokeWidth="2" />
      <ellipse cx="60" cy="60" rx="28" ry="10" fill="#6B4F27" />
      {/* Anse */}
      <path d="M88 76 Q104 80 88 92" stroke="#bfa76a" strokeWidth="5" fill="none" />
      {/* Vapeur animée */}
      <path>
        <animate attributeName="d" dur="2.5s" repeatCount="indefinite"
          values="M55 50 Q57 40 60 50 Q63 60 65 50;M55 52 Q57 38 60 52 Q63 66 65 52;M55 50 Q57 40 60 50 Q63 60 65 50" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
      </path>
      <path>
        <animate attributeName="d" dur="2.2s" repeatCount="indefinite"
          values="M70 54 Q72 44 74 54 Q76 64 78 54;M70 56 Q72 42 74 56 Q76 68 78 56;M70 54 Q72 44 74 54 Q76 64 78 54" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function ValueCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.18} glareColor="#D4AF37" tiltMaxAngleX={18} tiltMaxAngleY={18} scale={1.04} transitionSpeed={250} style={{ borderRadius: 16 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 16px #0001',
            p: 3,
            textAlign: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-6px) scale(1.07)',
              boxShadow: '0 8px 32px #0002',
              bgcolor: '#f7f3ef',
            },
          }}
        >
          <Typography variant="h2" sx={{ mb: 1, fontSize: '2.5rem', color: '#D4AF37' }}>{icon}</Typography>
          <Typography variant="h6" sx={{ color: '#6B4F27', fontWeight: 600, mb: 1 }}>{title}</Typography>
          <Typography variant="body2" sx={{ color: '#4B3A1A' }}>{desc}</Typography>
        </Box>
      </motion.div>
    </Tilt>
  );
}
