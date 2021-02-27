import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'reactstrap';

const MenuBubble = ({ text }) => {
  return (
    <Fragment>
      <Card
        color='info'
        style={{
          borderRadius: '30px',
          width: 367,
          height: '43px',
          alignSelf: 'center',
          textAlign: 'center',
        }}
        placeholder='(Appetisers, entree, drinks, etc)'
        type='text'
        name='section'
        //onChange={onChange}
      >
        <p
          style={{
            fontFamily: 'Helvetica',
            color: 'white',
            fontSize: '100%',
            fontWeight: 'bold',
            marginTop: '8px',
            alignSelf: 'center',
          }}
        >
          {text}
        </p>
      </Card>
    </Fragment>
  );
};

MenuBubble.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(MenuBubble);
