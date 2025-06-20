"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

export interface Produit {
  id: string;
  nom: string;
  prix: number;
  description?: string;
  stock: number;
  photo_url?: string;
}

interface EditProductDialogProps {
  product: Produit;
  onClose: () => void;
  onSave: (updatedProduct: Produit) => void;
}

export default function EditProductDialog({ product, onClose, onSave }: EditProductDialogProps) {
  const [formData, setFormData] = useState<Produit>({ ...product });

  function handleChange(field: keyof Produit, value: any) {
    setFormData((f) => ({ ...f, [field]: value }));
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier le produit</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nom"
            value={formData.nom || ""}
            onChange={(e) => handleChange("nom", e.target.value)}
            fullWidth
          />
          <TextField
            label="Prix"
            type="number"
            inputProps={{ step: "0.01", min: 0 }}
            value={formData.prix ?? 0}
            onChange={(e) => handleChange("prix", parseFloat(e.target.value))}
            fullWidth
          />
          <TextField
            label="Stock"
            type="number"
            inputProps={{ min: 0 }}
            value={formData.stock ?? 0}
            onChange={(e) => handleChange("stock", parseInt(e.target.value, 10))}
            fullWidth
          />
          <TextField
            label="Description"
            multiline
            minRows={3}
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
          />
          <TextField
            label="URL de la photo"
            value={formData.photo_url || ""}
            onChange={(e) => handleChange("photo_url", e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          onClick={() => onSave(formData)}
          variant="contained"
          color="primary"
        >
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}
