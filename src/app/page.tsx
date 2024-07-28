// app/page.tsx
import HomePage from "@/app/HomePage";
import { Category } from "@/types";
import { fetchCategories, fetchPosts, fetchTotalPages } from "@/utils/fetchers";

interface PageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const categoryName = searchParams.category || "";
  const page = parseInt(searchParams.page || "1", 10);

  const categories: Category[] = await fetchCategories();
  const category = categories.find((one) => one.name === categoryName);

  const [initialPosts, totalPages] = await Promise.all([
    fetchPosts(category?.name || '', page),
    fetchTotalPages(category?.name || ''),
  ]);

  return (
    <HomePage
      initialPosts={initialPosts}
      initialPage={page}
      initialTotalPages={totalPages}
      category={category}
      categories={categories}
    />
  );
}
