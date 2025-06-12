interface Commande {
  produits: Array<{ id: string; quantite: number }>;
  total: number;
  adresseLivraison: string;
  statut?: string;
}

export async function afficherToutesCommandes(token: string) {
  const res = await fetch('/api/commandes/afficherAll', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function afficherCommande(token: string, uuid: string) {
  const res = await fetch(`/api/commandes/afficher/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function ajouterCommande(token: string, commande: Commande) {
  const res = await fetch('/api/commandes/ajouter', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commande),
  });
  return res.json();
}

export async function modifierCommande(token: string, uuid: string, commande: Commande) {
  const res = await fetch(`/api/commandes/modifier/${uuid}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commande),
  });
  return res.json();
}

export async function supprimerCommande(token: string, uuid: string) {
  const res = await fetch(`/api/commandes/supprimer/${uuid}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
