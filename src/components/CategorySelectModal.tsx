import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Autocomplete, TextField, Button, Grid } from "@mui/material";
import { Category, SelectedCategory } from "../types";
import { addSelectedCategory, fetchCategories } from "@/utils/fetchers";
import { useGuestSession } from "@/contexts/GuestSessionContext";
import { useRouter } from 'next/navigation';

interface CategorySelectModalProps {
  open: boolean;
  onClose: () => void;
  onCategorySelect: (selectedCategory: SelectedCategory) => void;
}

const CategorySelectModal: React.FC<CategorySelectModalProps> = ({ open, onClose, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isGuest, sessionId } = useGuestSession();
  const router = useRouter();

  useEffect(() => {
    const logic = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    logic();
  },[]);

  const handleCategorySelect = (event: React.SyntheticEvent, newValue: Category | null) => {
    setSelectedCategory(newValue);
  };

  const handleAddClick = async () => {
    if (selectedCategory) {
      const newSelectedCategory = await addSelectedCategory(sessionId, selectedCategory._id);
      router.push('/?category=' + newSelectedCategory.category.name);
      onClose();
      onCategorySelect(newSelectedCategory);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Select Category
        </Typography>
        <Autocomplete
          options={categories}
          getOptionLabel={(option) => option.name}
          style={{ marginTop: 16 }}
          onChange={handleCategorySelect}
          renderInput={(params) => <TextField {...params} label="Search categories" variant="outlined" />}
          autoHighlight
          autoSelect
        />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button disabled={!selectedCategory} variant="contained" color="primary" onClick={handleAddClick}>
              Add
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CategorySelectModal;
