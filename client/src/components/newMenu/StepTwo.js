import React, { Fragment, useEffect, useState } from 'react';
import {
  FormGroup,
  Input,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';
import Upload from './Upload';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import pdfLogo from '../../assets/img/icons/common/pdfLogo.png';
import { addCourse, saveItem, saveStepTwo } from '../../actions/post';
import Section from './Section';

const StepTwo = ({
  user,
  saveStep,
  saving,
  menus,
  addCourse,
  editMenuId,
  saveStepTwo
}) => {
  const [formData, setFormData] = useState({
    user: user._id,
    _id: '',
    restaurant: '',
    website: '',
    main_photo: '',
    pdf: '',
    sections: [],
    items: [],
    editMode: false
  });
  const { restaurant, website, main_photo, pdf, sections, _id } = formData;
  useEffect(() => {
    if (editMenuId !== 'New') {
      menus.map((menu) => {
        if (menu._id === editMenuId) {
          console.log('MENU_SET');
          setFormData(menu);
        }
      });
    }
  }, [editMenuId, menus]);

  const [course, stageCourse] = useState('');
  const onChangeCourse = (e) => stageCourse(`${e.target.value}`);

  const setCourse = (course) => {
    addCourse(
      {
        id: `item-${course}`,
        content: `item ${course}`
      },
      _id
    );
    stageCourse('');
    setFormData({
      ...formData,
      sections: [
        {
          id: `${course}`,
          content: `${course}`
        },
        ...formData.sections
      ]
    });
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: '#4C9AFF',
          paddingBottom: '300px',
          width: '100vw',
          height: 'overflow',
          overflow: 'hidden'
        }}
      >
        <Row style={{ justifyContent: 'center', marginTop: '80px' }}>
          <p
            style={{
              fontFamily: 'helvetica',
              color: '#F4F5F7',
              textTransform: 'capitalize',
              fontSize: '50px',
              fontWeight: '400'
            }}
          >
            Build your menu
          </p>
        </Row>
        <Row>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <FormGroup
              style={{
                width: '300px',
                alignSelf: 'center',
                marginLeft: '140px'
              }}
            >
              <Pagination
                className="pagination pagination-lg"
                listClassName="pagination-lg"
              >
                <PaginationItem className={'disabled'}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tabIndex="-1"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={'active'}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={'disabled'}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </FormGroup>

            <FormGroup style={{ width: '300px', alignSelf: 'center' }}>
              <Input
                type="text"
                placeholder="Course Title"
                name="course"
                value={course}
                onChange={onChangeCourse}
              />
            </FormGroup>
            <Button
              color="secondary"
              type="button"
              onClick={() => setCourse(course)}
              style={{
                width: '250px',
                alignSelf: 'center',
                marginRight: '10px',
                textTransform: 'capitalize'
              }}
            >
              Add Course
            </Button>
            <FormGroup style={{ alignSelf: 'center', marginTop: '20px' }}>
              <Section courses={sections} />
            </FormGroup>

            <Row style={{ alignSelf: 'center' }}>
              <Link to="/step-one">
                <Button
                  color="primary"
                  type="button"
                  onClick={() => saveStepTwo(formData)}
                  style={{
                    width: '100px',
                    alignSelf: 'center',
                    marginTop: '20px',
                    marginRight: '10px',
                    textTransform: 'capitalize'
                  }}
                >
                  Back
                </Button>
              </Link>
              <Button
                color="primary"
                type="button"
                onClick={() => saveStepTwo(formData)}
                style={{
                  width: '100px',
                  alignSelf: 'center',
                  marginTop: '20px',
                  marginRight: '10px',
                  textTransform: 'capitalize'
                }}
              >
                {'Continue'}
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

StepTwo.propTypes = {
  user: PropTypes.object.isRequired,
  saveStep: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired,
  editMenuId: PropTypes.string.isRequired,
  saveStepTwo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  saving: state.post.saving,
  menus: state.post.menus,
  editMenuId: state.post.editMenuId
});

export default connect(mapStateToProps, { addCourse, saveItem, saveStepTwo })(
  StepTwo
);
