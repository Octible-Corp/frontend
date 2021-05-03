import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.js';
import Items from './components/Items.js';
import Item from './components/Item.js';
import Food from './components/Food.js';
import Pdf from './components/Pdf.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AppWrapper = ({ dba }) => {
  return (
    <Fragment>
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: dba.background_color,
        }}
      >
        <img
          src={
            'https://s3-us-west-1.amazonaws.com/menu.octibleapi.com/wave.svg'
          }
          style={{
            transform: 'rotate(90deg)',

            backgroundColor: 'red',
          }}
        />
        <Switch>
          <Route exact path='/:restaurant_id' component={Landing} />
          <Route exact path='/items/:section_id' component={Items} />
          <Route exact path='/item/:item_id' component={Item} />
          <Route
            exact
            path='/items/:section_id/food/:food_id'
            component={Food}
          />
          <Route exact path='/pdf/photos' component={Pdf} />
        </Switch>
      </div>
    </Fragment>
  );
};

AppWrapper.propTypes = {
  dba: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dba: state.menus.dba,
});

export default connect(mapStateToProps, null)(AppWrapper);
