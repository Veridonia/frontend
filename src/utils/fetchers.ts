import { Post } from '../types';

export async function fetchPosts(category: string, page: number): Promise<Post[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?category=${category}&limit=10&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function fetchTotalPages(category: string): Promise<number> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/totalPages?category=${category}&limit=10`);
  if (!response.ok) {
    throw new Error('Failed to fetch total pages');
  }
  return response.json().totalPages;
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error('Post not found');
  }
  return response.json();
}