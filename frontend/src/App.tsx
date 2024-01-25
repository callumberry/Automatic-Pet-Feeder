import React, { useState, useEffect } from 'react';
import './App.css'
import PortionSliderComponent from './components/slider/portionSlider.tsx';
import TimeSliderComponent from './components/slider/timeSlider.tsx';
import { LedButton } from './components/buttons/ledButton.tsx';

import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './components/navbar.css'; // Import your CSS file
import './pages/home.css';


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


const Home = () => 
<div>Home Page
    <header>
        <img src="https://via.placeholder.com/1200x400" alt="Header Image"/>
    </header>

    <div className="container">
        <div className="main-content">
            <h2>About Us</h2>
            <p>Welcome to our innovative startup! We aim to...</p>

            <h2>Our Services</h2>
            <ul>
                <li>Service 1</li>
                <li>Service 2</li>
                <li>Service 3</li>
            </ul>
        </div>

        <div className="sidebar">
            <h2>Image Gallery</h2>
            <div className="gallery">
               
                <img src="https://via.placeholder.com/300x200" alt="Image 1"/>
                <img src="https://via.placeholder.com/300x200" alt="Image 2"/>
                <img src="https://via.placeholder.com/300x200" alt="Image 3"/>
                <img src="https://via.placeholder.com/300x200" alt="Image 4"/>
            </div>
        </div>
    </div>

    <footer>
        &copy; 2023 Startup Company | All Rights Reserved
    </footer>
</div>;

const Controls = () => 
<div>Controls Page
  <div className="container">
    <br/>
    <br/>
    <LedButton />
    <PortionSliderComponent /> 
    <TimeSliderComponent /> 
  </div>
</div>;

const RemoteMonitering = () => 
<div>Remote Monitering Page
  <p>Message from Flask Websocket: {messageFromFlask}</p>
</div>;

const PetData = () => <div>Pet Data Page</div>;
const About = () => <div>About Page</div>;


//why is nav bar only there is backend is disconnected?
  return (
    <>
     {data !== null ? (   
        
        <div>
          <Router>
            <div className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/controls">Contols</Link></li>
                    <li><Link to="/remoteMonitering">Remote Monitering</Link></li>
                    <li><Link to="/petData">Pet Data</Link></li>
                    <li style={{ float: 'right' }}><Link to="/about">About</Link></li>
                </ul>

                <hr />  
            </div>
            
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/controls" component={Controls} />
              <Route path="/remoteMonitering" component={RemoteMonitering} />
              <Route path="/petData" component={PetData} />
              <Route path="/about" component={About} />
            </Switch>
          </Router>

          
        </div>
      ) : (
        <div>
        <p>Data from Flask</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <p>please refresh the page</p>
      </div>
      )}
    </>
  )
}

export default App
