import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Upload from './Upload';
import { editMenu } from '../../actions/post';
import { Link } from 'react-router-dom';
import { primaryColor } from '../../primaryColor';
import { Button, Card, Row, Col, Modal } from 'reactstrap';

const AddMenuCard = ({ auth: { user }, editMenu }) => {
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
      <div
        style={{
          marginLeft: '120px',
          marginBottom: '90px',
          marginTop: '-10px'
        }}
      >
        <Link to="/step-one">
          <Button
            onClick={() => editMenu('New')}
            style={{
              WebkitBoxShadow: 'none',
              background: 'transparent',
              borderColor: 'transparent',
              height: 'inherit',
              borderRadius: '60px'
            }}
          >
            <Card
              style={{
                width: '280px',
                height: '333px',
                borderRadius: '60px',
                backgroundColor: 'transparent',
                borderColor: '#F4F5F7',
                borderWidth: '3px'
              }}
            >
              <p
                style={{
                  fontFamily: 'helvetica',
                  color: primaryColor,
                  textTransform: 'capitalize',
                  fontSize: '27px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '50px'
                }}
              >
                Add Menu
              </p>
              <p
                style={{
                  fontFamily: 'helvetica',
                  color: '#F4F5F7',
                  textTransform: 'capitalize',
                  fontSize: '35px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '-20px',
                  marginBottom: '48px'
                }}
              >
                +
              </p>
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
                    color: '#11cdef',
                    textTransform: 'capitalize',
                    fontSize: '27px',
                    fontWeight: 'bold',
                    paddingTop: '37px'
                  }}
                >
                  ...Menu Name
                </p>
              </Row>
            </Card>
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};
//<Upload name={name} />

AddMenuCard.propTypes = {
  auth: PropTypes.object.isRequired,
  editMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { editMenu })(AddMenuCard);
