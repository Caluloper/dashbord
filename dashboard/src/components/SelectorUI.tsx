import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { type SelectorUIProps } from '../types/DashboardTypes';

export default function SelectorUI({ value, onChange }: SelectorUIProps) {

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
    };

  return (
    <FormControl fullWidth variant="outlined" size="small" sx={{ bgcolor: '#fff', borderRadius: 1 }}>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={value || ''}
        color="primary"
        onChange={handleChange}
        displayEmpty
        sx={{
          backgroundColor: '#fff',
          borderRadius: 1,
        }}
      >
        <MenuItem value="" disabled><em>Seleccione una ciudad</em></MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
      {value && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{value}</span>
        </Typography>
      )}
    </FormControl>
  )
}