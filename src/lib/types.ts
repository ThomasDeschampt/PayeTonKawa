export type ProduitCommande = {
    id_prod: string;
    quantite: number;
    nom?: string;
    prix?: number;
  };
  
  export type Commande = {
    id: string;
    created_at: string;  // ISO date string
    id_client: string;
    statut: string;
    montant: number;
    mode_paiement: string;
    produits: ProduitCommande[];
  };
  