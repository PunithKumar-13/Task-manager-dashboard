import React, { useEffect, useState } from 'react';
import {
  Box, Paper, TextField, Button, Stack,
  Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskTable from '../components/TaskTable.jsx';
import TaskModal from '../components/TaskModal.jsx';
import Pagination from '../components/Pagination.jsx';
import ProfileDialog from '../components/ProfileDialog.jsx';
import axios from '../api/axiosInstance.js';
import { saveAs } from 'file-saver';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [snack, setSnack] = useState({ open: false, severity: 'success', msg: '' });
  const [deleteModal, setDeleteModal] = useState({ open: false, task: null });
  const [profileModal, setProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Demo User',
    role: 'Admin',
    email: 'demo@example.com',
    phone: '1234567890',
    designation: 'Manager',
    image: null
  });

  const PAGE_SIZE = 5;

  useEffect(() => { fetchTasks(); }, [page, query]);

  async function fetchTasks() {
    try {
      const res = await axios.get('/tasks', { params: { page, limit: PAGE_SIZE, q: query } });
      setTasks(res.data.tasks || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setSnack({ open: true, severity: 'error', msg: 'Failed to load tasks' });
    }
  }

  const openCreate = () => { setEditing(null); setModalOpen(true); }
  const openEdit = (task) => { setEditing(task); setModalOpen(true); }

  async function handleSave(payload) {
    try {
      const payloadWithNotes = { ...payload }; // include notes here if TaskModal sends
      if (editing?._id) await axios.put(`/tasks/${editing._id}`, payloadWithNotes);
      else await axios.post('/tasks', payloadWithNotes);

      setSnack({ open: true, severity: 'success', msg: editing?._id ? 'Task updated' : 'Task created' });
      setModalOpen(false);
      fetchTasks();
    } catch {
      setSnack({ open: true, severity: 'error', msg: 'Save failed' });
    }
  }

  const confirmDelete = (task) => setDeleteModal({ open: true, task });
  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${deleteModal.task._id}`);
      setSnack({ open: true, severity: 'success', msg: 'Task deleted' });
      setDeleteModal({ open: false, task: null });
      fetchTasks();
    } catch {
      setSnack({ open: true, severity: 'error', msg: 'Delete failed' });
    }
  }

  const exportCSV = async () => {
    try {
      const res = await axios.get('/tasks', { params: { page: 1, limit: 10000, q: query } });
      const all = res.data.tasks || [];
      const header = ['id','title','description','urgent','createdAt','notes'];
      const rows = all.map(t => [t._id, `"${t.title}"`, `"${t.description}"`, t.urgent?'urgent':'normal', t.createdAt, t.notes || '-']);
      const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
      saveAs(new Blob([csv], { type:'text/csv;charset=utf-8;' }), 'tasks.csv');
    } catch {
      setSnack({ open: true, severity: 'error', msg: 'Export failed' });
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs:'column', sm:'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <TextField
            placeholder="Search by title or description..."
            value={query}
            onChange={e=>{setQuery(e.target.value); setPage(1);}}
            size="small"
            sx={{ width:400 }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={exportCSV} sx={{ borderRadius:4, '&:hover':{ transform:'scale(1.03)' } }}>Export CSV</Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ borderRadius:4, '&:hover':{ transform:'scale(1.03)' } }}>Add Task</Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p:2 }}>
        <TaskTable tasks={tasks} onEdit={openEdit} onDelete={confirmDelete} />
        <Pagination page={page} totalPages={totalPages} onChange={p=>setPage(p)} />
      </Paper>

      <TaskModal open={modalOpen} onClose={()=>setModalOpen(false)} onSave={handleSave} initial={editing||{}} />

      <Dialog open={deleteModal.open} onClose={()=>setDeleteModal({ open:false, task:null })}>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent:'center' }}>
          <Button onClick={()=>setDeleteModal({ open:false, task:null })} sx={{ borderRadius:2, textTransform:'none', px:3, '&:hover':{ transform:'scale(1.03)' } }}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" sx={{ borderRadius:2, textTransform:'none', px:3, '&:hover':{ transform:'scale(1.03)' } }}>Yes, Delete</Button>
        </DialogActions>
      </Dialog>

      <ProfileDialog open={profileModal} onClose={()=>setProfileModal(false)} profile={profile} onUpdate={setProfile} />

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack({...snack, open:false})}>
        <Alert severity={snack.severity} onClose={()=>setSnack({...snack, open:false})}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
