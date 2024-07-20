'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
            <Toolbar>
                <Link href="/" passHref style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography
                        variant="h4"
                        sx={{ flexGrow: 1, cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                    >
                        Veridonia
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;