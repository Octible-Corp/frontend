import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { deletePhoto } from '../../actions/post';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
const Hieroglyph = ({ src, menuId }) => {
  return (
    <Fragment>
      <Image
        draggable="true"
        style={{
          width: '100%',
          maxHeight: 'auto'
        }}
        alt="Menu"
        src={`https://octible.s3.us-east-2.amazonaws.com/${menuId}/${src}`}
        onDragStart={(e) => e.preventDefault()}
      />
    </Fragment>
  );
};
Hieroglyph.propTypes = {
  src: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  deletePhoto: PropTypes.func.isRequired
};
export default connect(null, { deletePhoto })(Hieroglyph);
