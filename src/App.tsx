import type React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, createTheme, ThemeProvider, CssBaseline, Grid } from '@mui/material';
import { Row, isRowDataArray, type RowData } from './Row';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App: React.FC = () => {
  const savedRowsJson = localStorage.getItem('rows');
  const savedRows: unknown = savedRowsJson !== null ? JSON.parse(savedRowsJson) : null;
  const defaultRows = isRowDataArray(savedRows)
    ? savedRows
    : [
        { id: 1, defaultValue: '第8条の3' },
        { id: 2, defaultValue: '61-2' },
        { id: 3, defaultValue: '第百十九条' },
      ];

  const [rows, setRows] = useState<RowData[]>(defaultRows);
  const [nextId, setNextId] = useState(defaultRows.length + 1);

  useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  const addRow = (index: number) => {
    if (rows.length < 10) {
      const newRow = { id: nextId, defaultValue: '' };
      const newRows = [...rows];
      newRows.splice(index + 1, 0, newRow);
      setRows(newRows);
      setNextId(nextId + 1);
    }
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          px: 2,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
          Zeihou Jump
        </Typography>
        <Grid container direction="column" spacing={2} sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          {rows.map((row, index) => (
            <Row
              key={row.id}
              id={row.id}
              defaultValue={row.defaultValue}
              onAddRow={() => {
                addRow(index);
              }}
              onRemoveRow={() => {
                removeRow(index);
              }}
              canRemove={rows.length > 1}
            />
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
