import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Container/App';
import 'bootstrap/dist/css/bootstrap.css';
import './darklybootswatch.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
