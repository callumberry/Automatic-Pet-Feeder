import React from 'react';
interface PortionButtonProps {
  sliderValue: number;
  onPortionClick: () => void; // Define onServoClick as a function with no arguments and no return value
}
  
  export const PortionButton: React.FC<PortionButtonProps> = ({ sliderValue, onPortionClick }) => {


	const handleButtonClick = () => {
		
		
	
	  // Send a GET request to the backend when the button is clicked
	  fetch(`/api/portion-action?portions=${sliderValue}`, {
		method: 'GET',
	  })
		.then((response) => {
		  if (response.ok) {
			console.log('Backend action was triggered successfully.');
		
		} else {
			console.error('Backend action request failed.');
            onPortionClick();
		}
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	};
  
	return (
	  <div>
		<button onClick={handleButtonClick}>Set Portion {sliderValue}</button>
	  </div>
	);
  };