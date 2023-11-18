import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ServoButton }from '../buttons/servoButton.tsx'; 
import { PortionButton }from '../buttons/setPortionButton.tsx'; 
//import Slider from '@mui/material-next/Slider';

import io from 'socket.io-client';

/* ---------------------------------------------------------------------------------- */
/* SETUP */

// Configure Socket IO
const socket = io('http://ipToReplace:5000', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://ipToReplace:5000"
  }
});

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

  const handlePortionClick = () => {
    // Update feedCount and portionCount when Servo On is clicked
    setFeedCount(feedCount + 1);
    setPortionCount(portionCount + sliderValue);
  };

  socket.on('portion_data', (data: number) => {
    setSliderValue(data)
  });

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
        <div>
        <PortionButton sliderValue={sliderValue} onPortionClick={handlePortionClick} />
        <ServoButton onServoClick={handleServoClick} />
        Fed {feedCount} times
        <br/>
        Fed {portionCount} portions
        </div> 
        
      </Box>
  
    </div>
    
  );
};

export default SliderComponent;