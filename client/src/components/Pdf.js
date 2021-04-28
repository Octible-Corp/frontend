import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import back2 from '../assets/img/LeftArrow/LA2.png';
import { primaryColor } from '../primaryColor';

const pre_url = 'https://octible.s3.us-east-2.amazonaws.com/';

const Pdf = ({ photos }) => {
  const history = useHistory();
  return (
    <body>
      <div
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: 70,
          background: 'white',
          textAlign: 'left',
          marginLeft: 20,
          zIndex: 5,
        }}
      >
        <Button
          onClick={() => history.goBack()}
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            shadowColor: '#636c73',
            shadowRadius: 0,
            shadowOpacity: 0.0,
            boxShadow: `0px 0px 0px #DCDCDC`,
            marginBottom: 10,
            marginTop: 0,
            width: 300,
          }}
        >
          <Row>
            <img
              src={back2}
              style={{
                marginLeft: 1,
                marginTop: 20,
                alignText: 'left',
                alignSelf: 'left',
                width: 20,
                height: 35,
              }}
            />

            <h1
              style={{
                position: 'fixed',
                left: 50,
                top: 22,
                textTransform: 'capitalize',
                fontFamily: 'helvetica',
                color: primaryColor,
              }}
            >
              Go Back
            </h1>
          </Row>
        </Button>
      </div>
      <div
        style={{
          marginTop: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col>
          {photos.map((photo) => (
            <img
              style={{ width: '100%', height: 'auto', marginLeft: 5 }}
              src={`${pre_url}${photo}`}
            />
          ))}
        </Col>
      </div>
      <div
        color='info'
        //type='div'
        style={{
          position: 'fixed',
          padding: 20,
          bottom: -75,
          width: '100%',
          borderRadius: 25,
          height: 150,
          background: '#4C9AFF',
          textAlign: 'center',
          zIndex: 5,
        }}
      >
        <p1
          style={{
            color: 'white',
          }}
        >
          Powered by Octible
        </p1>
      </div>
    </body>
  );
};

Pdf.propTypes = {
  photos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  photos: state.menus.menu.pdf,
});

export default connect(mapStateToProps, null)(Pdf);
