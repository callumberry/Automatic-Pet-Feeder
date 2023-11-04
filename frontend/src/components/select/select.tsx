import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [time, setTime] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="time-select-label" sx={{color: 'white'}}>Time</InputLabel>
        <Select
          labelId="time-select-label"
          id="time-select"
          value={time}
          label="Time"
          sx={{ background: '#1a1a1a', color: 'white'}} 
          onChange={handleChange}
        >
            <MenuItem value={12}>12:00</MenuItem>
            <MenuItem value={1}>1:00</MenuItem>
            <MenuItem value={2}>2:00</MenuItem>
            <MenuItem value={3}>3:00</MenuItem>
            <MenuItem value={4}>4:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}