"use client";

import { useEffect, useState } from "react";
import GenericTable, { Column } from "@/components/GenericTable";
import EditUserDialog, { User } from "@/components/dialogs/EditUserDialog";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "@/hooks/useAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";


function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function UserSection() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { loading } = useAuth();

  useEffect(() => {
    async function loadUsers() {
      const token = getCookie("token");
      if (!token) {
        console.error("Token d'authentification manquant");
        return;
      }

      const res = await fetch(`/api/clients/afficherAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.data);
      } else {
        const err = await res.text();
        console.error("Erreur API:", err);
      }
    }

    if (open && users.length === 0 && !loading) {
      loadUsers();
    }
  }, [open, loading, users.length]);

  function cleanUserData(user: User): User {
    return {
      ...user,
      addresses: user.addresses?.map((a) => ({
        ...a,
        codePostal: a.codePostal ? parseInt(a.codePostal.toString(), 10) : null,
      })) || [],
    };
  }

  async function updateUser(id: string, updatedUser: User) {
    const token = getCookie("token");
    if (!token) {
      alert("Token d'authentification manquant");
      throw new Error("Token manquant");
    }
    const cleanedUser = cleanUserData(updatedUser);
    const res = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cleanedUser),
    });

    if (!res.ok) {
      const text = await res.text();
      alert("Erreur lors de la mise à jour : " + text);
      throw new Error(text);
    }

    const updatedUserFromServer = await res.json();

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === id ? updatedUserFromServer : u))
    );
  }

  async function confirmAndDeleteUser() {
    if (!userToDelete) return;
  
    const token = getCookie("token");
    if (!token) {
      alert("Token d'authentification manquant");
      return;
    }
  
    const res = await fetch(`/api/clients/${userToDelete.id}`, {
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
  
    setUsers((prevUsers) =>
      prevUsers.filter((u) => u.id !== userToDelete.id)
    );
    setUserToDelete(null);
    setConfirmOpen(false);
  }  
  

  const columns: Column<User>[] = [
    { label: "Pseudo", render: (u) => u.pseudo },
    {
      label: "Rôle",
      render: (u) =>
        typeof u.role === "string" ? u.role : u.role?.name || "-",
    },
    {
      label: "Personne",
      render: (u) =>
        u.personne
          ? `${u.personne.prenom || ""} ${u.personne.nom || ""}`
          : "-",
    },
    {
      label: "Entreprise",
      render: (u) => u.entreprise?.nomEntreprise || "-",
    },
    {
      label: "Adresses",
      render: (u) => `${u.addresses?.length || 0} adresse(s)`,
    },
  ];

  return (
    <div className="mb-4">
      <button
        className="bg-gray-200 px-4 py-2 rounded w-full text-left"
        onClick={() => setOpen(!open)}
      >
        Utilisateurs
      </button>

      {open && (
        <>
          <GenericTable
            data={users}
            columns={columns}
            renderActions={(user) => (
              <>
                <IconButton onClick={() => setSelectedUser(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setUserToDelete(user);
                    setConfirmOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}            
          />
          {selectedUser && (
            <EditUserDialog
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
              onSave={async (updated) => {
                await updateUser(updated.id, updated);
                setSelectedUser(null);
              }}
            />
          )}
          <ConfirmDialog
            open={confirmOpen}
            title="Supprimer l'utilisateur"
            description={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userToDelete?.pseudo}" ? Cette action est irréversible.`}
            onConfirm={confirmAndDeleteUser}
            onCancel={() => {
              setConfirmOpen(false);
              setUserToDelete(null);
            }}
          />
        </>
      )}
    </div>
  );
}
