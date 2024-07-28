import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface BreadcrumbsNavProps {
    category: string;
    postTitle?: string; // Make postTitle optional
}

const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({ postTitle, category }) => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/" passHref>
                    <Typography color="textPrimary" sx={{ cursor: 'pointer' }}>
                        Home
                    </Typography>
                </Link>
                {category && category !== 'All' && (
                    <Link href={`/?category=${category}`} passHref>
                        <Typography color="textPrimary" sx={{ cursor: 'pointer' }}>
                            {category}
                        </Typography>
                    </Link>
                )}
                {postTitle && (
                    <Typography color="textSecondary">{postTitle}</Typography>
                )}
            </Breadcrumbs>
        </Box>
    );
};

export default BreadcrumbsNav;