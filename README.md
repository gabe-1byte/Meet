# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Key Features & User Stories

### Show/Hide Event Details

As a user,
<br/>I should be able to show or hide event details,
<br/>so that I can choose how much information I want to see for each event.

### Specify Number of Events

As a user,
<br/>I should be able to specify the number of events displayed,
<br/>so that I can control how much content I view at a time.

### Use the App When Offline

As a user,
<br/>I should be able to use the app without an internet connection,
<br/>so that I can access event information even when I'm offline.

### Add an App Shortcut to the Home Screen

As a user,
<br/>I should be able to add a shortcut for the app to my home screen,
<br/>so that I can quickly access the app like a native mobile application.

### Display Charts Visualizing Event Details

As a user,
<br/>I should be able to view charts that visualize event details,
<br/>so that I can better understand trends and insights from the event data.

## Gherkin's Syntax

1. Given the events page is open
   <br/>When the user selects filters
   <br/>Then the they should be able to search for a city to see the events in that city

2. Given the events page is open
   <br/>When a user selects an event
   <br/>Then the user should be able to show or hide event details, so that they can see the amount of information they want to for each event.

3. Given the events page is open
   <br/>When a user selects the filters button
   <br/>Then the user should be able to pick how many events they want displayed at a time

4. Given the app is offline and open
   <br/>When a user selects an event
   Then the user should be able to see event info

5. Given the app is open
   <br/>When a user selects add to home screen
   Then a shortcut should be added to the users home screen

6. Given the main page is open
   <br/>When a user selects the charts page
   <br/>Then the user should be shown a chart with the number of upcoming events in each city
