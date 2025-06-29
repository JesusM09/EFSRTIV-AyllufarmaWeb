'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    if (!userId && !isPublic) {
      router.replace('/login');
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default AuthGuard;
