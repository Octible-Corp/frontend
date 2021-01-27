import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Setup from './components/auth/Setup';
import Landing from './components/layout/Landing';

import Routes from './components/routing/Routes';
import ResetPassword from './components/auth/ResetPassword';
import Reset from './components/auth/Reset';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Alert from './components/layout/Alert';
import Header from './components/header/Header';
import { LOGOUT } from './actions/types';

import './assets/css/argon-design-system-react.css';
import './assets/css/nucleo.css';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Header />
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/setup/:id" component={Setup} />
            <Route exact path="/resetpsw/:id" component={Setup} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
