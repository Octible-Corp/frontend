import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { primaryColor } from '../../primaryColor';
import { Button } from 'reactstrap';

const MiniBubble = ({ text }) => {
  return (
    <Fragment>
      <Button color='info' type='button' style={{ borderRadius: '30px' }}>
        {text}
      </Button>
    </Fragment>
  );
};

MiniBubble.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(MiniBubble);
