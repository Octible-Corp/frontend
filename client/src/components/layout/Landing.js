import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({}) => {
  return (
    <Fragment>
      <h1>Landing</h1>
    </Fragment>
  );
};

Landing.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Landing);
