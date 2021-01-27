import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import {primaryColor} from "../../primaryColor";
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Card,
  CardBody
} from 'reactstrap';
import { feedback } from '../../actions/post';

const Feedback = ({ setAlert, auth: { user }, feedback }) => {
  const [formData, setFormData] = useState({
    request: false,
    text: ''
  });
  const { request, text } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (text.length < 50) {
      setAlert('Feedback is too short!', 'danger');
    } else {
      if (text.length > 1000) {
        setAlert('Feedback is too long!', 'danger');
      } else {
        if (request === true)
          setAlert(
            'Check your email for a receipt of your submission!',
            'success'
          );
        else if (request === false)
          setAlert('Thank you for your feedback!', 'success');
        feedback(text, request);
      }
    }
  };
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: primaryColor,
          paddingBottom: '100px',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Card
          className="bg-secondary shadow border-0"
          style={{
            borderRadius: '60px',
            width: '600px',
            height: '460px',
            marginTop: '100px',
            alignSelf: 'center'
          }}
        >
          <CardBody
            className="px-lg-5 py-lg-5"
            style={{
              borderRadius: '60px',
              height: 'auto',
              width: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <p
              style={{
                color: '#b0b0b0',
                fontFamily: 'helvetica',
                alignSelf: 'center'
              }}
            >
              {' '}
              How can we improve?
            </p>
            <Form role="form" style={{ alignSelf: 'center' }}>
              <FormGroup>
                <InputGroup>
                  <div>
                    <Input
                      id="exampleFormControlTextarea1"
                      placeholder="We'll get back to you as soon as we can. Type in your feedback (50 to 500 characters)... "
                      rows="3"
                      type="textarea"
                      style={{
                        width: '450px',
                        height: '250px',

                        borderColor: 'transparent',
                        WebkitBoxShadow: '0px 1px 4px 0px'
                      }}
                      name="text"
                      value={text}
                      onChange={onChange}
                    />
                  </div>
                </InputGroup>
                <InputGroup>
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    onClick={onSubmit}
                    style={{
                      backgroundColor: primaryColor,
                      border: primaryColor,
                      borderRadius: '30px',
                      fontFamily: 'helvetica',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      letterSpacing: '1px',
                      width: '120px',
                      marginLeft: '170px',
                      marginTop: '20px'
                    }}
                  >
                    <strong
                      style={{
                        textTransform: 'capitalize',
                        paddingBotton: '20px'
                      }}
                    >
                      Submit
                    </strong>
                  </Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <div style={{ alignSelf: 'center' }}>
          <Button
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              WebkitBoxShadow: 'none',
              marginTop: '20px'
            }}
          >
            {' '}
            <Link to="/add-menu" className="text-light">
              <p
                style={{
                  color: 'white',
                  fontFamily: 'helvetica',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}
              >
                {' '}
                Back to Menus
              </p>
            </Link>{' '}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

Feedback.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  feedback: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, feedback })(Feedback);
