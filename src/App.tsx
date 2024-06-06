import React, { useState, useEffect } from "react";
import { Box, Typography, createTheme, ThemeProvider, CssBaseline, Grid } from "@mui/material";
import Row from "./Row";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App: React.FC = () => {
  const [rows, setRows] = useState<{ id: number; defaultValue: string }[]>(() => {
    const savedRows = localStorage.getItem("rows");
    return savedRows ? JSON.parse(savedRows) : [
      { id: 1, defaultValue: "第8条の3" },
      { id: 2, defaultValue: "61条の2" },
      { id: 3, defaultValue: "第百十九条" },
    ];
  });

  const [nextId, setNextId] = useState(() => {
    const savedRows = localStorage.getItem("rows");
    return savedRows ? JSON.parse(savedRows).length + 1 : 4;
  });

  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);

  const addRow = (index: number) => {
    if (rows.length < 10) {
      const newRow = { id: nextId, defaultValue: "" };
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
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "100vh", px: 2 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
          Zeihou Jump
        </Typography>
        <Grid container direction="column" spacing={2} sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
          {rows.map((row, index) => (
            <Row
              key={row.id}
              id={row.id}
              defaultValue={row.defaultValue}
              onAddRow={() => addRow(index)}
              onRemoveRow={() => removeRow(index)}
              canRemove={rows.length > 1}
            />
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
