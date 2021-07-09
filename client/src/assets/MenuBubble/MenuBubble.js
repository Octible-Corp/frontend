import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'reactstrap';
import { primaryColor } from '../../primaryColor';
import { setActiveSection } from '../../actions/menus';

const MenuBubble = ({ text, section_id, setActiveSection, dba }) => {
  return (
    <Fragment>
      <Button
        style={{
          borderRadius: '30px',
          width: '270px',
          height: '45px',
          alignSelf: 'center',
          textAlign: 'center',
          marginBottom: 15,
          backgroundColor: dba.section_button_color,
          borderColor: dba.section_button_color,
          left: 4,
          position: 'relative'
        }}
        onClick={() => setActiveSection(section_id)}
        placeholder='Food Section'
        type='button'
      >
        <p
          style={{
            fontFamily: 'Helvetica',
            color: dba.section_button_text_color,
            position: 'relative',
            justifyContent: 'center',
            bottom: '7px',
            fontSize: '80%',
            fontWeight: 'bold',
            alignSelf: 'center',
            textTransform: 'none'
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
  dba: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dba: state.menus.dba,
});

export default connect(mapStateToProps, { setActiveSection })(MenuBubble);
