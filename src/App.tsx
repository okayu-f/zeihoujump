import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import generateLinkEGov from "./generateLinkEGov";
import { laws, Law } from "./laws";
import "./App.css";

interface RowProps {
  id: number;
  defaultValue: string;
  onAddRow: () => void;
  onRemoveRow: () => void;
  canRemove: boolean;
}

const Row: React.FC<RowProps> = ({ id, defaultValue, onAddRow, onRemoveRow, canRemove }) => {
  const [articleNum, setArticleNum] = useState<string>(() => {
    const savedArticleNum = localStorage.getItem(`articleNum-${id}`);
    return savedArticleNum ? savedArticleNum : defaultValue;
  });
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(() => {
    const savedLaw = localStorage.getItem(`selectedLaw-${id}`);
    return savedLaw ? JSON.parse(savedLaw) : null;
  });

  useEffect(() => {
    localStorage.setItem(`articleNum-${id}`, articleNum);
  }, [articleNum, id]);

  useEffect(() => {
    if (selectedLaw) {
      localStorage.setItem(`selectedLaw-${id}`, JSON.stringify(selectedLaw));
    } else {
      localStorage.removeItem(`selectedLaw-${id}`);
    }
  }, [selectedLaw, id]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleNum(event.target.value);
  };

  const handleLawChange = (event: SelectChangeEvent<string>) => {
    const law = laws.find((law) => law.id === event.target.value) || null;
    setSelectedLaw(law);
  };

  const linkHref = selectedLaw ? generateLinkEGov(selectedLaw.id, articleNum) : "";

  const extractLinkText = (url: string) => {
    try {
      const { origin, hash } = new URL(url);
      return `${origin}/...${hash}`;
    } catch {
      return url;
    }
  };

  const linkText = extractLinkText(linkHref);

  return (
    <Grid container item spacing={2} alignItems="center" minWidth={{ md:"100vw", lg:"1200px" }}>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel id="law-select-label">法令</InputLabel>
          <Select
            labelId="law-select-label"
            label="法令"
            value={selectedLaw ? selectedLaw.id : ""}
            onChange={handleLawChange}
            renderValue={(selected) => {
              const law = laws.find((law) => law.id === selected);
              return <Typography sx={{ textAlign: "left" }}>{law ? `${law.abbreviation} - ${law.fullName}` : ""}</Typography>;
            }}
          >
            {laws.map((law) => (
              <MenuItem key={law.id} value={law.id}>
                <Typography noWrap>
                  {law.abbreviation} - {law.fullName}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField value={articleNum} onChange={handleValueChange} fullWidth />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid grey", height: "100%", minHeight: 40 }}>
          <Link
            href={linkHref}
            sx={{ textAlign: "left", flex: 1, textDecoration: "none", color: linkText ? "inherit" : "grey" }}
            target="_blank"
            rel="noopener noreferrer"
            noWrap
          >
            {linkText || "ここにURLが表示されます"}
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={onAddRow}>
          <Add />
        </IconButton>
        <IconButton onClick={onRemoveRow} disabled={!canRemove}>
          <Remove />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App: React.FC = () => {
  const [rows, setRows] = useState<{ id: number; defaultValue: string }[]>([
    { id: 1, defaultValue: "第8条の3" },
    { id: 2, defaultValue: "61条の2" },
    { id: 3, defaultValue: "第百十九条" },
  ]);

  const [nextId, setNextId] = useState(4);

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
      <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
        Zeihou Jump
      </Typography>
      <Grid container direction="column" spacing={2} sx={{ p: 2 }}>
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
    </ThemeProvider>
  );
};

export default App;
