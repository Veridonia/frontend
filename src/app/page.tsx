'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { Post } from '../types';

const HomePage = () => {
    const [posts, setPosts] = useState<Post[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'All';

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
                    params: {
                        category: category === 'All' ? undefined : category,
                        limit: 10,
                        page
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTotalPages = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/totalPages`, {
                    params: {
                        category: category === 'All' ? undefined : category,
                        limit: 10,
                    }
                });
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        };

        fetchPosts();
        fetchTotalPages();
    }, [category, page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
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
                        <Navbar />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            {category === 'All' ? 'All Posts' : `${category} Posts`}
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