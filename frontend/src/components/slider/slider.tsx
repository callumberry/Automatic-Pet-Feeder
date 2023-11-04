import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
//import Slider from '@mui/material-next/Slider';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

//function valuetext(value: number) {
//  return `${value}`;
//}

const SliderComponent = () => {
  const [sliderValue, setSliderValue] = useState(1);
  const [feedCount, setFeedCount] = useState(0); 
  const [portionCount, setPortionCount] = useState(0); 

  // Function to handle slider value changes
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
    }
  
  };
  const handleFeedClick = () => {
    setFeedCount(feedCount + 1);
    setPortionCount(portionCount + sliderValue)
  };

  return (
    <div>
      <h1>Slider Test</h1>
      <Box sx={{ width: 300 }}>
        <Slider
          value={sliderValue} // Use the state variable as the value
          onChange={handleSliderChange} //
          step={1}
          min={1}
          max={5}
          //getAriaValueText={valuetext}
          //valueLabelDisplay="auto"
          marks={marks}
          sx={{
            '.MuiSlider-markLabel': {
              color: 'white', // Change the text color to red
            },
          }}
          //color="primary"
        />
      </Box>
      <button onClick={handleFeedClick}>Feed {sliderValue} portions</button>
      <p>Fed {feedCount} times</p> {/* Display the number of times fed */}
      <p>Fed {portionCount} portions</p> {/* Display the number of times fed */}
    </div>
    
  );
};

export default SliderComponent;