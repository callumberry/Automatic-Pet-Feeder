import React from 'react';
interface ScheduleButtonProps {
    feedFirst: number;
    feedSecond: number;
    onScheduleClick: () => void;
  }
  
  export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ feedFirst, feedSecond, onScheduleClick }) => {

	const handleButtonClick = () => {
	
	  // Send a GET request to the backend when the button is clicked
	  fetch(`/api/schedule-action?timeOne=${feedFirst}&timeTwo=${feedSecond}`, {
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
		<button onClick={handleButtonClick}>Set Schedule</button>
	  </div>
	);
  };