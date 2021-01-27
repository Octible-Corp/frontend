import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getNewMenu } from '../../actions/post';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import {primaryColor} from "../../primaryColor";
const Upload = ({ setAlert, user_ID, getPhotos, getNewMenu, name, toggle }) => {
  const getUploadParams = async ({ meta }) => {
    console.log('Params');
    if (meta.name.includes('.pdf')) {
      const typeOf = '.pdf';
      const body = { menuId: 'New', type: typeOf };
      console.log('Here');
      const res = await api.post(`/posts/upload`, body);
      const { fields, url } = res.data;
      return {
        fields,
        url: url
      };
    } else {
      const typeOf = '.png';
      const body = { menuId: 'New', type: typeOf };
      const res = await api.post(`/posts/upload`, body);
      const { fields, url } = res.data;
      return {
        fields,
        url: url
      };
    }
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log('______CHANTE STATUS_______');
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    toggle();
    console.log('____Entering for loop____');
    allFiles.forEach((file) => console.log(file));
    allFiles.forEach((f) => f.remove());
    setAlert('Upload complete!', 'success');
    const id = 'New';
    getNewMenu(id);
  };

  return (
    <Fragment>
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
            marginTop: '47px',
            width: '280',
            height: '250px'
          },

          inputLabel: (files, extra) =>
            extra.reject
              ? {
                  color: '#FF6A6A',
                  fontFamily: 'helvetica',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '25px',
                  padding: '20px'
                }
              : {
                  color: primaryColor,
                  fontFamily: 'helvetica',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '25px',
                  padding: '20px'
                }
        }}
      />
    </Fragment>
  );
};

Upload.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getNewMenu: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_ID: state.auth.user
});

export default connect(mapStateToProps, { setAlert, getNewMenu })(Upload);
