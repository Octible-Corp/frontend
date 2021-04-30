import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import back2 from '../assets/img/LeftArrow/LA2.png';
import { primaryColor } from '../primaryColor';

const pre_url = 'https://octible.s3.us-east-2.amazonaws.com/';

const Pdf = ({ photos }) => {
  const history = useHistory();
  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col>
          {photos.map((photo) => (
            <img
              style={{ width: '100%', height: 'auto', marginTop: 20 }}
              src={`${pre_url}${photo}`}
            />
          ))}
          <div style={{ height: 100 }} />
        </Col>
      </div>
      <div
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          marginBottom: 0,
          position: 'fixed',
          backgroundColor: '#F8F8F8',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: 60,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            WebkitBoxShadow: 'none',
          }}
          onClick={() => history.goBack()}
        >
          <i
            style={{
              color: primaryColor,
              alignSelf: 'center',
            }}
            class='fa fa-home fa-3x'
            aria-hidden='true'
          />
        </Button>
      </div>
    </Fragment>
  );
};

Pdf.propTypes = {
  photos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  photos: state.menus.menu.pdf,
});

export default connect(mapStateToProps, null)(Pdf);
