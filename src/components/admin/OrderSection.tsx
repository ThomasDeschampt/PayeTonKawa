"use client";

import { useEffect, useState } from "react";
import GenericTable, { Column } from "@/components/GenericTable";
import EditOrderDialog, { Commande } from "@/components/dialogs/EditOrderDialog";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { useAuth } from "@/hooks/useAuth";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function OrderSection() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Commande[]>([]);
  const [selected, setSelected] = useState<Commande | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Commande | null>(null);
  const { loading } = useAuth();

  useEffect(() => {
    async function load() {
      const token = getCookie("token");
      if (!token) return console.error("Token manquant");
      const res = await fetch(`/api/commandes/afficherAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const { data } = await res.json();
        setOrders(data);
      } else {
        console.error(await res.text());
      }
    }
    if (open && orders.length === 0 && !loading) load();
  }, [open, loading, orders.length]);

  async function updateOrder(id: string, upd: Commande) {
    const token = getCookie("token");
    if (!token) throw new Error("Token manquant");
  
    const payload: any = { ...upd, uuid: upd.id };
    delete payload.id;
  
    const res = await fetch(`/api/commandes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    setOrders((o) => o.map(x => x.id === id ? json.data : x));
  }
  

  async function confirmDelete() {
    if (!toDelete) return;
    const token = getCookie("token");
    if (!token) return alert("Token manquant");
    const res = await fetch(`/api/commandes/${toDelete.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return alert(await res.text());
    setOrders(o => o.filter(x => x.id !== toDelete.id));
    setConfirmOpen(false);
    setToDelete(null);
  }

  const columns: Column<Commande>[] = [
    { label: "ID",       render: o => o.id },
    { label: "Client", render: o => o.id_client ?? "—" },
    { label: "Date", render: o => new Date(o.created_at).toLocaleDateString() },
    { label: "Statut",   render: o => o.statut },
    { label: "Total",    render: o => `${o.montant.toFixed(2)} €` },
  ];

  return (
    <div className="mb-4">
      <button
        className="bg-gray-200 px-4 py-2 rounded w-full text-left"
        onClick={() => setOpen(!open)}
      >
        Commandes
      </button>
      {open && (
        <>
          <GenericTable
            data={orders}
            columns={columns}
            renderActions={o => (
              <>
                <IconButton onClick={() => setSelected(o)}><EditIcon/></IconButton>
                <IconButton onClick={() => { setToDelete(o); setConfirmOpen(true); }}><DeleteIcon/></IconButton>
              </>
            )}
          />
          {selected && (
            <EditOrderDialog
              order={selected}
              onClose={() => setSelected(null)}
              onSave={async upd => { await updateOrder(upd.id, upd); setSelected(null); }}
            />
          )}
          <ConfirmDialog
            open={confirmOpen}
            title="Supprimer la commande"
            description={`Supprimer la commande n°"${toDelete?.id}" ?`}
            onConfirm={confirmDelete}
            onCancel={() => { setConfirmOpen(false); setToDelete(null); }}
          />
        </>
      )}
    </div>
  );
}
