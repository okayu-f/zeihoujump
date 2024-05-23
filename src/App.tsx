import { Box, Link, TextField, Typography, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import React from "react";
import "./App.css";

interface RowProps {
  fixedValue: string;
  defaultValue: string;
  linkHref: string;
}

const Row: React.FC<RowProps> = ({ fixedValue, defaultValue, linkHref }) => {
  // linkHref からドメインと省略された部分を抽出するロジック
  const extractLinkText = (url: string) => {
    try {
      const { hostname, pathname, hash } = new URL(url);
      if (hostname === "www.nta.go.jp") {
        return `${hostname}/...${pathname.split('/').pop()}`;
      }
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
      <TextField defaultValue={defaultValue} sx={{ mr: 2, flex: 2 }} />
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
        <Row
          fixedValue="法規"
          defaultValue="第8条の3"
          linkHref="https://elaws.e-gov.go.jp/document?lawid=340M50000040012#Mp-At_8_3"
        />
        <Row
          fixedValue="法規通"
          defaultValue="2-3-3"
          linkHref="https://www.nta.go.jp/law/tsutatsu/kihon/hojin/02/02_03_03.htm"
        />
        <Row
          fixedValue="法法"
          defaultValue="61条の2"
          linkHref="https://elaws.e-gov.go.jp/document?lawid=340AC0000000034#Mp-At_61_2"
        />
        <Row
          fixedValue="法令"
          defaultValue="第百十九条"
          linkHref="https://elaws.e-gov.go.jp/document?lawid=340CO0000000097#Mp-At_119"
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
