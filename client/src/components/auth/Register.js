import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { primaryColor } from '../../primaryColor';
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
  Row,
  Col,
  Container
} from 'reactstrap';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    agree: false
  });
  const { email, agree } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChecked = () => {
    if (!agree) {
      setFormData({ ...formData, agree: true });
    } else {
      setFormData({ ...formData, agree: false });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlert('Please provide an email!', 'danger');
      return;
    }
    if (!agree) {
      setAlert('Please agree to terms and conditions', 'danger');
      return;
    } else {
      register({ email });
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
                data-aos="fade-left"
                style={{
                  borderRadius: '60px',
                  marginTop: '12px',
                  height: '285px'
                }}
              >
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Lets get started</small>
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
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                        name="agree"
                        checked={agree}
                        onChange={onChecked}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Terms and Conditions</span>
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
                          width: '130px'
                        }}
                      >
                        <strong>R</strong>
                        <strong
                          style={{
                            textTransform: 'lowercase',
                            paddingBotton: '20px'
                          }}
                        >
                          egister
                        </strong>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link to="/login" className="text-light">
                    <small
                      style={{
                        color: 'white',
                        float: 'right',
                        marginRight: '65px'
                      }}
                    >
                      Back to login
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

  isVerified: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isVerfied: state.auth.isVerified
});

export default connect(mapStateToProps, { setAlert, register })(Register);
