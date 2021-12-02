import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import App from './App';
import './css/index.css'
import { Provider } from "react-redux"
import { store } from "./redux/store"

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);





