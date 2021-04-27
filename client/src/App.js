import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing.js';
import Items from './components/layout/Items.js';
import Food from './components/layout/Food.js';
import { Provider } from 'react-redux';
import store from './store';
import './assets/css/argon-design-system-react.css';
import './assets/css/nucleo.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/:restaurant_id' component={Landing} />
            <Route exact path='/items/:section_id' component={Items} />
            <Route
              exact
              path='/items/:section_id/food/:food_id'
              component={Food}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
