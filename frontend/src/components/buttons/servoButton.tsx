import React, { useState } from 'react';
interface ServoButtonProps {
  onServoClick: () => void; // Define onServoClick as a function with no arguments and no return value
}
  
  export const ServoButton: React.FC<ServoButtonProps> = ({ onServoClick }) => {
	const [isServoMoving, setIsServoMoving] = useState(false);

	const handleButtonClick = () => {
		if (isServoMoving) {
			return;
		  }
	  
		setIsServoMoving(true);
		
	
	  // Send a GET request to the backend when the button is clicked
	  fetch(`/api/servo-action`, {
		method: 'GET',
	  })
		.then((response) => {
		  if (response.ok) {
			console.log('Backend action was triggered successfully.');
			onServoClick();
			setIsServoMoving(false);
		} else {
			console.error('Backend action request failed.');
			setIsServoMoving(false);
		}
		})
		.catch((error) => {
		  console.error('Error:', error);
		  setIsServoMoving(false);
		});
	};
  
	return (
	  <div>
		<button onClick={handleButtonClick} disabled={isServoMoving}>manual feed (set portion first)</button>
	  </div>
	);
  };