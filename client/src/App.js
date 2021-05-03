import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import { Provider } from 'react-redux';
import store from './store';
import './assets/css/argon-design-system-react.css';
import './assets/css/nucleo.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppWrapper />
      </Router>
    </Provider>
  );
};

export default App;
