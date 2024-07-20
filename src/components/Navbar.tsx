'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from 'next/link';
import { Category } from '../types';

const Navbar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Categories
                </ListSubheader>
            }
        >
            <ListItem button key="All">
                <Link href="/" passHref>
                    <ListItemText primary="All" />
                </Link>
            </ListItem>
            {categories.map((category) => (
                <ListItem button key={category._id}>
                    <Link href={`/?category=${category.name}`} passHref>
                        <ListItemText primary={category.name} />
                    </Link>
                </ListItem>
            ))}
        </List>
    );
};

export default Navbar;