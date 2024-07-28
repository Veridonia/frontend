import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSession } from 'next-auth/react';
import { useGuestSession } from '@/contexts/GuestSessionContext';
import ChangeUsernameModal from './ChangeUsernameModal';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isGuest, sessionId, username, startGuestSession, endGuestSession, checkGuestSession } = useGuestSession();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSession = () => {
    endGuestSession();
    handleMenuClose();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    checkGuestSession()
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant="h4" sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}>
              Veridonia
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isGuest && (
              <Typography sx={{ marginRight: 2, color: 'black' }}>
                {username}
              </Typography>
            )}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleOpenModal}>Change Username</MenuItem>
              <MenuItem onClick={handleChangeSession}>End Session</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ChangeUsernameModal
        open={isModalOpen}
        onClose={handleCloseModal}
        currentUsername={username}
        sessionId={sessionId}
      />
    </>
  );
};

export default Header;