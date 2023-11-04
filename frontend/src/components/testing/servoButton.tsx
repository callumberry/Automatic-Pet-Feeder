export const ServoButton = (props) => {
	const handleButtonClick = () => {
		// Send a GET request to the backend when the button is clicked
		fetch('/api/servo-action', {
		  method: 'GET',
		})
		  .then((response) => {
			if (response.ok) {
			  // Handle a successful response from the backend
			  console.log('Backend action was triggered successfully.');
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
			<button onClick={handleButtonClick}>No double clicking</button>
		</div>
	)
}