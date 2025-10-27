'use client'
import Link from 'next/link';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ReactNode } from 'react';
import './globals.css';


function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="mb-8 flex justify-between items-center">
      <h1 className="text-xl font-bold"><Link href="/">My Blog</Link></h1>
      <nav>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <Link href="/my-posts" className="mr-4 text-blue-600">My Posts</Link>
            <button onClick={logout} className="bg-red-500 text-white px-2 py-1">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="mr-4">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="p-4">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
