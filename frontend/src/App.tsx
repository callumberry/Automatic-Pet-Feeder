/* IMPORTS */

// React
import { useState, useEffect } from 'react';
import './App.css'

// Components
import PortionSliderComponent from './components/slider/portionSlider.tsx';
import TimeSliderComponent from './components/slider/timeSlider.tsx';
import { LedButton } from './components/buttons/ledButton.tsx';   // Don't know why this one needs brackets

// Navbar
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './components/navbar/navbar.css'; // Import your CSS file
import './pages/home.css';

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

//why is nav bar only there is backend is disconnected?
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
  <br/>
  <img src={`data:image/jpeg;base64,${frame}`} alt="Webcam Stream" />
  <p>Information on your food storage: {messageFromFlask}</p>
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
            
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/controls" element={<Controls/>} />
              <Route path="/remoteMonitering" element={<RemoteMonitering/>} />
              <Route path="/petData" element={<PetData/>} />
              <Route path="/about" element={<About/>} />
            </Routes>
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
/* ---------------------------------------------------------------------------------- */
// Export
export default App
