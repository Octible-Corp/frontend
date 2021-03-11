import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { primaryColor } from '../../primaryColor';
const TestScreen = ({}) => {
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: primaryColor,
          paddingBottom: '400px',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <Row style={{ justifyContent: 'center', marginTop: '80px' }}>
          <p
            style={{
              fontFamily: 'helvetica',
              color: '#F4F5F7',
              textTransform: 'capitalize',
              fontSize: '50px',
              fontWeight: '400',
            }}
          >
            TESTING
          </p>
        </Row>
      </div>
    </Fragment>
  );
};

TestScreen.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(TestScreen);
