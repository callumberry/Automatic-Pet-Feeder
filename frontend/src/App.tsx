/* IMPORTS */

// React
import { useState, useEffect } from 'react';
import './App.css'

// Components
import PortionSliderComponent from './components/slider/portionSlider.tsx';
import TimeSliderComponent from './components/slider/timeSlider.tsx';
import { LedButton } from './components/buttons/ledButton.tsx';   // Don't know why this one needs brackets
import BarChart from './components/graphs/BarChart';
import UltrasonicLineChart from './components/graphs/UltrasonicLineChart.tsx';
import PetFeeder from './components/dropdown/FeedingScheduler.tsx';
import ImageCarousel from './components/carousel/ImageCarousel.tsx';
import ContainerFillVisualizer from './components/container/container.tsx';

// Socket IO
import io from 'socket.io-client';

/* ---------------------------------------------------------------------------------- */
/* SETUP */

// Configure Socket IO
const socket = io('http://192.168.2.113:5000', {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://192.168.2.113:5000"
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

  /* --------------------------------------------------------------------------------- */
  /* Component Data */
  const data1 = [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55];
  const labels1 = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

  const data2 = [65, 59, 80, 81, 56, 55, 40];
  const labels2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const fillPercentage = 50;
  const customIconUrl = 'https://cdn1.iconfinder.com/data/icons/shapes/24/Cylinder-2-512.png'; // Replace with your custom icon URL
  
  const images = [
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/09/getty_creative.jpeg.jpg',
    'https://www.usatoday.com/gcdn/presto/2022/05/25/USAT/719946ca-660e-4ebf-805a-2c3b7d221a85-Hero-3.jpg?crop=1593,897,x6,y0&width=1593&height=796&format=pjpg&auto=webp',
    'https://images.halloweencostumes.ca/products/21346/1-1/adult-black-cat-costume.jpg',
    'https://i.ebayimg.com/images/g/KL8AAOSwV4ZjruEo/s-l1200.webp'
  ];

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
        <br/>
        <img src={`data:image/jpeg;base64,${frame}`} alt="Webcam Stream" style={{width: '640px', height:'auto'}}  />
        <h1>Container Food Level: {messageFromFlask}</h1>
        <ContainerFillVisualizer fillPercentage={fillPercentage} customIconUrl={customIconUrl} />
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
        <p>Today's Consumption</p>
        <BarChart data={data1} labels={labels1} />
        <p>This Week's Consumption</p>
        <BarChart data={data2} labels={labels2} />
      </div>
    ) : page == "about" ? (
      <div>
        <p>About</p>
      </div>
    ) : (
      <div>
       <ImageCarousel images={images} />
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
