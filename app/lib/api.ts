// import { Post, PaginatedPosts, User } from '../types';
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const registerUser = async (data: User) => {
//   const res = await fetch(`${API_URL}/users/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const loginUser = async (data:User) => {
//   const res = await fetch(`${API_URL}/users/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const fetchPosts = async (page = 1, search = '') => {
//   const res = await fetch(`${API_URL}/posts?page=${page}&limit=10&search=${search}`);
//   return res.json(); // returns { total, page, limit, posts }
// };

// export const fetchPost = async (id:string) => {
//   const res = await fetch(`${API_URL}/posts/${id}`);
//   return res.json();
// };

// export const fetchMyPosts = async (accessToken:string) : Promise<Post[]> => {
//   const res = await fetch(`${API_URL}/posts/my-posts`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   return res.json();
// };

// export const createPost = async (data:Post, accessToken:string) => {
//   const res = await fetch(`${API_URL}/posts`, {
//     method: 'POST',
//     headers: { 
//       'Content-Type': 'application/json',
//       ...(accessToken && { Authorization: `Bearer ${accessToken}` })
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const updatePost = async (id:string, data:Post, accessToken:string) => {
//   const res = await fetch(`${API_URL}/posts/${id}`, {
//     method: 'PUT',
//     headers: { 
//       'Content-Type': 'application/json',
//       ...(accessToken && { Authorization: `Bearer ${accessToken}` })
//     },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const deletePost = async (id:string, accessToken:string) => {
//   const res = await fetch(`${API_URL}/posts/${id}`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   return res.json();
// };


import { Post, PaginatedPosts, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (data: { name: string; email: string; password: string }): Promise<{ user?: User; accessToken?: string; refreshToken?:string; message?: string }> => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data: { email: string; password: string }): Promise<{ user?: User; accessToken?: string; refreshToken?:string; message?: string }> => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchPosts = async (page = 1, search = ''): Promise<PaginatedPosts> => {
  const res = await fetch(`${API_URL}/posts?page=${page}&limit=10`);
  return res.json();
};

export const fetchPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
};

export const createPost = async (data: { title: string; content: string }, accessToken?: string): Promise<Post> => {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` })
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePost = async (id: string, data: { title: string; content: string }, accessToken: string): Promise<Post> => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePost = async (id: string, accessToken: string): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
};

export const fetchMyPosts = async (accessToken: string): Promise<Post[]> => {
  const res = await fetch(`${API_URL}/posts/my-posts`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
};
