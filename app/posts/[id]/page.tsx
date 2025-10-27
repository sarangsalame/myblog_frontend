'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPost, deletePost } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Post } from '../../types';

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { accessToken } = useAuth();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchPost(id as string).then(setPost);
  }, [id]);

  const handleDelete = async () => {
    if (!accessToken || !post) return;
    if (confirm('Are you sure?')) {
      await deletePost(post._id, accessToken);
      router.push('/');
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>by {post.author.name}</p>
      <p className="mt-4">{post.content}</p>
      {accessToken && (
        <div className="mt-4 flex gap-2">
          <button onClick={() => router.push(`/posts/edit/${post._id}`)} className="bg-yellow-500 text-white px-4 py-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">Delete</button>
        </div>
      )}
    </div>
  );
}
