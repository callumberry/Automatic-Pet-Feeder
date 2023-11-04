import React, { useState, useEffect } from 'react';
import './App.css'
import SliderComponent from './components/slider/slider.tsx';
import { LedButton } from './components/testing/ledButton.tsx';



function App() {
  const [data, setData] = useState(null);

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


  return (
    <>
     {data !== null ? (
        <div>
          <SliderComponent /> 
          <LedButton />
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
