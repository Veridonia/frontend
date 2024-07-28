import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation'; // Using 'next/navigation' for App Router
import { Category } from '../types';
import { fetchCategories } from '../utils/fetchers';
import PostModal from './PostModal'; // Import the new PostModal component

interface NavbarProps {
    initialCategory?: Category;
    initialCategories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ initialCategories, initialCategory }) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(initialCategory);
    const router = useRouter();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };

        loadCategories();
    }, [selectedCategory]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategoryClick = (category?: Category) => {
        setSelectedCategory(category);
        router.push(`/?category=${category?.name === 'All' ? '' : category?.name}`);
    };

    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Categories
                    </ListSubheader>
                }
            >
                <ListItem
                    button
                    key="All"
                    selected={selectedCategory?.name === 'All'}
                    onClick={() => handleCategoryClick(selectedCategory)}
                >
                    <ListItemText primary="All" />
                </ListItem>
                {categories.map((category) => (
                    <ListItem
                        button
                        key={category._id}
                        selected={selectedCategory?.name === category.name}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ textAlign: 'left', my: 2, mx: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                        Post
                    </Button>
                </Box>
            </List>

            <PostModal
                open={open}
                handleClose={handleClose}
                category={selectedCategory}
            />
        </>
    );
};

export default Navbar;