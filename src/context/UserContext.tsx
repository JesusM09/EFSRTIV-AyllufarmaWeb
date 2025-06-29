'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const full_name = localStorage.getItem('user_name');

    if (user_id && full_name) {
      setUser({ id: user_id, full_name });
    } else if (
      pathname !== '/' &&
      pathname !== '/login' &&
      pathname !== '/register'
    ) {
      router.push('/login');
    }

    setIsLoading(false);
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    setUser(null);
    router.push('/login');
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};