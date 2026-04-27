import { FC } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export interface HouseFilterOption {
  id: string;
  label: string;
}

interface HouseFilterProps {
  options: HouseFilterOption[];
  selectedHouseId: string | null;
  onChange: (houseId: string | null) => void;
}

export const HouseFilter: FC<HouseFilterProps> = ({
  options,
  selectedHouseId,
  onChange,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const selectedOption = options.find((option) => option.id === selectedHouseId) || null;

  return (
    <Box
      sx={{
        width: isSmallScreen ? '100%' : '450px',
        maxWidth: '100%',
        marginLeft: isSmallScreen ? 0 : 'auto',
        marginBottom: '20px',
      }}
    >
      <Typography
        variant='description'
        sx={{ marginBottom: '6px', display: 'block', color: 'primary.main' }}
      >
        Фильтр по дому
      </Typography>
      <Autocomplete
        options={options}
        value={selectedOption}
        onChange={(_, value) => {
          onChange(value?.id || null);
        }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Все дома'
            size='small'
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        openText='Открыть'
        closeText='Закрыть'
        clearText='Очистить'
      />
      {selectedOption ? (
        <Box
          sx={{
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <Chip
            size='small'
            label={`Дом: ${selectedOption.label}`}
            color='primary'
            variant='outlined'
          />
          <Button
            variant='text'
            size='small'
            onClick={() => onChange(null)}
            sx={{ textTransform: 'none' }}
          >
            Сбросить фильтр
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};
