import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'reactstrap';
import { primaryColor } from '../../primaryColor';
import { setActiveSection } from '../../actions/menus';

const MenuBubble = ({ text, section_id, setActiveSection }) => {
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
        }}
        onClick={() => setActiveSection(section_id)}
        color='primary'
        placeholder='(Appetisers, entree, drinks, etc)'
        type='button'
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

MenuBubble.propTypes = {
  text: PropTypes.string.isRequired,
  section_id: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setActiveSection })(MenuBubble);
