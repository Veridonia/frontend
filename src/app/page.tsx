// app/page.tsx
import HomePage from '@/app/HomePage';
import { fetchPosts, fetchTotalPages } from '@/utils/fetchers';

interface PageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const category = searchParams.category || '';
  const page = parseInt(searchParams.page || '1', 10);

  const [initialPosts, totalPages] = await Promise.all([
    fetchPosts(category, page),
    fetchTotalPages(category)
  ]);

  return (
    <HomePage initialPosts={initialPosts} initialPage={page} totalPages={totalPages} category={category} />
  );
}