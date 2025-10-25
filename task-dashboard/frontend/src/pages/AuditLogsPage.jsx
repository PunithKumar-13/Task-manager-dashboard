import React, { useEffect, useState } from 'react';
import { Box, Paper, Stack, Button } from '@mui/material';
import AuditLogTable from '../components/AuditLogTable.jsx';
import Pagination from '../components/Pagination.jsx';
import axios from '../api/axiosInstance.js';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => { fetchLogs(page); }, [page]);

  async function fetchLogs(p = 1) {
    try {
      const res = await axios.get('/logs', { params: { page: p, limit: PAGE_SIZE } });
      setLogs(res.data.logs || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <div></div>
          <Button variant="contained" onClick={() => fetchLogs(page)} sx={{ borderRadius:4, '&:hover':{ transform:'scale(1.03)' } }}>
            Refresh
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ mt: 2, p: 2 }}>
        <AuditLogTable logs={logs} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </Paper>
    </Box>
  );
}
