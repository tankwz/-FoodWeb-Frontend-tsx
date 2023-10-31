import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Container/App';
import './darklybootswatch.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
