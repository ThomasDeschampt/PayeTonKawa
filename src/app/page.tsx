'use client';

import { useProduits } from '@/hooks/useProduits';
import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ajouterProduit, modifierProduit, supprimerProduit } from '@/hooks/produitsActions';

export default function ProduitsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [stock, setStock] = useState(10);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setToken(process.env.NEXT_PUBLIC_TOKEN ?? null);
  }, []);

  const { produits, loading, refresh } = useProduits(token || '');

  useEffect(() => {
    if (!editingId) {
      setNom('');
      setDescription('');
      setPrix(0);
      setStock(10);
    }
  }, [produits, editingId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    if (editingId) {
      const result = await modifierProduit(token, editingId, { nom, description, prix, stock });
      if (result.success) setEditingId(null);
    } else {
      await ajouterProduit(token, { nom, description, prix, stock });
    }

    refresh();
  }

  async function handleDelete(id: string) {
    if (!token || !confirm('Supprimer ce produit ?')) return;
    await supprimerProduit(token, id);
    refresh();
  }

  function startEdit(prod: any) {
    setEditingId(prod.id);
    setNom(prod.nom);
    setDescription(prod.description || '');
    setPrix(prod.prix);
    setStock(prod.stock);
  }

  function cancelEdit() {
    setEditingId(null);
    setNom('');
    setDescription('');
    setPrix(0);
    setStock(10);
  }

  if (!token || loading) return <Typography>Chargement des produits...</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        p: 4,
        gap: 4,
        boxSizing: 'border-box',
      }}
    >
      {/* Liste produits */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h5" mb={2}>
          Produits
        </Typography>
        <List>
          {produits.map((prod) => (
            <ListItem
              key={prod.id}
              divider
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => startEdit(prod)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(prod.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={`${prod.nom} - ${prod.prix}€`} secondary={`Stock: ${prod.stock}`} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Formulaire */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
        }}
      >
        <Typography variant="h5">{editingId ? 'Modifier un produit' : 'Ajouter un produit'}</Typography>
        <TextField label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <TextField
          label="Prix"
          type="number"
          value={prix}
          onChange={(e) => setPrix(Number(e.target.value))}
          required
          inputProps={{ min: 0, step: '0.01' }}
        />
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
          inputProps={{ min: 0 }}
        />
        <Box>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
            {editingId ? 'Modifier' : 'Ajouter'}
          </Button>
          {editingId && (
            <Button variant="outlined" color="secondary" onClick={cancelEdit}>
              Annuler
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
