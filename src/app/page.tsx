'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography'; // Import Typography component
import postsData from '../data/postsData';

const HomePage = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'All';

    const filteredPosts = category === 'All'
        ? postsData
        : postsData.filter(post => post.category === category);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                padding: '20px', // Optional padding for better look
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '960px', // Set maximum width to make it narrower
                    backgroundColor: '#ffffff', // Optional background color
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // Optional shadow for better look
                    borderRadius: '8px', // Optional rounded corners
                    padding: '20px', // Optional padding inside the container
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
                        <PostList posts={filteredPosts} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default HomePage;