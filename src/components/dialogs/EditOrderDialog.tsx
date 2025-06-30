"use client";

import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, Box, Typography
} from "@mui/material";

export interface Commande {
  id: string;
  id_client: string;
  created_at: string;
  statut: string;
  montant: number;
  mode_paiement: string;
}

interface Props {
  order: Commande;
  onClose: () => void;
  onSave: (updated: Commande) => void;
}

export default function EditOrderDialog({ order, onClose, onSave }: Props) {
  const [form, setForm] = useState<Commande>({ ...order });

  const handle = (field: keyof Commande, value: any) =>
    setForm(f => ({ ...f, [field]: value }));

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier la commande</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>ID : {form.id}</Typography>
          <TextField
            label="Nom client"
            value={form.id_client}
            onChange={e => handle("id_client", e.target.value)}
            fullWidth
          />
          <TextField
            label="Date"
            type="date"
            value={form.created_at.slice(0,10)}
            onChange={e => handle("created_at", e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Select
            label="Statut"
            value={form.statut}
            onChange={e => handle("statut", e.target.value)}
            fullWidth
          >
            <MenuItem value="En cours">En cours</MenuItem>
            <MenuItem value="Expédiée">Expédiée</MenuItem>
            <MenuItem value="Livrée">Livrée</MenuItem>
            <MenuItem value="Annulée">Annulée</MenuItem>
          </Select>
          <Select
            label="Mode de paiement"
            value={form.mode_paiement}
            onChange={e => handle("mode_paiement", e.target.value)}
            fullWidth
            >
            <MenuItem value="virement">Virement</MenuItem>
            <MenuItem value="carte">Carte</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
          </Select>
          <TextField
            label="Total (€)"
            type="number"
            inputProps={{ step: "0.01", min: 0 }}
            value={form.montant}
            onChange={e => handle("montant", parseFloat(e.target.value))}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={() => onSave(form)}>Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
}
