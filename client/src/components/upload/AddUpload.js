import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { addPhotos } from '../../actions/post';
import { getNewMenu } from '../../actions/post';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import {primaryColor} from "../../primaryColor";
const AddUpload = ({
  setAlert,
  user_ID,
  getPhotos,
  addPhotos,
  menuId,
  getNewMenu
}) => {
  const getUploadParams = async () => {
    const body = { menuId: menuId };
    const res = await api.post(`/posts/upload`, body);
    const { fields, url } = res.data;
    return {
      fields,
      url: url
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    //console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
    setAlert('Upload complete!', 'success');
    getNewMenu(menuId);
    //addPhotos();
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,.pdf"
      inputContent={(files, extra) =>
        extra.reject
          ? 'Image or PDF files only'
          : extra.active
          ? "Drop it like it's hot!"
          : 'Choose a file or drop it here'
      }
      styles={{
        dropzone: {
          overflowX: 'auto',
          overflowY: 'auto',
          height: 300,
          width: 300,
          borderStyle: 'solid',
          borderColor: primaryColor,
          borderRadius: '50px',
          borderWidth: 2
        },
        dropzoneReject: {
          borderColor: primaryColor,
          backgroundColor: '#DAA',
          borderStyle: 'solid',
          borderRadius: '60px',
          transition: 'border .24s ease-in-out'
        },
        inputLabel: (files, extra) =>
          extra.reject
            ? { color: primaryColor, margin: '1rem', fontSize: '1rem' }
            : { color: primaryColor, margin: '1rem', fontSize: '1rem' }
      }}
    />
  );
};

AddUpload.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addPhotos: PropTypes.func.isRequired,
  menuId: PropTypes.string.isRequired,
  getNewMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_ID: state.auth.user
});

export default connect(mapStateToProps, { setAlert, addPhotos, getNewMenu })(
  AddUpload
);
