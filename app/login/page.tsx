'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../lib/api';
import { FormEvent } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    if (res.accessToken && res.refreshToken) {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      router.push('/');
    } else {
      alert(res.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  );
}
