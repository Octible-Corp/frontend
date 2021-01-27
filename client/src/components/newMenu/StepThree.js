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
import { saveStep, addCourse, saveItem } from '../../actions/post';
import Section from './Section';

//import { newMenu } from '../../actions/posts';

const NewMenu = ({ user, saveStep, saving, menus, addCourse, saveItem }) => {
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
    menus.map((menu) => {
      if (menu.editMode) {
        setFormData(menu);
      }
    });
  }, []);

  const [upload, setUploadLogo] = useState({
    uploadLogo: false,
    type: ''
  });

  const { uploadModal, type } = upload;

  const setUrl = (url, type) => {
    type === 'image/*'
      ? setFormData({
          ...formData,
          main_photo: url
        })
      : setFormData({
          ...formData,
          pdf: url
        });
  };

  const [state, setState] = useState({
    itemModal: false
  });
  const { itemModal } = state;

  const [course, stageCourse] = useState('');
  const onChangeCourse = (e) => stageCourse(e.target.value);

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
          id: `item-${course}`,
          content: `item ${course}`
        },
        ...formData.sections
      ]
    });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [activeCourse, setActiveCourse] = useState('');

  const toggleUploadModal = (uploadModal, typeStr) => {
    if (uploadModal) {
      setUploadLogo({
        ...state,
        uploadModal: false,
        type: ''
      });
    }
    if (!uploadModal) {
      setUploadLogo({
        ...state,
        uploadModal: true,
        type: typeStr
      });
    }
  };

  const toggleItemModal = (itemModal) => {
    if (itemModal) {
      setState({
        ...state,
        itemModal: false
      });
    }
    if (!itemModal) {
      setState({
        ...state,
        itemModal: true
      });
    }
  };

  const [tempItem, setTempItem] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    section: '',
    item_photos: []
  });

  const onChangeItem = (e) =>
    setTempItem({ ...tempItem, [e.target.name]: e.target.value });

  const [step, setStep] = useState(1);
  const nextPlease = (step, direction) => {
    if (direction === 'next') {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setActiveCourse(sections[0].content);
        setStep(3);
      } else if (step === 3) {
        setStep(1);
      } else {
        setStep(step);
      }
    } else {
      if (direction === 'back') {
        if (step === 1) {
          setStep(step);
        } else if (step === 2) {
          setStep(1);
        } else if (step === 3) {
          setStep(2);
        } else {
          setStep(step);
        }
      }
    }
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
                <PaginationItem className={step === 1 ? 'active' : 'disabled'}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tabIndex="-1"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={step === 2 ? 'active' : 'disabled'}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={step === 3 ? 'active' : 'disabled'}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </FormGroup>
            {step === 1 ? (
              <>
                <FormGroup style={{ width: '300px', alignSelf: 'center' }}>
                  <Input
                    type="text"
                    placeholder="Your restaurant name"
                    name="restaurant"
                    value={restaurant}
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup style={{ width: '300px', alignSelf: 'center' }}>
                  <Input
                    type="text"
                    placeholder="A link to your website"
                    name="website"
                    value={website}
                    onChange={onChange}
                  />
                </FormGroup>
                {!main_photo ? (
                  <Button
                    color="secondary"
                    type="button"
                    onClick={() => toggleUploadModal(uploadModal, 'image/*')}
                    style={{
                      width: '250px',
                      alignSelf: 'center',
                      textTransform: 'capitalize'
                    }}
                  >
                    Your logo
                  </Button>
                ) : (
                  <Image
                    draggable="true"
                    style={{
                      width: '50px',
                      height: '50px',
                      alignSelf: 'center'
                    }}
                    alt="Menu"
                    src={`https://octible.s3.us-east-2.amazonaws.com/${main_photo}`}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        main_photo: ''
                      })
                    }
                  />
                )}
                {!pdf ? (
                  <Button
                    color="secondary"
                    type="button"
                    onClick={() => toggleUploadModal(uploadModal, '.pdf')}
                    style={{
                      width: '250px',
                      alignSelf: 'center',
                      marginTop: '20px',
                      marginRight: '10px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Your PDF menu
                  </Button>
                ) : (
                  <Image
                    draggable="true"
                    style={{
                      width: '50px',
                      height: '50px',
                      alignSelf: 'center',
                      marginTop: '20px'
                    }}
                    alt="Menu"
                    src={pdfLogo}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        pdf: ''
                      })
                    }
                  />
                )}
              </>
            ) : step === 2 ? (
              <>
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
              </>
            ) : step === 3 ? (
              <>
                <FormGroup
                  style={{
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <UncontrolledDropdown
                    style={{
                      zIndex: '1',
                      alignSelf: 'center'
                    }}
                  >
                    <DropdownToggle caret color="secondary">
                      {activeCourse}
                    </DropdownToggle>
                    <DropdownMenu>
                      {sections.map((section, index) => (
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveCourse(section.content);
                          }}
                          key={index}
                        >
                          {section.content}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <Button
                    color="secondary"
                    type="button"
                    onClick={() => toggleItemModal(itemModal)}
                    style={{
                      width: '250px',
                      alignSelf: 'center',
                      marginTop: '20px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Add menu item
                  </Button>
                  {formData.items.length > 0 ? (
                    <FormGroup
                      style={{ alignSelf: 'center', marginTop: '20px' }}
                    >
                      <Section filter={activeCourse} courses={formData.items} />
                    </FormGroup>
                  ) : (
                    <></>
                  )}
                </FormGroup>
              </>
            ) : (
              <></>
            )}
            <Row style={{ alignSelf: 'center' }}>
              <Button
                color="primary"
                type="button"
                className={step === 1 ? 'disabled' : null}
                onClick={() => {
                  saveStep(formData);
                  console.log('Saving this');
                  console.log(formData);
                  nextPlease(step, 'back');
                }}
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
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  saveStep(formData);
                  nextPlease(step, 'next');
                }}
                style={{
                  width: '100px',
                  alignSelf: 'center',
                  marginTop: '20px',
                  marginRight: '10px',
                  textTransform: 'capitalize'
                }}
              >
                {step === 3 ? 'Finsish' : 'Continue'}
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
      <Modal
        className="modal-dialog-centered"
        isOpen={uploadModal}
        toggle={() => toggleUploadModal(uploadModal)}
      >
        <Row style={{ marginLeft: '30px', marginRight: '30px' }}>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Card
              style={{
                width: '282px',
                height: '355px',
                borderRadius: '60px'
              }}
            >
              <Upload
                toggle={() => toggleUploadModal(uploadModal)}
                bringUrl={(urlStr) => {
                  setUrl(urlStr, type);
                }}
                uploadType={type}
                numAccepted={1}
              />
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        className="modal-dialog-centered"
        isOpen={itemModal}
        toggle={() => toggleItemModal(itemModal)}
      >
        <Row style={{ marginLeft: '30px', marginRight: '30px' }}>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Card
              style={{
                width: '450px',
                height: '660px',
                borderRadius: '60px',
                backgroundColor: '#4C9AFF'
              }}
            >
              <p
                style={{
                  textTransform: 'capitalize',
                  fontFamily: 'helvetica',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#F4F5F7',
                  alignSelf: 'center',
                  marginTop: '10px'
                }}
              >
                {`Add item to ${activeCourse}`}
              </p>
              <FormGroup
                style={{
                  width: '300px',
                  alignSelf: 'center'
                }}
              >
                <Input
                  type="text"
                  placeholder="Item name"
                  name="title"
                  value={tempItem.title}
                  onChange={onChangeItem}
                />
              </FormGroup>
              <FormGroup
                style={{
                  width: '300px',
                  alignSelf: 'center'
                }}
              >
                <Form>
                  <Input
                    id="exampleFormControlTextarea1"
                    placeholder="Item description"
                    rows="3"
                    type="textarea"
                    style={{ maxHeight: '100px' }}
                    name="description"
                    value={tempItem.description}
                    onChange={onChangeItem}
                  />
                </Form>
              </FormGroup>
              <FormGroup style={{ width: '300px', alignSelf: 'center' }}>
                <Input
                  type="text"
                  placeholder="Price $"
                  name="price"
                  value={tempItem.price}
                  onChange={onChangeItem}
                />
              </FormGroup>
              <FormGroup style={{ width: '310px', alignSelf: 'center' }}>
                <p
                  style={{
                    textTransform: 'capitalize',
                    fontFamily: 'helvetica',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#F4F5F7',
                    textAlign: 'center'
                  }}
                >
                  Add Photos
                </p>
                {tempItem.item_photos.length > 0 ? (
                  <>
                    {tempItem.item_photos.map((pic) => (
                      <Image
                        draggable="true"
                        style={{
                          width: '50px',
                          height: '50px',
                          alignSelf: 'center'
                        }}
                        alt="Menu"
                        src={
                          `https://octible.s3.us-east-2.amazonaws.com/` + pic
                        }
                        onDragStart={(e) => e.preventDefault()}
                        onClick={() => {}}
                      />
                    ))}
                  </>
                ) : (
                  <Upload
                    bringUrl={(urlStr) => {
                      setTempItem({
                        ...tempItem,
                        item_photos: urlStr
                      });
                    }}
                    uploadType={'image/*'}
                    numAccepted={3}
                  />
                )}

                <Button
                  color="primary"
                  type="button"
                  onClick={() => {
                    saveItem(tempItem, _id);

                    setFormData({
                      ...formData,
                      section: activeCourse,
                      items: [
                        {
                          ...tempItem,
                          id: Math.random().toString(36).substring(2, 9),
                          section: activeCourse
                        },
                        ...formData.items
                      ]
                    });
                    setTempItem({
                      title: '',
                      description: '',
                      price: '',
                      section: '',
                      item_photos: []
                    });
                    toggleItemModal(itemModal);
                  }}
                  style={{
                    width: '150px',
                    alignSelf: 'center',
                    marginTop: '30px',
                    marginLeft: '80px',
                    textTransform: 'capitalize'
                  }}
                >
                  {'Add Item'}
                </Button>
              </FormGroup>
            </Card>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
};

NewMenu.propTypes = {
  user: PropTypes.object.isRequired,
  saveStep: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  saving: state.post.saving,
  menus: state.post.menus
});

export default connect(mapStateToProps, { saveStep, addCourse, saveItem })(
  NewMenu
);
