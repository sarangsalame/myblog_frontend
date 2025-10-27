'use client';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) return <p>Loading...</p>;
  return <>{children}</>; // Wrap children in fragment
}
