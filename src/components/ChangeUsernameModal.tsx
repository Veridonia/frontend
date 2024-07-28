import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { checkIfUsernameIsUnique, updateUsername } from '../utils/fetchers';

interface ChangeUsernameModalProps {
  open: boolean;
  onClose: () => void;
  currentUsername: string;
  sessionId: string;
}

const ChangeUsernameModal: React.FC<ChangeUsernameModalProps> = ({ open, onClose, currentUsername, sessionId }) => {
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = async () => {
    setLoading(true);
    setError('');

    try {
      const isUnique = await checkIfUsernameIsUnique(newUsername);
      if (!isUnique) {
        setError('Username already taken');
        setLoading(false);
        return;
      }

      await updateUsername(sessionId, newUsername);
      onClose();
    } catch (err) {
      setError('An error occurred while changing username');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Username</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Current Username"
          type="text"
          fullWidth
          value={currentUsername}
          disabled
        />
        <TextField
          margin="dense"
          label="New Username"
          type="text"
          fullWidth
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleUsernameChange} color="primary" disabled={loading || !newUsername}>
          {loading ? <CircularProgress size={24} /> : 'Change Username'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeUsernameModal;