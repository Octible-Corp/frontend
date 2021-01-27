import React, { useState } from 'react';
import {primaryColor} from "../../primaryColor";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal
} from 'reactstrap';

const ChangeNameModal = ({ menuId, menuName, changeName, toggle }) => {
  const [state, setState] = useState({
    nameModal: false,
    name: menuName
  });

  const { nameModal, name } = state;

  const toggleModal = (nameModal) => {
    if (nameModal) {
      setState({
        ...state,
        nameModal: false
      });
    }
    if (!nameModal) {
      setState({
        ...state,
        nameModal: true
      });
    }
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    changeName(menuId, name);
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
          marginRight: '0px',
          marginBottom: '15px',
          alignSelf: 'center'
        }}
        onClick={() => toggleModal(nameModal)}
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
          Change Name
        </p>
      </Button>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={nameModal}
        toggle={() => toggleModal(nameModal)}
      >
        <Card
          className="bg-secondary shadow border-0"
          style={{
            borderRadius: '60px',
            marginTop: '12px',
            height: '285px',
            width: '320px',
            marginLeft: '90px'
          }}
        >
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Change your menu name below</small>
            </div>
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tag" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="name" value={name} onChange={onChange} />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  onClick={() => {
                    toggleModal(nameModal);
                    toggle();
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    border: primaryColor,
                    borderRadius: '30px',
                    fontFamily: 'helvetica',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    letterSpacing: '1px',
                    width: '120px'
                  }}
                >
                  <strong
                    style={{
                      textTransform: 'lowercase',
                      paddingBotton: '20px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Save
                  </strong>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
};

ChangeNameModal.propTypes = {
  menuId: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  changeName: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
};

export default ChangeNameModal;
