import type React from 'react';
import { useState, useEffect } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { Box, Link, TextField, Typography, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, Grid, IconButton } from '@mui/material';
import generateLinkEGov from './generateLinkEGov';
import { laws, isLaw, type Law } from './laws';
export interface RowData {
  id: number;
  defaultValue: string;
}

interface RowProps extends RowData {
  onAddRow: () => void;
  onRemoveRow: () => void;
  canRemove: boolean;
}

export const isRowDataArray = (data: unknown): data is RowData[] => {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'defaultValue' in item &&
      typeof (item as RowData).id === 'number' &&
      typeof (item as RowData).defaultValue === 'string',
  );
};

export const Row: React.FC<RowProps> = ({ id, defaultValue, onAddRow, onRemoveRow, canRemove }) => {
  const [articleNum, setArticleNum] = useState<string>(() => {
    const savedArticleNum = localStorage.getItem(`articleNum-${id}`);

    return savedArticleNum ?? defaultValue;
  });
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(() => {
    const savedLawJson = localStorage.getItem(`selectedLaw-${id}`);
    const savedLaw: unknown = savedLawJson !== null ? JSON.parse(savedLawJson) : null;

    return isLaw(savedLaw) ? savedLaw : null;
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
    const law = laws.find((law) => law.id === event.target.value) ?? null;
    setSelectedLaw(law);
  };

  const linkHref = selectedLaw ? generateLinkEGov(selectedLaw.id, articleNum) : '';

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
    <Grid item>
      <Box minWidth={{ md: '90vw', lg: '1120px' }} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, p: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid container item xs={10} alignItems="center" spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="law-select-label">法令</InputLabel>
                <Select
                  labelId="law-select-label"
                  label="法令"
                  value={selectedLaw ? selectedLaw.id : ''}
                  onChange={handleLawChange}
                  renderValue={(selected) => {
                    const law = laws.find((law) => law.id === selected);

                    return <Typography sx={{ textAlign: 'left' }}>{law ? `${law.abbreviation} - ${law.fullName}` : ''}</Typography>;
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
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid grey',
                  height: '100%',
                  minHeight: 40,
                }}
              >
                <Link
                  href={linkHref}
                  sx={{
                    textAlign: 'left',
                    flex: 1,
                    textDecoration: 'none',
                    color: linkText ? 'inherit' : 'grey',
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  noWrap
                >
                  {linkText || 'ここにURLが表示されます'}
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={onAddRow}>
              <Add />
            </IconButton>
            <IconButton onClick={onRemoveRow} disabled={!canRemove}>
              <Remove />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
