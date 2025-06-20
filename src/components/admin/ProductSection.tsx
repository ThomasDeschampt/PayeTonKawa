"use client";

import { useEffect, useState } from "react";
import GenericTable, { Column } from "@/components/GenericTable";
import EditProductDialog, { Produit } from "@/components/dialogs/EditProductDialog";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "@/hooks/useAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";


function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function ProductSection() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Produit[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Produit | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Produit | null>(null);
  const { loading } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      const token = getCookie("token");
      if (!token) {
        console.error("Token d'authentification manquant");
        return;
      }

      const res = await fetch(`/api/produits/afficherAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data.data);
      } else {
        const err = await res.text();
        console.error("Erreur API:", err);
      }
    }

    if (open && products.length === 0 && !loading) {
      loadProducts();
    }
  }, [open, loading, products.length]);

  async function updateProduct(id: string, updatedProduct: Produit) {
    const token = getCookie("token");
    if (!token) {
      alert("Token d'authentification manquant");
      throw new Error("Token manquant");
    }

    const res = await fetch(`/api/produits/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      const text = await res.text();
      alert("Erreur lors de la mise à jour : " + text);
      throw new Error(text);
    }

    const json = await res.json();
    const updatedFromServer: Produit = json.data;

    setProducts((prev) =>
    prev.map((p) => (p.id === id ? updatedFromServer : p))
    );
  }

  async function confirmAndDeleteProduct() {
    if (!productToDelete) return;
  
    const token = getCookie("token");
    if (!token) {
      alert("Token d'authentification manquant");
      return;
    }
  
    const res = await fetch(`/api/produits/${productToDelete.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const text = await res.text();
      alert("Erreur lors de la suppression : " + text);
      return;
    }
  
    setProducts((prev) =>
      prev.filter((p) => p.id !== productToDelete.id)
    );
    setProductToDelete(null);
    setConfirmOpen(false);
  }  

  const columns: Column<Produit>[] = [
    { label: "Nom", render: (p) => p.nom },
    { label: "Prix", render: (p) => (typeof p.prix === "number" ? p.prix.toFixed(2) + " €" : "—") },
    { label: "Stock", render: (p) => (typeof p.stock === "number" ? p.stock.toString() : "—") },
  ];

  return (
    <div className="mb-4">
      <button
        className="bg-gray-200 px-4 py-2 rounded w-full text-left"
        onClick={() => setOpen(!open)}
      >
        Produits
      </button>

      {open && (
        <>
          <GenericTable
            data={products}
            columns={columns}
            renderActions={(product) => (
                <>
                  <IconButton onClick={() => setSelectedProduct(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setProductToDelete(product);
                      setConfirmOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}              
          />
          {selectedProduct && (
            <EditProductDialog
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onSave={async (updated) => {
                await updateProduct(updated.id, updated);
                setSelectedProduct(null);
              }}
            />
          )}
          <ConfirmDialog
            open={confirmOpen}
            title="Supprimer le produit"
            description={`Êtes-vous sûr de vouloir supprimer le produit "${productToDelete?.nom}" ? Cette action est irréversible.`}
            onConfirm={confirmAndDeleteProduct}
            onCancel={() => {
                setConfirmOpen(false);
                setProductToDelete(null);
            }}
            />
        </>
      )}
    </div>
  );
}
