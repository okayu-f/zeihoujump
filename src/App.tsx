import React, { useState, useEffect } from "react";
import { Box, Link, TextField, Typography, createTheme, ThemeProvider, CssBaseline, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid } from "@mui/material";
import generateLinkEGov from "./generateLinkEGov";
import { laws, Law } from "./laws";
import "./App.css";

interface RowProps {
  id: string;
  defaultValue: string;
}

const Row: React.FC<RowProps> = ({ id, defaultValue }) => {
  const [articleNum, setArticleNum] = useState(defaultValue);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(() => {
    const savedLaw = localStorage.getItem(`selectedLaw-${id}`);
    return savedLaw ? JSON.parse(savedLaw) : null;
  });

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
    const law = laws.find(law => law.abbreviation === event.target.value) || null;
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
    <Grid container item spacing={2} alignItems="center" width={'100%'}>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel id="law-select-label">法令</InputLabel>
          <Select
            labelId="law-select-label"
            value={selectedLaw ? selectedLaw.abbreviation : ""}
            onChange={handleLawChange}
          >
            {laws.map((law) => (
              <MenuItem key={law.id} value={law.abbreviation}>
                <Typography noWrap>{law.abbreviation} - {law.fullName}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField value={articleNum} onChange={handleValueChange} fullWidth sx={{ minWidth: 200 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid grey", height: "100%", minWidth: 200, minHeight: 40 }}>
          <Link
            href={linkHref}
            sx={{ textAlign: "left", flex: 1, textDecoration: "none", color: linkText ? "inherit" : "grey", display: "inline-block" }}
            target="_blank"
            rel="noopener noreferrer"
            noWrap
          >
            {linkText || "ここにURLが表示されます"}
          </Link>
        </Box>
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
        Zeihou Jump
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Row id="row1" defaultValue="第8条の3" />
        <Row id="row2" defaultValue="61条の2" />
        <Row id="row3" defaultValue="第百十九条" />
      </Grid>
    </ThemeProvider>
  );
};

export default App;
