import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { createPost } from '@/utils/fetchers';
import { Category, CreatePostDto } from '@/types';
import { useGuestSession } from '@/contexts/GuestSessionContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface PostModalProps {
    open: boolean;
    handleClose: () => void;
    category?: Category;
}

const PostModal: React.FC<PostModalProps> = ({ open, handleClose, category }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);
    const { isGuest, sessionId } = useGuestSession();
    
    const handleSubmit = async () => {
        if (!isGuest) {
            console.error('only guests are supported')
            return;
        }

        const newPost: CreatePostDto = {
          title: postTitle,
          content: postContent,
          sessionId,
          categoryId: category?._id,
          expiresAt: expirationDate?.toISOString(), // Convert to ISO string
        };
        try {
          await createPost(newPost);
        } catch (error) {
          console.error('Error creating post:', error);
        }
        handleClose();
      };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 id="modal-modal-title">Create a Post</h2>
                <TextField
                    label="Category"
                    value={category?.name}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Post Title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Post Content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Expiration Date"
                        value={expirationDate}
                        onChange={(newDate) => setExpirationDate(newDate)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PostModal;