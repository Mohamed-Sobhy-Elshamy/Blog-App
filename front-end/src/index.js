import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'

// from redux 
// عشان نربط ال front with back
import store from './redux/Store';
import { Provider } from "react-redux"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
        <App />
    </Provider>
  </React.StrictMode>
);

