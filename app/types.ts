export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content?: string;
  author: User;
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}
