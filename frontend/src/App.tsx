/* IMPORTS */

// React
import { useState, useEffect } from 'react';
import './App.css'

// Components
import PortionSliderComponent from './components/slider/portionSlider.tsx';
import TimeSliderComponent from './components/slider/timeSlider.tsx';
import { LedButton } from './components/buttons/ledButton.tsx';   // Don't know why this one needs brackets

// Socket IO
import io from 'socket.io-client';



/* ---------------------------------------------------------------------------------- */
/* SETUP */

// Configure Socket IO
const socket = io('http://192.168.2.46:5000', {
  transports: ['websocket', 'polling'],
  path: '/socket.io',
});

/* ---------------------------------------------------------------------------------- */
/* APP */

function App() {
  // Variables and functions to set them
  const [connection, setConnection] = useState(null);
  const [messageFromFlask, setMessageFromFlask] = useState<string>('');
  const [frame, setFrame] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  /* ---------------------------------------------------------------------------------- */
  /* FUNCTIONS MAYBE */
  const showNotification = (data: string) => {
		if ('Notification' in window) {
		  new Notification('Pet Fed', {
			body: 'Pet fed, ' + data + ' portions',
			icon: 'favicon.png', // Replace with the path to your notification icon
		  });
		}
	};
  const toggleCameraView = () => {
    setShowCamera(!showCamera);
  };


  /* ---------------------------------------------------------------------------------- */
  /* USE EFFECTS */

  //Notification Permission Setup
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
    };

    requestNotificationPermission();
  }, []);

  //Socket/
  useEffect(() => {
 
    socket.on('frame', data => {
      console.log('Got Frame');
      setFrame(data.data);
    });

    // Listen for messages from Flask
    socket.on('message_to_client', (data: string) => {
      console.log('Received message from Flask:', data);
      setMessageFromFlask(data);
      showNotification(data)
    });

   
    /* Connection Status  */
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
    
    //Turns all Sockets Off, IDK why
    return () => {
      socket.off('frame');
      socket.off('message_to_client');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    // Define a function to fetch data from your Flask backend
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (response.ok) {
          const jsonData = await response.json();
          setConnection(jsonData);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty array means this effect runs once after the initial render

/* ---------------------------------------------------------------------------------- */
/* HTML */

//why is nav bar only there is backend is disconnected?
return (
  <>
  {connection ? (
    showCamera ? (
      // Render only the camera feed when data is not null and showCamera is true
      <div>
        <img src={`data:image/jpeg;base64,${frame}`} alt="Webcam Stream" />
        <br/>
        <button onClick={toggleCameraView}>Show All</button>
      </div>
    ) : (
      // Render all components when data is not null and showCamera is false
      <div>
        <h1>FEED</h1>
        <p>Message from Flask Websocket: {messageFromFlask}</p>
        <LedButton />
        <PortionSliderComponent />
        <TimeSliderComponent />
        <button onClick={toggleCameraView}>Show Camera</button>
      </div>
    )
  ) : (
    // Render this part when data is null
    <div>
      <p>No connection to the server, please refresh the page.</p>
    </div>
  )}
</>
);
}

/* ---------------------------------------------------------------------------------- */
// Export
export default App
