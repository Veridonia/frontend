'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PostList from './posts/PostList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { Category, Post } from '../types';
import { fetchPosts, fetchTotalPages } from '@/utils/fetchers';

interface HomePageProps {
  initialPosts: Post[];
  initialPage: number;
  initialTotalPages: number;
  category?: Category;
  categories: Category[]
}

const HomePage: React.FC<HomePageProps> = ({ initialPosts, initialPage, initialTotalPages, category, categories }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const update = async () => {
      const [posts, totalPages] = await Promise.all([
        fetchPosts(category?.name || '', page),
        fetchTotalPages(category?.name || '')
      ]);

      setPosts(posts)
      setTotalPages(totalPages)
    }

    update()
  }, [category, page])

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        params: {
          category: category?.name === 'All' ? undefined : category,
          limit: 10,
          page: value
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          maxWidth: '960px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Navbar initialCategories={categories} initialCategory={category} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h5" component="h1" gutterBottom>
              {category?.name === 'All' ? 'All Posts' : `${category?.name} Posts`}
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <PostList posts={posts} />
                {posts && posts.length > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;