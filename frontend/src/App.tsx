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
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://192.168.2.46:5000"
  }
});

/* ---------------------------------------------------------------------------------- */
/* APP */

function App() {
  // Variables and functions to set them
  const [data, setData] = useState(null);
  const [messageFromFlask, setMessageFromFlask] = useState<string>('');
  const [frame, setFrame] = useState('');
  const [page, setPage] = useState<string>('home');

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

  // ??????????????????????????????/
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

    socket.on('container_data', (data: string) => {
      console.log(data);
      setMessageFromFlask(data)
      //showNotification(data)
    });

    socket.on('feed_times', (data: string) => {
      console.log(data);
      //showNotification(data)
    });
    
    //Turns all Sockets Off, IDK why
    return () => {
      socket.off('container_data');
      socket.off('feed_times');
      socket.off('message_to_client');
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
          setData(jsonData);
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

return (
  <>
  
  <div className="header">
    <button onClick={() => setPage("home")} className="nav-buttons">feed</button>
    <button onClick={() => setPage("controls")} className="nav-buttons">controls</button>
    <button onClick={() => setPage("monitoring")} className="nav-buttons">remote monitoring</button>
    <button onClick={() => setPage("pet")} className="nav-buttons">pet data</button>
    <button onClick={() => setPage("about")} className="nav-buttons">about</button>
    <br/>
  </div>
  <div className="body">
  {data ? (
    page == "monitoring" ? (
      // Render only the camera feed when data is not null and showCamera is true
      <div>
        <p>Container Food Level: {messageFromFlask}</p>
        <img src={`data:image/jpeg;base64,${frame}`} alt="Webcam Stream" />
        
      </div>
    ) : page == "controls" ? (
      <div>
        <br/>
        <LedButton />
        <PortionSliderComponent />
        <TimeSliderComponent />
      </div>
    ) : page == "pet" ? (
      <div>
        <p>Pet Data</p>
      </div>
    ) : page == "about" ? (
      <div>
        <p>About</p>
      </div>
    ) : (
      <div>
       <p>Home Page</p>
      </div>  

    )
  ) : (
    // Render this part when data is null
    <div>
      <p>No connection to the server, please refresh the page.</p>
    </div>
  )}
  </div>
  <br/>
  <footer>
        <p>&copy; 2023 feed. All rights reserved.</p>
  </footer>
</>
);
}

/* ---------------------------------------------------------------------------------- */
// Export
export default App
