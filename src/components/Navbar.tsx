import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation'; // Using 'next/navigation' for App Router
import { Category, SelectedCategory } from '../types';
import { fetchCategories, fetchSelectedCategories, addSelectedCategory } from '../utils/fetchers';
import PostModal from './PostModal'; // Import the new PostModal component
import CategorySelectModal from './CategorySelectModal'; // Import the new CategorySelectModal component
import { useGuestSession } from '@/contexts/GuestSessionContext';
import { ListItemButton } from '@mui/material';

interface NavbarProps {
    initialSelectedCategory?: SelectedCategory;
    initialSelectedCategories?: SelectedCategory[];
}

const Navbar: React.FC<NavbarProps> = ({ initialSelectedCategories, initialSelectedCategory }) => {
    const [selectedCategories, setSelectedCategories] = useState<SelectedCategory[]>(initialSelectedCategories || []);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | undefined>(initialSelectedCategory);
    const router = useRouter();
    const { isGuest, sessionId } = useGuestSession();
    const [currentCategory, setCurrentCategory] = useState(selectedCategory?.category)
    const [categoryAdded, setCategoryAdded] = useState(false)

    useEffect(() => {
        const logic = async () => {
            if(!sessionId) {
                return;
            }
            const selectedCategories: SelectedCategory[] = await fetchSelectedCategories(sessionId)
            const selectedCategory = selectedCategories.find(one => one.category.name === currentCategory?.name) as SelectedCategory

            setSelectedCategories(selectedCategories)
            setSelectedCategory(selectedCategory)
            setCategoryAdded(false)
        }
        logic();
    }, [sessionId, categoryAdded])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setCategoryAdded(false)
    };

    const handleCategoryClick = (selectedCategory: SelectedCategory) => {
        setSelectedCategory(selectedCategory);
        setCurrentCategory(selectedCategory.category)
        router.push(`/?category=${selectedCategory?.category.name}`);
    };

    const handleCategorySelect = (selectedCategory: SelectedCategory) => {
        setCurrentCategory(selectedCategory.category)
        setCategoryAdded(true)
    }

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
                {selectedCategories.map((oneSelectedCategory) => (
                    <ListItemButton
                        key={oneSelectedCategory.category._id}
                        selected={oneSelectedCategory?.category?.name === currentCategory?.name}
                        onClick={() => handleCategoryClick(oneSelectedCategory)}
                    >
                        <ListItemText primary={oneSelectedCategory.category.name} />
                    </ListItemButton>
                ))}
                <ListItem button onClick={handleModalOpen}>
                    <ListItemText primary="Add..." />
                </ListItem>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ textAlign: 'left', my: 2, mx: 2 }}>
                    <Button disabled={!selectedCategory} variant="contained" color="primary" onClick={() => handleOpen()}>
                        Publish
                    </Button>
                </Box>
            </List>

            <PostModal
                open={open}
                handleClose={handleClose}
                selectedCategory={selectedCategory}
            />

            <CategorySelectModal
                open={modalOpen}
                onClose={handleModalClose}
                onCategorySelect={handleCategorySelect}
            />
        </>
    );
};

export default Navbar;