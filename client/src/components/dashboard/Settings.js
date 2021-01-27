import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/auth';
// import { Button } from 'reactstrap';

const Settings = ({ deleteAccount, auth: { user } }) => {
  return (
    <Fragment>
      <div
        data-aos="fade-right"
        style={{
          height: 'auto',
          marginTop: '5%',
          marginLeft: '20%',
          marginBottom: '38%'
        }}
      >
        <h2 className="lead" style={{ color: 'white' }}>
          <i className="fas fa-user" style={{ color: 'white' }} /> Thank you for
          choosing Octible!
        </h2>
        {/*         
        <Fragment>
          <div className="my-2">
            <Button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete Account
            </Button>
          </div>
        </Fragment> */}
      </div>
    </Fragment>
  );
};

Settings.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteAccount
})(Settings);
