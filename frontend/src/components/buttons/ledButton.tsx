export const LedButton = (props) => {
	const showNotification = () => {
		if ('Notification' in window) {
		  new Notification('LED Toggled', {
			body: 'You have changed the state of the LED.',
			icon: 'favicon.png', // Replace with the path to your notification icon
		  });
		}
	  };
	  
	const handleButtonClick = () => {
		// Send a GET request to the backend when the button is clicked
		fetch('/api/backend-action', {
		  method: 'GET',
		})
		  .then((response) => {
			if (response.ok) {
			  // Handle a successful response from the backend
			  console.log('Backend action was triggered successfully.');
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
			<button onClick={handleButtonClick}>Toggle LED</button>
		</div>
	)
}