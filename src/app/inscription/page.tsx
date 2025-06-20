'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import Link from 'next/link';

export default function InscriptionPage() {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [isEntreprise, setIsEntreprise] = useState(false);
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [siret, setSiret] = useState('');

  const [roleId] = useState(2); // Client = 2
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');
  const router = useRouter();

  const handleInscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setLoading(true);

    try {
      const body: any = {
        pseudo,
        motDePasse,
        roleId,
        personne: {
          nom,
          prenom,
          mail,
          telephone,
          dateNaissance: new Date(dateNaissance).toISOString()
        }
      };

      if (isEntreprise) {
        body.entreprise = {
          nomEntreprise,
          siret
        };
      }

      const res = await fetch('/api/clients/ajouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de l’inscription');
      }

      router.push('/connexion');
    } catch (err: any) {
      setErreur(err.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Inscription</Typography>

        <Box component="form" onSubmit={handleInscription} sx={{ mt: 2 }}>
          <TextField label="Pseudo" fullWidth required value={pseudo} onChange={(e) => setPseudo(e.target.value)} margin="normal" />
          <TextField label="Mot de passe" type="password" fullWidth required value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} margin="normal" />
          <TextField label="Nom" fullWidth required value={nom} onChange={(e) => setNom(e.target.value)} margin="normal" />
          <TextField label="Prénom" fullWidth required value={prenom} onChange={(e) => setPrenom(e.target.value)} margin="normal" />
          <TextField label="Email" fullWidth required type="email" value={mail} onChange={(e) => setMail(e.target.value)} margin="normal" />
          <TextField label="Téléphone" fullWidth required value={telephone} onChange={(e) => setTelephone(e.target.value)} margin="normal" />
          <TextField label="Date de naissance" fullWidth required type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} InputLabelProps={{ shrink: true }} margin="normal" />

          <FormControlLabel
            control={<Checkbox checked={isEntreprise} onChange={(e) => setIsEntreprise(e.target.checked)} />}
            label="Je représente une entreprise"
          />

          {isEntreprise && (
            <>
              <TextField label="Nom de l'entreprise" fullWidth required value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} margin="normal" />
              <TextField label="SIRET" fullWidth required value={siret} onChange={(e) => setSiret(e.target.value)} margin="normal" />
            </>
          )}

          {erreur && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>{erreur}</Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Créer mon compte'}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Déjà un compte ?{' '}
            <Link href="/connexion" style={{ textDecoration: 'underline' }}>
              Connectez-vous
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
