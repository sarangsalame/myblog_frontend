'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await registerUser({ name, email, password });
    if (res.accessToken) {
      localStorage.setItem('accesstoken', res.accessToken);
      router.push('/');
    } else {
      alert(res.message);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange} className="border p-2 w-full mb-2"/>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} className="border p-2 w-full mb-2"/>
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  );
}
