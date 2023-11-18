/* IMPORTS */

// React
import { useState, useEffect } from 'react';
import './App.css'

// Navbar
import Navbar from "./components/navbar/index.tsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

// Pages
import Home from "./pages/home.tsx";
import About from "./pages/about.tsx";
import AnnualReport from "./pages/annual.tsx";
import Teams from "./pages/team.tsx";
import SignUp from "./pages/signIn.tsx";

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
  const [data, setData] = useState(null);
  const [messageFromFlask, setMessageFromFlask] = useState<string>('');
  const [frame, setFrame] = useState('');

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

//why is nav bar only there is backend is disconnected?
  return (
    <>
     {data !== null ? (
        <div>
          <h1>FEED</h1>
          <p>Message from Flask Websocket: {messageFromFlask}</p>
          <img src={`data:image/jpeg;base64,${frame}`} alt="Webcam Stream" />
          <LedButton />
          <PortionSliderComponent /> 
          <TimeSliderComponent /> 
        </div>
      ) : (
        <div>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/annual"
                    element={<AnnualReport />}
                />
                <Route path="/team" element={<Teams />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
            </Routes>
        </Router>

        

        <p>Data from Flask</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <p>please refresh the page</p>
      </div>
      )}
    </>
  )
}

/* ---------------------------------------------------------------------------------- */
// Export
export default App
