import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken } from '@/lib/auth';

type User = { id: string; pseudo: string; role: string } | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    async function checkToken() {
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

  function logout() {
    cookies.remove('token', { path: '/' });
    setUser(null);
    window.location.href = '/';
  }
  

  return { user, loading, logout };
}
