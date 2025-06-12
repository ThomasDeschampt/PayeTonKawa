interface Produit {
  id?: string;
  nom: string;
  description?: string;
  prix: number;
  stock: number;
  photo_url?: string;
}

export async function ajouterProduit(token: string, produit: Produit) {
  const res = await fetch('/api/produits/ajouter', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produit),
  });
  return res.json();
}

export async function modifierProduit(token: string, id: string, produit: Produit) {
  const res = await fetch(`/api/produits/modifier/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produit),
  });
  return res.json();
}

export async function supprimerProduit(token: string, id: string) {
  const res = await fetch(`/api/produits/supprimer/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
