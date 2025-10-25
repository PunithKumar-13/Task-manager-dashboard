import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Button, Typography, Box, Avatar, IconButton, Divider, TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProfileDialog({ open, onClose, profile = {}, onUpdate }) {
  const [image, setImage] = useState(profile.image || null);
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => setImage(profile.image || null), [profile]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempImage(url);
    }
  };

  const handleSaveImage = () => {
    if (tempImage) {
      setImage(tempImage);
      onUpdate?.({ ...profile, image: tempImage });
      setTempImage(null);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    onUpdate?.({ ...profile, image: null });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 2, bgcolor: 'background.paper', boxShadow: 4 }
      }}
    >
      <DialogTitle sx={{ p: 1, m: 0 }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>Profile</Typography>
      </DialogTitle>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1, mt: 2 }}>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            src={tempImage || image}
            sx={{ width: 90, height: 90, mb: 1, fontSize: 32 }}
          >
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              bgcolor: 'primary.main',
              color: '#fff',
              '&:hover': { bgcolor: 'primary.dark' },
              width: 30,
              height: 30
            }}
          >
            <EditIcon sx={{ fontSize: 18 }} />
            <input type="file" hidden accept="image/*" onChange={handleImageSelect} />
          </IconButton>
        </Box>

        {tempImage && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSaveImage}
            sx={{ borderRadius: 2, mt: 1 }}
          >
            Save
          </Button>
        )}

        {image && !tempImage && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteImage}
            sx={{ borderRadius: 2, mt: 1 }}
          >
            Delete
          </Button>
        )}

        <Typography variant="h6" align="center" sx={{ mt: 1 }}>
          {profile.name || 'User'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {profile.role || 'Role'}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Email</Typography>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mt: 0.5
              }}
            >
              <Typography>{profile.email || '-'}</Typography>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600 }}>Phone</Typography>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mt: 0.5
              }}
            >
              <Typography>{profile.phone || '-'}</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
