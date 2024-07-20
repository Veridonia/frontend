'use client';

import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Header from '../components/Header';

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>Veridonia</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <CssBaseline />
                <Header />
                <Container>
                    {children}
                </Container>
            </body>
        </html>
    );
};

export default RootLayout;