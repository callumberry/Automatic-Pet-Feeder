import React, { useState, useEffect } from 'react';
import './App.css'
import PortionSliderComponent from './components/slider/portionSlider.tsx';
import TimeSliderComponent from './components/slider/timeSlider.tsx';
import { LedButton } from './components/buttons/ledButton.tsx';

import Navbar from "./components/navbar/index.tsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/home.tsx";
import About from "./pages/about.tsx";
import AnnualReport from "./pages/annual.tsx";
import Teams from "./pages/team.tsx";
import SignUp from "./pages/signIn.tsx";

import io from 'socket.io-client';

const socket = io('http://ip:5000', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://ip:5000"
  }
});

function App() {
  const [data, setData] = useState(null);
  const [messageFromFlask, setMessageFromFlask] = useState<string>('');

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
    };

    requestNotificationPermission();
  }, []);

  const showNotification = (data: string) => {
		if ('Notification' in window) {
		  new Notification('Pet Fed', {
			body: 'Pet fed, ' + data + ' portions',
			icon: 'favicon.png', // Replace with the path to your notification icon
		  });
		}
	  };

  useEffect(() => {
    //testing
    //socket.emit('info_from_client', 'Hello from React!');
    
    // Listen for messages from Flask
    socket.on('message_to_client', (data: string) => {
      console.log('Received message from Flask:', data);
      setMessageFromFlask(data);
      showNotification(data)
    });

    socket.on('container_data', (data: string) => {
      console.log(data);
      setMessageFromFlask(data);
      showNotification(data)
    });

    socket.on('feed_times', (data: string) => {
      console.log(data);
      setMessageFromFlask(data);
      showNotification(data)
    });

    // Handle connection events
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  
    return () => {
      socket.off('message_to_client');
      // socket.off('container_data');
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



//why is nav bar only there is backend is disconnected?
  return (
    <>
     {data !== null ? (
        <div>
          <p>Message from Flask Websocket: {messageFromFlask}</p>
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

export default App
