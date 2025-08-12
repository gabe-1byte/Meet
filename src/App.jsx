import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';

function App() {
  console.log("App component loaded");
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  const fetchData = async () => {
    console.log("fetchData called");

    const allEvents = await getEvents();
    console.log("Fetched events:", allEvents);

    const filteredEvents = currentCity === 'See all cities' ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    if (filteredEvents && Array.isArray(filteredEvents)) {
      setEvents(filteredEvents.slice(0, currentNOE));
    } else {
      console.warn("filteredEvents is not an array or is undefined");
      setEvents([]);
    }
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents onNumberChanged={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
}

export default App;