import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';

import './App.css';
import { set } from 'nprogress';

function App() {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert , setInfoAlert] = useState("");
  const [errorAlert , setErrorAlert] = useState("");
  const [warningAlert , setWarningAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();

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
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are currently offline. The events may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alert-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch 
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents onNumberChanged={setCurrentNOE} 
        setErrorAlert={setErrorAlert}
      />
      <CityEventsChart allLocations={allLocations} events={events} />

      <EventList events={events} />
    </div>
  );
}

export default App;