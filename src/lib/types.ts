export type ProduitCommande = {
    id_prod: string;
    quantite: number;
    nom?: string;
    prix?: number;
  };
  
  export type Commande = {
    id: string;
    created_at: string;
    id_client: string;
    statut: string;
    montant: number;
    mode_paiement: string;
    produits: ProduitCommande[];
  };

  export type Client = {
    id: string;
    createdAt: string;
    pseudo: string;
    roleId: number;
  };

  export type Produit = {
    id: string;
    nom: string;
    description?: string;
    prix: number;
    stock: number;
    photo_url?: string;
  };
  
  