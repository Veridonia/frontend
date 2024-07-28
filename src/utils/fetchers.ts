import axios from "axios";
import { Category, CreatePostDto, Post, SelectedCategory } from "../types";

export async function fetchPosts(categoryName: string, page: number): Promise<Post[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    params: { categoryName, limit: 10, page },
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
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sessions/check-username/${username}`, {});
  return response.data.data.isUnique;
}

export async function updateUsername(sessionId: string, newUsername: string): Promise<void> {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sessions/change-username/${sessionId}`, {
    newUsername,
  });
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchSelectedCategories = async (sessionId: string): Promise<SelectedCategory[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/selected-categories/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching selected categories:", error);
    throw error;
  }
};

export const addSelectedCategory = async (sessionId: string, categoryId: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/selected-categories`, { sessionId, categoryId });
  return response.data;
};

export const removeSelectedCategory = async (selectedCategoryId: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/selected-categories/${selectedCategoryId}`);
    return response.data;
  };

export const createPost = async (createPostDto: CreatePostDto) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, createPostDto);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export async function startGuestSession() {
  const response = await axios.post("/api/session", {}, { withCredentials: true });
  return response.data;
}

export async function endGuestSession(sessionId: string) {
  const response = await axios.delete(`/api/session/${sessionId}`, { withCredentials: true });
  return response.data;
}

export async function checkGuestSession(sessionId: string) {
  const response = await axios.get(`/api/session/${sessionId}`, { withCredentials: true });
  return response.data;
}
