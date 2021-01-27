import React, { Fragment, useState } from 'react';
import octopus from '../../img/OctibleLogo.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
// import tripleBar from '../../img/tripleBar.png';
import { logout, fire } from '../../actions/auth';
import { Button, Card, Row } from 'reactstrap';
import { setAlert } from '../../actions/alert';
import { primaryColor } from '../../primaryColor';
const Header = ({ auth: { user }, setAlert, isAuthenticated, logout }) => {
  const [formData, setFormData] = useState({
    options: false
  });

  const { options } = formData;
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: primaryColor,
          height: '10%',
          width: '100vw',
          position: 'absolute',
          background: 'transparent'
        }}
      >
        <div
          style={{
            float: 'left',
            marginRight: '10px'
          }}
        >
          {' '}
          {!isAuthenticated ? (
            <Link to="/">
              <h1
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  height: 'auto',
                  fontSize: '200%',
                  marginTop: '13px',
                  fontWeight: 'bold',
                  marginLeft: '40px'
                }}
              >
                <img
                  src={octopus}
                  alt="Octopus"
                  className="src"
                  style={{
                    width: '47px',
                    height: 'inherit',
                    overflow: 'hidden'
                  }}
                />
                Octible
              </h1>
            </Link>
          ) : (
            <Link style={{ zIndex: '1' }} to="/add-menu">
              <h1
                style={{
                  fontFamily: 'Helvetica',
                  color: 'white',
                  height: 'auto',
                  fontSize: '200%',
                  marginTop: '13px',
                  fontWeight: 'bold',
                  marginLeft: '40px'
                }}
              >
                <img
                  src={octopus}
                  alt="Octopus"
                  className="src"
                  style={{
                    width: '47px',
                    height: 'inherit',
                    overflow: 'hidden'
                  }}
                />
                Octible
              </h1>
            </Link>
          )}
        </div>
        {isAuthenticated ? (
          <div
            style={{
              width: '20%',
              float: 'right',
              marginRight: '20px'
            }}
          >
            <Row>
              <Button
                onClick={() => {
                  if (options) {
                    setFormData({ options: false });
                  } else {
                    setFormData({ options: true });
                  }
                }}
                style={{
                  zIndex: '1',
                  WebkitBoxShadow: 'none',
                  height: '38px',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  paddingLeft: '73%',
                  float: 'right'
                }}
              >
                <svg
                  id="Drop_Menu"
                  data-name="Drop Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="48"
                  viewBox="0 0 48 37"
                >
                  <rect
                    id="Rectangle_20"
                    data-name="Rectangle 20"
                    width="48"
                    height="7"
                    rx="3.5"
                    fill="#F4F5F7"
                  />
                  <rect
                    id="Rectangle_21"
                    data-name="Rectangle 21"
                    width="48"
                    height="7"
                    rx="3.5"
                    transform="translate(0 15)"
                    fill="#F4F5F7"
                  />
                  <rect
                    id="Rectangle_22"
                    data-name="Rectangle 22"
                    width="48"
                    height="7"
                    rx="3.5"
                    transform="translate(0 30)"
                    fill="#F4F5F7"
                  />
                </svg>
              </Button>
            </Row>
            {options ? (
              <Row>
                <Card
                  style={{
                    height: '220px',
                    width: '160px',
                    borderRadius: '30px',
                    marginTop: '18px',
                    marginLeft: '35%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: ' #F4F5F7',
                    zIndex: '1'
                  }}
                >
                  <Button
                    size="sm"
                    style={{
                      background: 'transparent',
                      borderColor: 'transparent',
                      WebkitBoxShadow: 'none',
                      fontFamily: 'helvetica',
                      color: primaryColor,
                      textTransform: 'capitalize',
                      fontSize: '14px',
                      marginLeft: '8px',
                      marginTop: '10px'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = user.url;
                    }}
                  >
                    Download Codes
                  </Button>
                  <Link to="/home">
                    <Button
                      size="sm"
                      style={{
                        background: 'transparent',
                        borderColor: 'transparent',
                        WebkitBoxShadow: 'none',
                        fontFamily: 'helvetica',
                        color: primaryColor,
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        marginLeft: '5px'
                      }}
                    >
                      Menus
                    </Button>
                  </Link>
                  <Link to="">
                    <Button
                      size="sm"
                      style={{
                        background: 'transparent',
                        borderColor: 'transparent',
                        WebkitBoxShadow: 'none',
                        fontFamily: 'helvetica',
                        color: primaryColor,
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        marginLeft: '5px'
                      }}
                    >
                      Add Menu
                    </Button>
                  </Link>
                  <Link to="/feedback">
                    <Button
                      size="sm"
                      style={{
                        background: 'transparent',
                        borderColor: 'transparent',
                        WebkitBoxShadow: 'none',
                        fontFamily: 'helvetica',
                        color: primaryColor,
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        marginLeft: '5px'
                      }}
                    >
                      Help {'&'} Support
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    style={{
                      background: 'transparent',
                      borderColor: 'transparent',
                      WebkitBoxShadow: 'none',
                      fontFamily: 'helvetica',
                      color: primaryColor,
                      textTransform: 'capitalize',
                      fontSize: '14px',
                      marginLeft: '8px'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      //setAlert('Comming Soon!', 'success');
                      console.log('Firing');
                      fire();
                    }}
                  >
                    Analytics
                  </Button>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: '#FF6A6A',
                      borderColor: '#FF6A6A',
                      WebkitBoxShadow: 'none',

                      borderRadius: '30px',
                      width: '100px',
                      height: '30px',
                      marginTop: '5px'
                    }}
                    onClick={logout}
                  >
                    <p
                      style={{
                        textTransform: 'capitalize',
                        fontFamily: 'helvetica',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#F4F5F7'
                      }}
                    >
                      Logout
                    </p>
                  </Button>
                </Card>
              </Row>
            ) : (
              <div></div>
            )}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, logout, fire })(Header);
