import React, { Fragment, useState, useEffect } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { resetPassword } from '../../actions/auth';
import { useLocation } from 'react-router-dom';

import Navbar from '../layout/Navbar';
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
  Col
} from 'reactstrap';
import { url } from '../../primaryColor';

const ResetPassword = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });
  /*
  useEffect(() => {
    console.log('This is the locations');
    console.log(window.location.href);
    console.log('notion');
  }, []);
  */

  const { password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setAlert('Enter a proper password!', 'danger');
    } else if (!password2 || password2.length < 6) {
      setAlert('Reenter your password correctly!', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match!', 'danger');
    } else {
      console.log(formData);

      return;
      //resetPassword(url_id, password);
      //setAlert('Password changed! Go back to the Login page!', 'success');
    }
  };

  return (
    <Fragment>
      (
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6%'
        }}
      >
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Reset Your Password</small>
              </div>
              <Form role="form" onSubmit={onSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="New Password"
                      type="password"
                      autoComplete="new-password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      minLength="6"
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
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      name="password2"
                      value={password2}
                      onChange={onChange}
                      minLength="6"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Reset Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
      )
    </Fragment>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  //isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, resetPassword })(
  ResetPassword
);
