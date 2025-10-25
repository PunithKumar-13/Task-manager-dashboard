import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      success: { main: '#4caf50' },
      warning: { main: '#ffeb3b' },
      error: { main: '#f44336' },
    },
    components: {
      MuiPaper: { defaultProps: { elevation: 0 } }
    }
  });
