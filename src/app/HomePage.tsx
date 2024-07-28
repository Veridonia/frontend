"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PostList from "./posts/PostList";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post, SelectedCategory } from "../types";
import { fetchPosts, fetchSelectedCategories, fetchTotalPages, removeSelectedCategory } from "@/utils/fetchers";
import { useGuestSession } from "@/contexts/GuestSessionContext";

interface HomePageProps {
  initialPosts?: Post[];
  initialPage: number;
  initialTotalPages: number;
  initialSelectedCategories?: SelectedCategory[];
  initialSelectedCategory?: SelectedCategory;
}

const HomePage: React.FC<HomePageProps> = ({
  initialPosts,
  initialPage,
  initialTotalPages,
  initialSelectedCategories,
  initialSelectedCategory,
}) => {
  const [posts, setPosts] = useState<Post[] | undefined>(initialPosts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { isGuest, sessionId } = useGuestSession();
  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory)
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories)

  useEffect(() => {
    const update = async () => {
      let categoryName = initialSelectedCategory?.category?.name;
      let selectedCategories;
      let selectedCategory;

      if(sessionId){
        selectedCategories = await fetchSelectedCategories(sessionId);
        if(categoryName) {
          selectedCategory = selectedCategories.find(one => one.category.name === categoryName) as SelectedCategory;
        }
        if(!selectedCategory) {
          selectedCategory = selectedCategories[0];
          categoryName = selectedCategory?.category?.name;
        }
      }

      if(categoryName) {
        const [posts, totalPages] = await Promise.all([
          fetchPosts(categoryName as string, page),
          fetchTotalPages(categoryName as string),
        ]);
  
        setPosts(posts);
        setTotalPages(totalPages);
        setSelectedCategory(selectedCategory)
      }
    };

    update();
  }, [initialSelectedCategory, page, sessionId]);

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        params: {
          category: selectedCategory?.category,
          limit: 10,
          page: value,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLeaveCategory = async () => {
    const result = await removeSelectedCategory(selectedCategory?._id);

    handleMenuClose();
    // Redirect to homepage or another logic to leave category
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Navbar initialSelectedCategories={selectedCategories} initialSelectedCategory={selectedCategory} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" component="h1" gutterBottom>
                {`${selectedCategory?.category?.name || ''} Posts`}
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleLeaveCategory}>Leave Category</MenuItem>
              </Menu>
            </Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <PostList posts={posts} />
                {posts && posts.length > 0 && (
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
