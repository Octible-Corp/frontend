import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.js';
import Items from './components/Items.js';
import Item from './components/Item.js';
import Food from './components/Food.js';
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
            <Route exact path='/item/:item_id' component={Item} />
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
