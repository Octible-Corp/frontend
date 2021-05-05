import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './Footer';

const pre_url = 'https://octible.s3.us-east-2.amazonaws.com/';

const Pdf = ({ photos, dba }) => {
  const history = useHistory();
  return (
    <Fragment>
      <div style={{ backgroundColor: dba.background_color, height: '100vh' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: dba.background_color,
          }}
        >
          <Col>
            {photos.map((photo) => (
              <img
                style={{ width: '100%', height: 'auto', marginTop: 20 }}
                src={`${pre_url}${photo}`}
              />
            ))}
            <div
              style={{ height: 100, backgroundColor: dba.background_color }}
            />
          </Col>
        </div>
        <Footer destination={'home'} />
      </div>
    </Fragment>
  );
};

Pdf.propTypes = {
  photos: PropTypes.array.isRequired,
  dba: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photos: state.menus.menu.pdf,
  dba: state.menus.dba,
});

export default connect(mapStateToProps, null)(Pdf);
