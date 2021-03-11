import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'reactstrap';
import { primaryColor } from '../../primaryColor';

const MenuBubble = ({ text }) => {
  return (
    <Fragment>
      <Button
        style={{
          borderRadius: '30px',
          width: 300,
          height: '43px',
          alignSelf: 'center',
          textAlign: 'center',
          marginBottom: 10,
          left: 4,
          backgroundColor: primaryColor,
        }}
        placeholder='(Appetisers, entree, drinks, etc)'
        type='text'
        name='section'
      >
        <p
          style={{
            fontFamily: 'Helvetica',
            color: 'white',
            fontSize: '100%',
            fontWeight: 'bold',
            // marginTop: '8px',
            alignSelf: 'center',
          }}
        >
          {text}
        </p>
      </Button>
    </Fragment>
  );
};

MenuBubble.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(MenuBubble);
