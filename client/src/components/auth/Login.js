import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { login, forgotPassword } from '../../actions/auth';
import { primaryColor } from '../../primaryColor';
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

const Login = ({ login, isAuthenticated, setAlert, forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: 'jari@4midableimagery.com',
    password: '12345678',
    reset: false
  });

  const { email, password, reset } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (reset) {
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
    } else {
      login(formData);
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/home" />;
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
                  height: '345px'
                }}
              >
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Sign in with credentials</small>
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
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          name="password"
                          value={password}
                          onChange={onChange}
                          minLength="6"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="submit"
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
                        <strong>L</strong>
                        <strong
                          style={{
                            textTransform: 'lowercase',
                            paddingBotton: '20px'
                          }}
                        >
                          ogin
                        </strong>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link to="/reset">
                    <small
                      style={{
                        color: 'white',
                        float: 'right',
                        marginRight: '30px'
                      }}
                    >
                      Forgot password?
                    </small>
                  </Link>
                </Col>
                <Col className="text-right" xs="6">
                  <Link to="/register" className="text-light">
                    <small
                      style={{
                        color: 'white',
                        float: 'left',
                        marginLeft: '20px'
                      }}
                    >
                      Create new account
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

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  forgotPassword: PropTypes.func
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, login, forgotPassword })(
  Login
);
