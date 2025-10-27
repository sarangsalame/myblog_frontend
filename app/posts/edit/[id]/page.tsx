'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchPost, updatePost } from '../../../lib/api';
import PrivateRoute from '../../../components/PrivateRoute';
import { useAuth } from '../../../context/AuthContext';
import { Post } from '../../../types';


function EditPostForm() {
  const { id } = useParams();
  const router = useRouter();
  const { accessToken } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchPost(id as string).then((post: Post) => {
      setTitle(post.title);
      setContent(post.content || '');
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !id) return;
    await updatePost(id as string, { title, content }, accessToken);
    router.push(`/posts/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <h2 className="text-xl mb-4">Edit Post</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-2"/>
      <textarea value={content} onChange={e => setContent(e.target.value)} className="border p-2 w-full mb-2 h-40"/>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Update</button>
    </form>
  );
}

export default function EditPostPage() {
  return <PrivateRoute><EditPostForm /></PrivateRoute>;
}

