import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { updateStep } from '../../actions/auth';
import PropTypes from 'prop-types';
import {primaryColor} from "../../primaryColor";
// reactstrap components
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

const Step2 = ({ setAlert, register, isAuthenticated, updateStep, user }) => {
  const [formData, setFormData] = useState({
    email: '',
    agree: false,
    step: '2'
  });
  const { email, step } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    updateStep(step);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    register({ email });
  };

  if (user.step_tracker === '2') {
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
                    <small>Have a redeem code? Enter it here.</small>
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
                          placeholder="Redeem code"
                          type="email"
                          autoComplete="new-email"
                          name="email"
                          value={email}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Row>
                        <Col>
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
                            <strong>R</strong>
                            <strong
                              style={{
                                textTransform: 'lowercase',
                                paddingBotton: '20px'
                              }}
                            >
                              edeem
                            </strong>
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            className="my-4"
                            color="primary"
                            onClick={onClick}
                            style={{
                              backgroundColor: primaryColor,
                              border: primaryColor,
                              borderRadius: '30px',
                              fontFamily: 'helvetica',
                              fontWeight: 'bold',
                              fontSize: '18px',
                              letterSpacing: '1px',
                              width: '120px',
                              marginRight: '3px'
                            }}
                          >
                            <strong>S</strong>
                            <strong
                              style={{
                                textTransform: 'lowercase',
                                paddingBotton: '20px'
                              }}
                            >
                              kip
                            </strong>
                          </Button>
                        </Col>
                      </Row>
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

Step2.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updateStep: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isVerfied: state.auth.isVerified,
  user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, updateStep })(Step2);
