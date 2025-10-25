import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Chip, Box } from '@mui/material';
import { format } from 'date-fns';

export default function AuditLogTable({ logs = [] }) {
  const colorFor = (action) => {
    if (action.includes('Create')) return 'success';
    if (action.includes('Update')) return 'warning';
    if (action.includes('Delete')) return 'error';
    return 'default';
  };

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Task ID</TableCell>
            <TableCell>Updated Content</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((l, i) => {
            const isCreate = l.action?.includes('Create');
            const isUpdate = l.action?.includes('Update');

            // ✅ Notes should show on both create and update if present
            const noteContent = l.notes ?? l.updatedContent?.notes ?? '-';

            // ✅ For updated content:
            // - Show "-" for Create Task
            // - Show changed fields for Update Task
            const updatedContentDisplay =
              isCreate
                ? '-' // for create task
                : l.updatedContent && Object.keys(l.updatedContent).length > 0
                ? Object.entries(l.updatedContent).map(([k, v]) => (
                    <Chip
                      key={k}
                      label={`${k}: ${v}`}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))
                : '-';

            return (
              <TableRow key={i}>
                <TableCell>
                  {l.timestamp ? format(new Date(l.timestamp), 'yyyy-MM-dd HH:mm') : '-'}
                </TableCell>
                <TableCell>
                  <Chip label={l.action} color={colorFor(l.action)} />
                </TableCell>
                <TableCell>{l.taskId ? `# ${String(l.taskId).slice(-6)}` : '-'}</TableCell>

                {/* ✅ Updated content logic */}
                <TableCell>{updatedContentDisplay}</TableCell>

                {/* ✅ Notes logic */}
                <TableCell>{noteContent}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
