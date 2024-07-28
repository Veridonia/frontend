// app/page.tsx
import HomePage from "@/app/HomePage";
import { Category, SelectedCategory } from "@/types";
import { fetchCategories, fetchPosts, fetchSelectedCategories, fetchTotalPages } from "@/utils/fetchers";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  let categoryName = searchParams.category || '';
  let selectedCategories: SelectedCategory[] = [];
  let selectedCategory;
  let initialPosts;
  let totalPages = 1;
  const page = parseInt(searchParams.page || "1", 10);
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId')?.value || '';

  if(sessionId){
    selectedCategories = await fetchSelectedCategories(sessionId);
    if(categoryName) {
      selectedCategory = selectedCategories.find(one => one.category.name === categoryName) as SelectedCategory;
    }
    if(!selectedCategory) {
      selectedCategory = selectedCategories[0];
      categoryName = selectedCategory?.category?.name;
    }
  }

  if(categoryName) {
    [initialPosts, totalPages] = await Promise.all([
        fetchPosts(categoryName, page),
        fetchTotalPages(categoryName),
      ]);
  }

  return (
    <HomePage
      initialPosts={initialPosts}
      initialPage={page}
      initialTotalPages={totalPages}
      initialSelectedCategory={selectedCategory}
      initialSelectedCategories={selectedCategories}
    />
  );
}
