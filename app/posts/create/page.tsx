'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../../lib/api';
import PrivateRoute from '../../components/PrivateRoute';
import { useAuth } from '../../context/AuthContext';

function CreatePostForm() {
  const router = useRouter();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert('Login required');
    const res = await createPost({ title, content }, token);
    router.push(`/posts/${res._id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h2 className="text-xl mb-4">Create Post</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full mb-2"/>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="border p-2 w-full mb-2 h-40"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create</button>
    </form>
  );
}

export default function CreatePostPage() {
  return <PrivateRoute><CreatePostForm /></PrivateRoute>;
}
