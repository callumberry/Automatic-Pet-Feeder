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

const socket = io('http://ipToReplace:5000', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://ipToReplace:5000"
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
      showNotification(data)
    });

    socket.on('container_data', (data: string) => {
      console.log(data);
      setMessageFromFlask(data)
      showNotification(data)
    });

    socket.on('feed_times', (data: string) => {
      // console.log(data);
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

  interface LinkStyle {
    display: string;
    color: string;
    textAlign: 'center';
    padding: string;
    textDecoration: string;
  }

  const navbarStyle = {
    overflow: 'hidden',
    backgroundColor: '#333',
    width: '100%', // Set width to 100%
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  };

  const liStyle = {
    float: 'left',
  } as React.CSSProperties;

  const linkStyle: LinkStyle = {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
  };

  const activeLinkStyle = {
    backgroundColor: '#04AA6D',
  };

  const hoverLinkStyle = {
    backgroundColor: '#111',
  };


//why is nav bar only there is backend is disconnected?
  return (
    <>
     {data !== null ? (
        <div>
          <div className="navbar" style={navbarStyle}>
            <ul style={ulStyle}>
              <li style={liStyle}><a href="#home" style={linkStyle}>Home</a></li>
              <li style={liStyle}><a href="#news" style={linkStyle}>News</a></li>
              <li style={liStyle}><a href="#contact" style={linkStyle}>Contact</a></li>
              <li style={{ ...liStyle, ...activeLinkStyle }}>
                <a className="active" href="#about" style={{ ...linkStyle, ...activeLinkStyle }}>About</a>
              </li>
            </ul>
          </div>

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
