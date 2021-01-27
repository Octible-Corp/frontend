import React, { useState } from 'react';
import AddUpload from '../upload/AddUpload';
import PropTypes from 'prop-types';
// reactstrap components
import { Button, Modal, Card, CardBody } from 'reactstrap';
import {primaryColor} from "../../primaryColor";
const Modals = ({ menuId }) => {
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
    <>
      {/* Button trigger modal */}
      <Button
        style={{
          borderRadius: '60px',
          height: '60px',
          width: '150px',
          backgroundColor: primaryColor,
          borderColor: primaryColor,
          alignSelf: 'center',
          marginRight: '0px',
          marginBottom: '15px'
        }}
        onClick={() => toggleModal(exampleModal)}
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
          Add Photos
        </p>
      </Button>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => toggleModal(exampleModal)}
      >
        <Card
          className="bg-secondary shadow border-0"
          style={{
            borderRadius: '60px',
            width: '360px',
            height: '360px',
     
          }}
        >
          <CardBody
            className="px-lg-5 py-lg-5"
            style={{ marginBottom: '-13%', marginTop: '-5%' }}
          >
            <div
              className="modal-body"
              style={{ marginLeft: '-18%', marginTop: '-16%' }}
            >
              <AddUpload menuId={menuId} />
            </div>
          </CardBody>
        </Card>
        <h1
          style={{
            color: 'white',
            marginTop: '6%',
            marginLeft: '30%',
            backgroundColor: 'transparent'
          }}
        >
          Add Photos...
        </h1>
      </Modal>
    </>
  );
};

Modals.propTypes = {
  menuId: PropTypes.string.isRequired
};

export default Modals;
