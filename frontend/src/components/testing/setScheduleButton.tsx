import React from 'react';
interface ScheduleButtonProps {
    firstFeedLabel: string;
    secondFeedLabel: string;
    onScheduleClick: () => void;
  }
  
  export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ firstFeedLabel, secondFeedLabel, onScheduleClick }) => {

	const handleButtonClick = () => {
	
	  // Send a GET request to the backend when the button is clicked
	  fetch(`/api/schedule-action?timeOne=${firstFeedLabel}&timeTwo=${secondFeedLabel}`, {
		method: 'GET',
	  })
		.then((response) => {
		  if (response.ok) {
			console.log('Backend action was triggered successfully.', firstFeedLabel, secondFeedLabel);
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
		<button onClick={handleButtonClick}>Set Schedule {firstFeedLabel} {secondFeedLabel}</button>
	  </div>
	);
  };