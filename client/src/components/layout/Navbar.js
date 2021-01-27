import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { loading } }) => {
  const guestLinks = (
    <ul class="navbar-nav ml-lg-auto">
      <li class="nav-item">
        <Link to="/" class="nav-link nav-link-icon">
          Welcome
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/register" class="nav-link nav-link-icon">
          Register
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/login" class="nav-link nav-link-icon">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <div style={{ position: 'relative' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-default">
        <h1 className="display-3" style={{ marginLeft: '5%' }}>
          <Link to="/" style={{ color: 'white' }}>
            Octible
          </Link>
        </h1>
        {!loading && <Fragment>{guestLinks}</Fragment>}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Navbar);
