import React, { Fragment, useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getNewMenu } from '../../actions/post';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import { primaryColor } from '../../primaryColor';
const Upload = ({ user_id, toggle, bringUrl, uploadType, numAccepted }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [itemPhotos, setItemPhotos] = useState([]);

  const getUploadParams = async () => {
    let reqFileType = '';
    if (uploadType === 'image/*') {
      reqFileType = '.jpg';
    } else {
      reqFileType = '.pdf';
    }
    let body = {
      user_id: user_id,
      uploadType: reqFileType
    };
    const res = await api.post(`/posts/s3`, body);
    const { fields, url } = res.data;
    setPhotoUrl(`${fields.Key}`);
    if (numAccepted === 3) {
      itemPhotos.push(`${fields.Key}`);
      setItemPhotos(itemPhotos);
    }
    return {
      fields,
      url: url
    };
  };

  const handleChangeStatus = ({ meta }, status) => {};

  const handleSubmit = (files, allFiles) => {
    console.log('Files');
    console.log(files);
    console.log(allFiles);
    allFiles.forEach((f) => f.remove());
    setAlert('Upload complete!', 'success');
    const id = 'New';
    if (numAccepted === 3) {
      bringUrl(itemPhotos);
    } else {
      bringUrl(photoUrl);
      toggle();
    }
  };

  return (
    <Fragment>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept={uploadType}
        dropzoneReject
        maxFiles={numAccepted}
        inputContent={(files, extra) =>
          extra.reject
            ? 'JPG Image Files Only'
            : extra.active
            ? "Drop it like it's hot!"
            : uploadType === 'image/*'
            ? 'Choose a JPG file or drop it here'
            : 'Choose a PDF file or drop it here'
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
  toggle: PropTypes.func,
  user_id: PropTypes.string.isRequired,
  bringUrl: PropTypes.func.isRequired,
  uploadType: PropTypes.string.isRequired,
  numAccepted: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user._id
});

export default connect(mapStateToProps, { setAlert, getNewMenu })(Upload);
