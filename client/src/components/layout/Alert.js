import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Col } from 'reactstrap';

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Col
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Alert
        style={{
          width: '500px',
          marginTop: '20px',
          background: '#F4F5F7',
          borderRadius: '60px'
        }}
        key={alert.id}
        color={`seccondary`}
      >
        <p style={{ color: '#525F7F', textAlign: 'center', height: '12px' }}>
          {alert.msg}
        </p>
      </Alert>
    </Col>
  ));

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
