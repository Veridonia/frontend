'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import BreadcrumbsNav from '../../../components/Breadcrumbs';
import { Post } from '../../../types';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostAndCategory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
                setPost(response.data);
                setCategory(response.data.category.name);
            } catch (error) {
                console.error('Error fetching post or category:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndCategory();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return <Typography variant="h4">Post not found</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <BreadcrumbsNav category={category || ''} postTitle={post.title} />
            <Paper sx={{ padding: '20px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body1">
                    {post.content}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    By {post.author}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {new Date(post.createdAt!).toLocaleDateString()}
                </Typography>
            </Paper>
        </Box>
    );
};

export default PostDetail;