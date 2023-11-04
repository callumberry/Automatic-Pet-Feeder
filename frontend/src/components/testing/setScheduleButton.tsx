import React from 'react';
interface ScheduleButtonProps {
    leftValue: number;
    rightValue: number;
    onScheduleClick: () => void;
  }
  
  export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ leftValue, rightValue, onScheduleClick }) => {

	const handleButtonClick = () => {
	
	  // Send a GET request to the backend when the button is clicked
	  fetch(`/api/schedule-action`, {
		method: 'GET',
	  })
		.then((response) => {
		  if (response.ok) {
			console.log('Backend action was triggered successfully.');
            onScheduleClick()
			
		} else {
			console.error('Backend action request failed.');	
		}
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	};
  
	return (
	  <div>
		<button onClick={handleButtonClick}>Set Schedule {leftValue} {rightValue}</button>
	  </div>
	);
  };