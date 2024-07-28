import axios from 'axios';
import { Post } from '../types';

export async function fetchPosts(category: string, page: number): Promise<Post[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    params: { category, limit: 10, page },
  });
  return response.data;
}

export async function fetchTotalPages(category: string): Promise<number> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/totalPages`, {
    params: { category, limit: 10 },
  });
  return response.data.totalPages;
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
  return response.data;
}

export async function checkIfUsernameIsUnique(username: string): Promise<boolean> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sessions/check-username/${username}`, {
  });
  return response.data.data.isUnique;
}

export async function updateUsername(sessionId: string, newUsername: string): Promise<void> {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sessions/change-username/${sessionId}`, {
    newUsername,
  });
}