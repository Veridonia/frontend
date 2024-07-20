'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Post } from '../types';

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <Box>
            {posts.map(post => (
                <Paper key={post.id} sx={{ marginBottom: 2, padding: 2 }}>
                    <Link href={`/posts/${post._id}`} passHref>
                        <Typography variant="h5" component="div" sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                            {post.title}
                        </Typography>
                    </Link>
                    <Typography variant="body2">
                        {post.content}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default PostList;