import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  duration: 800,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




reportWebVitals();
