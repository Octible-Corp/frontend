import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { primaryColor } from '../../primaryColor';
import { Button } from 'reactstrap';

const MiniBubble = ({ text, link }) => {
  return (
    <Fragment>
      <Button type='button' color='primary' style={{ borderRadius: '30px' }}>
        <a href={`${link}`} style={{ color: 'white' }}>
          {text}
        </a>
      </Button>
    </Fragment>
  );
};

MiniBubble.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(MiniBubble);
