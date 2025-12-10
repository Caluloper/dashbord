import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type SelectorUIProps } from '../types/DashboardTypes';

export default function SelectorUI({ value, onChange }: SelectorUIProps) {

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
    };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        onChange={handleChange}>
        <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
      {value &&
        <p>
          Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{value}</span>
        </p>
      }
    </FormControl>
  )
}