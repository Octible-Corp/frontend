import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { setPassword, forgotPassword } from '../../actions/auth';
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
import { $CombinedState } from 'redux';

const Setup = ({ step1, isAuthenticated, setAlert, location, setPassword }) => {
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setFormData({ ...formData, verify_hash: path });
  }, []);
  const [formData, setFormData] = useState({
    verify_hash: '',
    password: '',
    password2: ''
  });

  const { password, password2, verify_hash } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setAlert('Please enter a password!', 'danger');
      return;
    }
    if (password.length < 6) {
      setAlert('Password must be at least 6 charactors', 'danger');
      return;
    }
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      return;
    }
    if (!verify_hash) {
      setAlert('Huh, somethings broken, shoot!', 'danger');
      return;
    }

    setPassword(formData);
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
                    <small>Confirm your password</small>
                  </div>
                  <Form role="form" onSubmit={onSubmit}>
                    <FormGroup className="mb-3">
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
                          name="password2"
                          value={password2}
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
                          width: '150px'
                        }}
                      >
                        <strong>C</strong>
                        <strong
                          style={{
                            textTransform: 'lowercase',
                            paddingBotton: '20px'
                          }}
                        >
                          ontinue
                        </strong>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

Setup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  step1: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  forgotPassword: PropTypes.func,
  location: PropTypes.object.isRequired,
  setPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  setAlert,
  setPassword,
  forgotPassword
})(Setup);
