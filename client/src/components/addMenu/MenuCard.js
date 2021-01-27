import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scroll from './Scroll';
// import CustomScroll from 'react-custom-scroll';
import { getUpdate, deleteMenu, editMenu } from '../../actions/post';
import { Link } from 'react-router-dom';
// import AddPhotoModal from './AddPhotoModal';
import { Button, Card, Row, Col, Modal } from 'reactstrap';
import gear from '../../assets/img/icons/common/settings.svg';
import {primaryColor} from "../../primaryColor";
const MenuCard = ({
  auth: { user },
  menu,
  getUpdate,
  deleteMenu,
  editMenu
}) => {
  const { active, _id, name } = menu;
  const [state, setState] = useState({
    exampleModal: false
  });

  const { exampleModal } = state;

  const toggleModal = (exampleModal) => {
    if (exampleModal) {
      setState({
        ...state,
        exampleModal: false
      });
    }
    if (!exampleModal) {
      setState({
        ...state,
        exampleModal: true
      });
    }
  };

  return (
    <Fragment>
      <div style={{ marginLeft: '140px', marginBottom: '50px' }}>
        <Card
          style={{
            width: '280px',
            height: '333px',
            borderRadius: '60px',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            display: 'flex'
          }}
        >
          <Scroll menu={menu} />
          <Row
            style={{
              alignSelf: 'center',
              backgroundColor: '#F4F5F7',
              width: 'inherit',
              justifyContent: 'center',
              height: 'inherit',
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px'
            }}
          >
            <p
              style={{
                fontFamily: 'helvetica',
                color: primaryColor,
                textTransform: 'capitalize',
                fontSize: '27px',
                fontWeight: 'bold',
                paddingTop: '37px'
              }}
            >
              {menu.restaurant}
            </p>
          </Row>
        </Card>
        <Row style={{ justifyContent: 'center', marginTop: '15px' }}>
          <label className="custom-toggle" style={{ marginRight: '10px' }}>
            <input
              checked={active}
              type="checkbox"
              onClick={() => getUpdate(_id)}
            />
            <span
              className="custom-toggle-slider rounded-circle"
              style={{ width: '60px' }}
            />
            {active ? (
              <p
                style={{
                  fontFamily: 'helvetica',
                  color: '#5E71E4',
                  fontWeight: '400',
                  marginLeft: '10px'
                }}
              >
                On
              </p>
            ) : (
              <p
                style={{
                  fontFamily: 'helvetica',
                  color: '#F4F5F7',
                  fontWeight: '400',
                  marginLeft: '25px'
                }}
              >
                Off
              </p>
            )}
          </label>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <Button
            style={{
              WebkitBoxShadow: 'none',
              fontFamily: 'helvetica',
              background: 'transparent',
              borderColor: 'transparent',
              marginTop: '-5px'
            }}
            onClick={() => toggleModal(exampleModal)}
          >
            <img
              alt="..."
              src={gear}
              style={{ width: '37px', height: '37px' }}
            />
          </Button>
        </Row>
      </div>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => toggleModal(exampleModal)}
      >
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Link to="/step-one" style={{ alignSelf: 'center' }}>
            <Button
              style={{
                borderRadius: '60px',
                height: '60px',
                width: '150px',
                backgroundColor: primaryColor,
                borderColor: primaryColor,
                marginRight: '0px',
                marginBottom: '15px',
                alignSelf: 'center'
              }}
              onClick={() => editMenu(_id)}
            >
              <p
                style={{
                  color: 'white',
                  fontFamily: 'helvetica',
                  textTransform: 'capitalize',
                  fontWeight: '400',
                  paddingTop: '6px'
                }}
              >
                Edit Menu
              </p>
            </Button>
          </Link>

          <Button //Delete menu button
            style={{
              borderRadius: '60px',
              height: '60px',
              width: '150px',
              backgroundColor: '#FF6A6A',
              borderColor: '#FF6A6A',
              alignSelf: 'center',
              marginRight: '0px',
              marginBottom: '15px'
            }}
            color="danger"
            onClick={() => {
              deleteMenu(_id);
            }}
          >
            <p
              style={{
                color: 'white',
                fontFamily: 'helvetica',
                textTransform: 'capitalize',
                fontWeight: '400',
                paddingTop: '6px'
              }}
            >
              Delete Menu
            </p>
          </Button>
        </Col>
      </Modal>
    </Fragment>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getUpdate: PropTypes.func.isRequired,
  deleteMenu: PropTypes.func.isRequired,
  editMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUpdate,
  deleteMenu,
  editMenu
})(MenuCard);
