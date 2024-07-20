'use client';

import React from 'react';
import { useRouter } from 'next/router';
import postsData from '../../../data/postsData';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import BreadcrumbsNav from '../../../components/Breadcrumbs';

const PostDetail = ({ params }) => {
    const { id } = params;
    const post = postsData.find((post) => post.id.toString() === id);

    if (!post) {
        return <Typography variant="h4">Post not found</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <BreadcrumbsNav category={post.category} postTitle={post.title} />
            <Paper sx={{ padding: '20px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body1">
                    {post.content}
                </Typography>
            </Paper>
        </Box>
    );
};

export default PostDetail;