import React from 'react';
interface ScheduleButtonProps {
    firstFeedLabel: string;
    secondFeedLabel: string;
    onScheduleClick: () => void;
  }
  
  export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ firstFeedLabel, secondFeedLabel, onScheduleClick }) => {
	const showNotification = () => {
		if ('Notification' in window) {
		  new Notification('Schedule Set', {
			body: "Set Schedule To: " + firstFeedLabel + " and " + secondFeedLabel,
			icon: 'favicon.png', // Replace with the path to your notification icon
		  });
		}
	  };

	const handleButtonClick = () => {
	
	  // Send a GET request to the backend when the button is clicked
	  fetch(`/api/schedule-action?timeOne=${firstFeedLabel}&timeTwo=${secondFeedLabel}`, {
		method: 'GET',
	  })
		.then((response) => {
		  if (response.ok) {
			console.log('Backend action was triggered successfully.', firstFeedLabel, secondFeedLabel);
            onScheduleClick()
			showNotification()
			
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