import React from 'react';
import {
  Route,
  Switch
  // NavLink as NavLinkRRD
} from 'react-router-dom';

import Settings from '../dashboard/Settings';
import Feedback from '../dashboard/Feedback';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import PropTypes from 'prop-types';
import Home from '../addMenu/Home';
import Step2 from '../auth/Step2';
import StepOne from '../newMenu/StepOne';
import StepTwo from '../newMenu/StepTwo';

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/step_2" component={Step2} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/feedback" component={Feedback} />
      <PrivateRoute exact path="/step-one" component={StepOne} />
      <PrivateRoute exact path="/step-two" component={StepTwo} />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.defaultProps = {
  routes: [{}]
};

Routes.propTypes = {
  // links that will be displayed inside the component

  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Routes;

// <PrivateRoute exact path="/new-menu" component={NewMenu} />
