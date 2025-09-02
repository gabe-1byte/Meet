import * as atatus from 'atatus-spa';
atatus.config('b119d46f98654bf2b0983ae11bcaefec').install();

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);