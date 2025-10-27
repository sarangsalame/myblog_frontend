'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMyPosts, deletePost } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import { Post } from '../types';

export default function MyPostsPage() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await fetchMyPosts(accessToken);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (accessToken) loadPosts();
  }, [accessToken]);

  const handleDelete = async (id: string) => {
    if (!accessToken) return;
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(id, accessToken);
      loadPosts();
    }
  };

  if (loading) return <p>Loading your posts...</p>;

  return (
    <PrivateRoute>
      <div>
        <h2 className="text-xl mb-4">My Posts</h2>
        {posts.length === 0 ? (
          <p>You have not created any posts yet.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li
                key={post._id}
                className="border p-4 mb-2 flex justify-between items-center"
              >
                <div>
                  <strong>{post.title}</strong>
                  <p className="text-sm text-gray-600">by {post.author.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/posts/edit/${post._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PrivateRoute>
  );
}
