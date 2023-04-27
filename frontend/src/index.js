import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/reset.css';
import './assets/css/app-styles.css';
import './assets/css/antd-overrides.css';
import 'react-quill/dist/quill.snow.css';
import 'simplebar-react/dist/simplebar.min.css';

// render application
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

reportWebVitals();
