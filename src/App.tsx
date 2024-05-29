import generateLinkEGov from "./generateLinkEGov";

import { Box, Link, TextField, Typography, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import "./App.css";

interface RowProps {
  fixedValue: string;
  defaultValue: string;
  baseUrl: string;
}

const Row: React.FC<RowProps> = ({ fixedValue, defaultValue, baseUrl }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const linkHref = generateLinkEGov(baseUrl, value);

  // linkHref からドメインと省略された部分を抽出するロジック
  const extractLinkText = (url: string) => {
    try {
      const { hostname, hash } = new URL(url);
      return `${hostname}/...${hash}`;
    } catch {
      return url;
    }
  };

  const linkText = extractLinkText(linkHref);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <TextField
        value={fixedValue}
        InputProps={{
          readOnly: true,
        }}
        sx={{ mr: 2, flex: 1 }}
      />
      <TextField value={value} onChange={handleChange} sx={{ mr: 2, flex: 2 }} />
      <Box sx={{ flex: 4, display: "flex", alignItems: "center", borderBottom: "1px solid grey", height: "100%" }}>
        <Link href={linkHref} sx={{ textAlign: "left", flex: 1, textDecoration: "none", color: "inherit" }} target="_blank" rel="noopener noreferrer">
          {linkText}
        </Link>
      </Box>
    </Box>
  );
};

const theme = createTheme({
  palette: {
    mode: "light", // ライトテーマを固定
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
        Zeihou Jump
      </Typography>
      <Box sx={{ p: 2 }}>
        <Row fixedValue="法規" defaultValue="第8条の3" baseUrl="https://elaws.e-gov.go.jp/document?lawid=340M50000040012#Mp-At_" />
        <Row fixedValue="法法" defaultValue="61条の2" baseUrl="https://elaws.e-gov.go.jp/document?lawid=340AC0000000034#Mp-At_" />
        <Row fixedValue="法令" defaultValue="第百十九条" baseUrl="https://elaws.e-gov.go.jp/document?lawid=340CO0000000097#Mp-At_" />
      </Box>
    </ThemeProvider>
  );
}

export default App;
