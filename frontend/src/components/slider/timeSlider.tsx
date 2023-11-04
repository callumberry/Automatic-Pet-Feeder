import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
    {
      value: 5,
      label: '5:00',
    },
    {
      value: 6,
      label: '6:00',
    },
    {
      value: 7,
      label: '7:00',
    },
    {
      value: 8,
      label: '8:00',
    },
    {
      value: 9,
      label: '9:00',
    },
    {
      value: 10,
      label: '10:00',
    },
    {
      value: 11,
      label: '11:00',
    },
    {
      value: 12,
      label: '12:00',
    },
    {
      value: 13,
      label: '13:00',
    },
    {
      value: 14,
      label: '14:00',
    },
    {
      value: 15,
      label: '15:00',
    },
    {
      value: 16,
      label: '16:00',
    },
    {
      value: 17,
      label: '17:00',
    },
    {
      value: 18,
      label: '18:00',
    },
    {
      value: 19,
      label: '19:00',
    },
    {
      value: 20,
      label: '20:00',
    },
    {
      value: 21,
      label: '21:00',
    },
    {
      value: 22,
      label: '22:00',
    },
  ];
const minDistance = 5;
const minVal = 5
const maxVal = 22

export default function MinimumDistanceSlider() {
  const [value1, setValue1] = React.useState<number[]>([7, 8]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxVal - minDistance);
        setValue1([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance + minVal);
        setValue1([clamped - minDistance, clamped]);
      }
    } else {
      setValue1(newValue as number[]);
    }
  };

  return (
    <Box sx={{ width: 800 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value1}
        onChange={handleChange1}
        disableSwap
        min={minVal}
        max={maxVal}
        step={1} // change for time
        marks={marks} //add time
          sx={{
            '.MuiSlider-markLabel': {
              color: 'white', // Change the text color to red
            },
          }}
      />
       <div>
        Left Thumb Value: {value1[0]}
        <br />
        Right Thumb Value: {value1[1]}
      </div>
    </Box>
  );
}