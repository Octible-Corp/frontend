import React, { Fragment, useEffect, useState } from 'react';
import {
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  Row,
  Col,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import Upload from './Upload';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import pdfLogo from '../../assets/img/icons/common/pdfLogo.png';
import { saveStepOne, addCourse, saveItem, editMenu } from '../../actions/post';
import Section from './Section';
import { primaryColor } from '../../primaryColor';
import gear from '../../assets/img/icons/common/settings.svg';
import { finished } from 'nodemailer/lib/xoauth2';
//import { newMenu } from '../../actions/posts';

const url = 'https://octible.s3.us-east-2.amazonaws.com/';

const StepOne = ({
  user,
  saveStepOne,
  saving,
  menus,
  addCourse,
  saveItem,
  editMenuId
}) => {
  //New MenuV2 plain object
  const [formData, setFormData] = useState({
    _id: Math.random().toString(36).substring(2, 9),
    user_id: user._id,
    name: '',
    website: '',
    logo_photo: '',
    background_photo: '',
    pdf: '',
    sections: [],
    items: []
  });
  const {
    user_id,
    name,
    website,
    logo_photo,
    background_photo,
    pdf,
    sections,
    items
  } = formData;

  const [newSaves, setNewSaves] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (
      name ||
      website ||
      logo_photo ||
      background_photo ||
      pdf ||
      sections.length > 0 ||
      items.length > 0
    ) {
      console.log('Yu Yu Save ');
      //saveStepOne(formData)
    }
  }, [formData]);

  //If editing, set existing menu
  /*
  useEffect(() => {
    //if (editMenuId !== 'New') {
    if (false) {
      menus.map((menu) => {
        if (menu._id === editMenuId) {
          console.log('MENU_SET');
          setFormData(menu);
        }
      });
    }
  }, [editMenuId, menus]);
  */

  //Upload Modal Stuff
  const [upload, setUploadModal] = useState({
    uploadModal: false,
    type: '',
    field: ''
  });
  const { uploadModal, type, field } = upload;
  const toggleUploadModal = (uploadModalStatus, typeStr, field) => {
    if (uploadModalStatus) {
      setUploadModal({
        uploadModal: false,
        type: '',
        field: field
      });
    } else {
      setUploadModal({
        uploadModal: true,
        type: typeStr,
        field: field
      });
    }
  };
  const setUrl = (url, type) => {
    if (type === 'image/*') {
      if (field === 'logo_photo') {
        setFormData({
          ...formData,
          logo_photo: url
        });
      } else {
        setFormData({
          ...formData,
          background_photo: url
        });
      }
    } else if (type === '.pdf') {
      setFormData({
        ...formData,
        pdf: url
      });
    }
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: primaryColor,
          paddingBottom: '300px',
          width: '100vw'
        }}
      >
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <p
            style={{
              fontFamily: 'Helvetica',
              color: 'white',
              fontSize: '140%',
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: '120px'
            }}
          >
            Digitial Menu Profile
          </p>

          {background_photo ? (
            <Image
              onClick={() =>
                toggleUploadModal(uploadModal, 'image/*', 'background_photo')
              }
              style={{
                height: '197px',
                width: '367px',
                borderRadius: '45px',
                alignSelf: 'center'
              }}
              src={url + background_photo}
            />
          ) : (
            <Button
              data-aos="fade-right"
              type="button"
              className="btn-seccondary "
              onClick={() =>
                toggleUploadModal(uploadModal, 'image/*', 'background_photo')
              }
              style={{
                height: '197px',
                width: '367px',
                borderRadius: '45px',
                alignSelf: 'center'
              }}
            >
              <p
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  fontSize: '120%',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#adb5bd',
                  marginTop: '20px',
                  textTransform: 'capitalize'
                }}
              >
                Upload Background Image
              </p>
            </Button>
          )}
          {logo_photo ? (
            <Image
              onClick={() =>
                toggleUploadModal(uploadModal, 'image/*', 'logo_photo')
              }
              style={{
                height: '122px',
                width: '122px',
                borderRadius: '60px',
                marginTop: '-60px',
                alignSelf: 'center',
                border: '2.5px solid white'
              }}
              src={url + logo_photo}
            />
          ) : (
            <Button
              data-aos="fade-left"
              className="btn-seccondary shadowCircle border-0"
              onClick={() =>
                toggleUploadModal(uploadModal, 'image/*', 'logo_photo')
              }
              style={{
                height: '120px',
                width: '120px',
                borderRadius: '60px',
                marginTop: '-60px',
                alignSelf: 'center'
              }}
            >
              <p
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  fontSize: '120%',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#adb5bd',
                  marginTop: '20px',
                  lineHeight: '22px',
                  textTransform: 'capitalize'
                }}
              >
                Upload Logo
              </p>
            </Button>
          )}

          <Input
            style={{
              borderRadius: '30px',
              marginTop: '40px',
              width: '367px',
              alignSelf: 'center',
              marginRight: '7px',
              textAlign: 'center',
              height: '50px'
            }}
            placeholder="Restaurant Name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            data-aos="fade-top"
          />
          <Row style={{ alignSelf: 'center' }}>
            <Button
              data-aos="fade-left"
              type="button"
              className="btn btn-secondary"
              style={{
                width: '160px',
                height: '50px',
                marginTop: '30px',
                borderRadius: '30px',
                marginRight: '17px'
              }}
            >
              <p
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  fontSize: '120%',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#adb5bd',
                  marginTop: '5px',
                  lineHeight: '22px',
                  textTransform: 'capitalize',
                  color: `${primaryColor}`
                }}
              >
                Add Website
              </p>
            </Button>
            <Button
              data-aos="fade-right"
              type="button"
              className="btn btn-secondary"
              style={{
                width: '160px',
                height: '50px',
                marginTop: '30px',
                borderRadius: '30px',
                marginLeft: '17px'
              }}
            >
              <p
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  fontSize: '120%',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#adb5bd',
                  marginTop: '5px',
                  lineHeight: '22px',
                  textTransform: 'capitalize',
                  color: `${primaryColor}`
                }}
              >
                Upload PDF
              </p>
            </Button>
          </Row>
          <p
            style={{
              fontFamily: 'Helvetica',
              color: 'white',
              fontSize: '140%',
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: '40px'
            }}
          >
            Menu Category
          </p>

          <Row style={{ alignSelf: 'center', marginLeft: '55px' }}>
            <Input
              style={{
                borderRadius: '30px',
                width: 367,
                alignSelf: 'center',
                textAlign: 'center'
              }}
              placeholder="(Appetisers, entree, drinks, etc)"
              type="text"
              name="name"
              onChange={onChange}
              data-aos="fade-top"
            />
            <Button
              style={{
                WebkitBoxShadow: 'none',
                fontFamily: 'helvetica',
                background: 'transparent',
                borderColor: 'transparent'
              }}
            >
              <img
                alt="..."
                src={gear}
                style={{ width: '37px', height: '37px' }}
              />
            </Button>
          </Row>
          <Button
            data-aos="fade-up"
            type="button"
            className="btn btn-secondary"
            style={{
              width: '60px',
              height: '60px',
              marginTop: '30px',
              borderRadius: '30px',
              alignSelf: 'center'
            }}
          >
            <p
              style={{
                fontFamily: 'Helvetica',
                color: 'white',
                fontSize: '50px',
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#adb5bd',
                marginTop: '-24px',
                marginLeft: '-6px',
                textTransform: 'capitalize',
                color: `${primaryColor}`
              }}
            >
              +
            </p>
            <p
              style={{
                fontFamily: 'Helvetica',
                color: 'white',
                fontSize: '15px',
                fontWeight: 'bold',
                width: '150px',
                marginLeft: '-60px',
                marginTop: '-10px',
                textTransform: 'capitalize'
              }}
            >
              Add Category...
            </p>
          </Button>
          <Modal
            className="modal-dialog-centered"
            isOpen={uploadModal}
            toggle={() => toggleUploadModal(uploadModal)}
          >
            <Card
              style={{
                width: '355px',
                height: '355px',
                borderRadius: '60px',
                alignSelf: 'center'
              }}
            >
              <Upload
                style={{ width: '282' }}
                toggle={() => toggleUploadModal(uploadModal)}
                bringUrl={(urlStr) => {
                  setUrl(urlStr, type);
                }}
                uploadType={type}
                numAccepted={1}
              />
            </Card>
          </Modal>
        </Col>
      </div>
    </Fragment>
  );
};

StepOne.propTypes = {
  user: PropTypes.object.isRequired,
  saveStepOne: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired
  //editMenuId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  saving: state.post.saving,
  menus: state.post.menus
  //editMenuId: state.post.editMenuId
});

export default connect(mapStateToProps, { saveStepOne, addCourse, saveItem })(
  StepOne
);
