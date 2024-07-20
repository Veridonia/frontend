'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../state';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from 'next/link';

const Navbar = () => {
    const categories = ["All", "Technology", "Health", "Sports", "Finance"];
    const [, setSelectedCategory] = useAtom(selectedCategoryAtom);

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
            {categories.map((category) => (
                <ListItem button key={category} onClick={() => setSelectedCategory(category)}>
                    <Link href={category === "All" ? "/" : `/?category=${category}`} passHref>
                        <ListItemText primary={category} />
                    </Link>
                </ListItem>
            ))}
        </List>
    );
};

export default Navbar;