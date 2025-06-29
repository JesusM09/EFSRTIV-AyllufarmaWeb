'use client';

import '../styles/globals.scss';
import { UserProvider } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <Navbar />
          <AuthGuard>
            {children}
          </AuthGuard>
        </UserProvider>
      </body>
    </html>
  );
}
