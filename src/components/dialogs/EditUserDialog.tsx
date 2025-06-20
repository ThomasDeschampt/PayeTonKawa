"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Role {
  name: string;
}

interface Personne {
  prenom?: string;
  nom?: string;
  mail?: string;
  telephone?: string;
}

interface Entreprise {
  nomEntreprise?: string;
  siret?: string;
}

interface Address {
  adresse?: string;
  codePostal?: number | null;
  complement?: string | null;
}

export interface User {
  id: string;
  pseudo?: string;
  role?: Role | string;
  roleId?: number;
  personne?: Personne;
  entreprise?: Entreprise;
  addresses?: Address[];
  [key: string]: any;
}

interface EditUserDialogProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export default function EditUserDialog({ user, onClose, onSave }: EditUserDialogProps) {
  const [formData, setFormData] = useState<User>({ ...user });

  function handleChange(field: keyof User, value: any) {
    setFormData((f) => ({ ...f, [field]: value }));
  }

  function handlePersonneChange(field: keyof Personne, value: any) {
    setFormData((f) => ({
      ...f,
      personne: { ...f.personne, [field]: value },
    }));
  }

  function handleEntrepriseChange(field: keyof Entreprise, value: any) {
    setFormData((f) => ({
      ...f,
      entreprise: { ...f.entreprise, [field]: value },
    }));
  }

  function handleAddressChange(index: number, field: keyof Address, value: any) {
    const newAddresses = [...(formData.addresses || [])];
    if (!newAddresses[index]) newAddresses[index] = {};
    newAddresses[index][field] = value;
    setFormData((f) => ({ ...f, addresses: newAddresses }));
  }

  function addAddress() {
    setFormData((f) => ({
      ...f,
      addresses: [...(f.addresses || []), { adresse: "", codePostal: null, complement: "" }],
    }));
  }

  function removeAddress(index: number) {
    const newAddresses = [...(formData.addresses || [])];
    newAddresses.splice(index, 1);
    setFormData((f) => ({ ...f, addresses: newAddresses }));
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier l'utilisateur</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Pseudo"
            value={formData.pseudo || ""}
            onChange={(e) => handleChange("pseudo", e.target.value)}
            fullWidth
          />

          <Select
            value={typeof formData.role === "string" ? formData.role : formData.role?.name || ""}
            onChange={(e) =>
              handleChange("role", { name: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>

          <Typography variant="subtitle1" mt={2}>
            Personne
          </Typography>
          <TextField
            label="Prénom"
            value={formData.personne?.prenom || ""}
            onChange={(e) => handlePersonneChange("prenom", e.target.value)}
            fullWidth
          />
          <TextField
            label="Nom"
            value={formData.personne?.nom || ""}
            onChange={(e) => handlePersonneChange("nom", e.target.value)}
            fullWidth
          />

          <Typography variant="subtitle1" mt={2}>
            Entreprise
          </Typography>
          <TextField
            label="Nom de l'entreprise"
            value={formData.entreprise?.nomEntreprise || ""}
            onChange={(e) => handleEntrepriseChange("nomEntreprise", e.target.value)}
            fullWidth
          />
          <TextField
            label="SIRET"
            value={formData.entreprise?.siret || ""}
            onChange={(e) => handleEntrepriseChange("siret", e.target.value)}
            fullWidth
          />

          <Typography variant="subtitle1" mt={2} mb={1}>
            Adresses
          </Typography>
          {(formData.addresses || []).map((addr, i) => (
            <Box
              key={i}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                padding: 1,
                mb: 1,
                position: "relative",
              }}
            >
              <TextField
                label="Adresse"
                value={addr.adresse || ""}
                onChange={(e) => handleAddressChange(i, "adresse", e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Code Postal"
                type="number"
                value={addr.codePostal ?? ""}
                onChange={(e) =>
                  handleAddressChange(i, "codePostal", e.target.value ? parseInt(e.target.value, 10) : null)
                }
                sx={{ mb: 1 }}
              />
              <TextField
                label="Complément"
                value={addr.complement || ""}
                onChange={(e) => handleAddressChange(i, "complement", e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <IconButton
                aria-label="Supprimer adresse"
                size="small"
                onClick={() => removeAddress(i)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addAddress}>
            Ajouter une adresse
          </Button>
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
