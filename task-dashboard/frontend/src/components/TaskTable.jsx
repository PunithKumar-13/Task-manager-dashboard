import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

export default function TaskTable({ tasks = [], onEdit = () => {}, onDelete = () => {} }) {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Important</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((t) => (
            <TableRow key={t._id}>
              <TableCell># {String(t._id ?? '').slice(-6)}</TableCell>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>
                {t.urgent ? <Chip label="Urgent" color="error" size="small" /> : <Chip label="Normal" size="small" />}
              </TableCell>
              <TableCell>{t.createdAt ? format(new Date(t.createdAt), 'yyyy-MM-dd') : '-'}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(t)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(t)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
