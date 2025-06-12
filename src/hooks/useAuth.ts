import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken } from '@/lib/auth';

type User = { id: string; pseudo: string, role: string } | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const cookies = new Cookies();
      const token = cookies.get('token');
      if (token) {
        const payload = await verifyJwtToken(token);
        setUser(payload ? { id: payload.id, pseudo: payload.pseudo, role: payload.role } : null);
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    checkToken();
  }, []);

  return { user, loading };
}
