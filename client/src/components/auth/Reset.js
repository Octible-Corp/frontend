import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { login, forgotPassword } from '../../actions/auth';
import {primaryColor} from "../../primaryColor";
import {
  Container,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from 'reactstrap';

const Reset = ({ login, isAuthenticated, setAlert, forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlert('Please enter an email!', 'danger');
    } else {
      //Forgot password
      setAlert(
        'An email has been sent to ' + email + ' to reset your password',
        'success'
      );
      //Call backend forgot password method
      forgotPassword(email);
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/add-menu" />;
  }

  return (
    <Fragment>
      <div style={{ backgroundColor: primaryColor, height: '100vh' }}>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card
                className="bg-secondary shadow border-0"
                data-aos="fade-right"
                style={{
                  borderRadius: '60px',
                  marginTop: '12px',
                  height: '267px'
                }}
              >
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Reset your password</small>
                  </div>
                  <Form role="form" onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          autoComplete="new-email"
                          name="email"
                          value={email}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="submit"
                        style={{
                          backgroundColor: primaryColor,
                          border: primaryColor,
                          borderRadius: '30px',
                          marginTop: '30px',
                          fontFamily: 'helvetica',
                          fontWeight: 'bold',
                          fontSize: '18px',
                          letterSpacing: '1px',
                          width: '120px'
                        }}
                      >
                        <strong>R</strong>
                        <strong
                          style={{
                            textTransform: 'lowercase',
                            paddingBotton: '20px'
                          }}
                        >
                          eset
                        </strong>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link to="/login">
                    <small
                      style={{
                        color: 'white',
                        float: 'right',
                        marginRight: '60px'
                      }}
                    >
                      Back to Login
                    </small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

Reset.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  forgotPassword: PropTypes.func
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, login, forgotPassword })(
  Reset
);
