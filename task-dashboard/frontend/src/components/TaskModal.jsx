import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';

export default function TaskModal({ open, onClose, onSave, initial = {} }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotesField, setShowNotesField] = useState(false); // NEW

  useEffect(() => {
    setTitle(initial.title || '');
    setDescription(initial.description || '');
    setUrgent(initial.urgent || false);
    setNotes(initial.notes || '');
    setShowNotesField(!!initial.notes); // show field if editing and notes exist
  }, [initial]);

  const handleSave = () => {
    onSave({ title, description, urgent, notes: showNotesField ? notes : '' });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial._id ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline rows={3} />

          {!showNotesField && !initial.notes && (
            <Button variant="outlined" size="small" onClick={() => setShowNotesField(true)}>
              Add Notes
            </Button>
          )}

          {showNotesField && (
            <TextField
              label="Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={2}
              placeholder="Add notes for this task"
            />
          )}

          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant={urgent ? 'contained' : 'outlined'} color="error" onClick={() => setUrgent(!urgent)} sx={{ borderRadius: 2 }}>
              {urgent ? 'Urgent' : 'Mark Urgent'}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform:'none', borderRadius:2 }}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" sx={{ textTransform:'none', borderRadius:2 }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
