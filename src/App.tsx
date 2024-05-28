import { Box, Link, TextField, Typography, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import "./App.css";

interface RowProps {
  fixedValue: string;
  defaultValue: string;
  baseUrl: string;
}

const kansujiToArabic = (value: string) => {
  const kanjiToNum = (kanji: string) => {
    const kanjiDigits = "〇一二三四五六七八九";
    return kanjiDigits.indexOf(kanji);
  };

  return value.replace(/[一二三四五六七八九〇十百]+/g, (match) => {
    let result = 0;
    let temp = 0;

    for (let i = 0; i < match.length; i++) {
      const currentChar = match[i];
      if (currentChar === "百") {
        result += (temp || 1) * 100;
        temp = 0;
      } else if (currentChar === "十") {
        result += (temp || 1) * 10;
        temp = 0;
      } else {
        temp = temp * 10 + kanjiToNum(currentChar);
      }
    }

    result += temp;
    return result.toString();
  });
};

const convertLawText = (value: string) => {
  const matches = value.match(/([^0-9]*)(\d+)([^0-9]*)(\d*)([^0-9]*)/);
  if (!matches) {
    return "";
  }
  const [, , num1, , num2, suffix] = matches;

  // suffixが項、号である場合、num1のみ返す
  if (suffix === "項" || suffix === "号") {
    return num1;
  } else {
    const result = num2 ? `${num1}_${num2}` : num1;
    return result;
  }
};

const generateLinkEGov = (baseurl: string, value: string) => {
  const arabicNumValue = kansujiToArabic(value);
  const convertedValue = convertLawText(arabicNumValue);

  return `${baseurl}${convertedValue}`;
};

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
