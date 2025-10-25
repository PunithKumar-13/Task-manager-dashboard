import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export default function Sidebar({ onNav = () => {}, selected }) {
  const [collapsed, setCollapsed] = useState(false);
  const width = collapsed ? 70 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
          transition: 'width 0.3s ease',
          overflowX: 'hidden'
        }
      }}
    >
      <Box sx={{ p: 1, display: 'flex', justifyContent: collapsed ? 'center' : 'space-between', alignItems: 'center' }}>
        {!collapsed && <strong>Task Manager</strong>}
        <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <List>
        <Tooltip title="Tasks" placement="right" disableHoverListener={!collapsed}>
          <ListItemButton selected={selected === 'tasks'} onClick={() => onNav('tasks')}>
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            {!collapsed && <ListItemText primary="Tasks" />}
          </ListItemButton>
        </Tooltip>

        <Tooltip title="Audit Logs" placement="right" disableHoverListener={!collapsed}>
          <ListItemButton selected={selected === 'logs'} onClick={() => onNav('logs')}>
            <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
            {!collapsed && <ListItemText primary="Audit Logs" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}
