import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ServoButton }from '../testing/servoButton.tsx'; 
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
  //const handleFeedClick = () => {
  //  setFeedCount(feedCount + 1);
  //  setPortionCount(portionCount + sliderValue)
  //};
  const handleServoClick = () => {
    // Update feedCount and portionCount when Servo On is clicked
    setFeedCount(feedCount + 1);
    setPortionCount(portionCount + sliderValue);
  };

  return (
    <div>
      
      <Box sx={{ width: 800 }}>
        <h1>Portion Slider</h1>
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
        <p>Fed {feedCount} times</p> {/* Display the number of times fed */}
        <p>Fed {portionCount} portions</p> {/* Display the number of times fed */}
        <ServoButton sliderValue={sliderValue} onServoClick={handleServoClick} />
      </Box>
  
    </div>
    
  );
};

export default SliderComponent;