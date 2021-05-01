import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuBubble from '../assets/MenuBubble/MenuBubble';
import { Row, Button, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMenu } from '../actions/menus';
import { primaryColor } from '../primaryColor';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const url = 'https://octible.s3.us-east-2.amazonaws.com/';

const Landing = ({ restaurant, sections, getMenu, loaded }) => {
  const [loading, setLoading] = useState(false);
  const t0 = Date.now();

  useEffect(() => {
    const api_url = window.location.href;
    console.log('---API_URL---');
    console.log(api_url);
    (async () => {
      if (!loaded || !restaurant.hasOwnProperty('user_id')) {
        setLoading(true);
        await getMenu(api_url);
        const t1 = Date.now();
        const diff = t1 - t0;
        if (diff < 1000) {
          await sleep(700);
        }
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Fragment>
      {loading || !restaurant.hasOwnProperty('user_id') ? (
        <>
          <div
            id='Octible-app'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: 0,
              marginBottom: 0,
            }}
          >
            <div
              style={{ width: 100, height: 100, marginTop: 300 }}
              className='spinner-border text-primary'
              role='status'
            />
          </div>
        </>
      ) : (
        <>
          <div
            id='Octible-app'
            style={{
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1,
              flexGrow: 1,
              position: 'relative',
              alignItems: 'center',
              overflow: 'auto',
              marginRight: 0,
              marginBottom: 0,
            }}
          >
            <Image
              style={{
                maxWidth: '100%',
                zIndex: 0,
                boxShadow: '1px 1px 1px #9E9E9E',
              }}
              src={`${url}${restaurant.background_photo}`}
            />
            <Image
              style={{
                height: 100,
                width: 100,
                zindex: 10,
                borderRadius: 100 / 2,
                position: 'relative',
                bottom: 40,
                //left: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2.5px solid ${primaryColor}`,
                borderWidth: 3,
                boxShadow: '2px 2px 2px #9E9E9E',
              }}
              src={`${url}${restaurant.logo_photo}`}
            />
            <p1
              style={{
                position: 'relative',
                bottom: 30,
                fontFamily: 'helvetica',
                fontWeight: 'bold',
                color: 'black',
                fontSize: 55,
              }}
            >
              {restaurant.name}
            </p1>
            <Row
              style={{ position: 'relative', bottom: 20, marginBottom: -10 }}
            >
              <Col>
                <Button
                  type='button'
                  style={{
                    borderRadius: '30px',
                    width: 120,
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                  }}
                >
                  <a
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      fontFamily: 'helvetica',
                    }}
                    href='https://www.google.com'
                  >
                    Website
                  </a>
                </Button>
              </Col>
              <Col>
                <Link to={'/pdf/photos'}>
                  <Button
                    type='button'
                    style={{
                      borderRadius: '30px',
                      width: 120,
                      fontFamily: 'helvetica',
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    }}
                  >
                    <a style={{ color: 'white', fontFamily: 'helvetica' }}>
                      Pdf
                    </a>
                  </Button>
                </Link>
              </Col>
            </Row>

            <p2
              style={{
                marginBottom: 10,
                marginTop: 30,
                fontFamily: 'helvetica',
                fontSize: 20,
                color: '#5A5A5A',
              }}
            >
              Digital Menu
            </p2>

            {sections.map((section) => (
              <Link
                to={`/items/:${section.section_id}`}
                id={section.section_id}
              >
                <MenuBubble
                  section_id={section.section_id}
                  text={`${section.section}`}
                />
              </Link>
            ))}
            <div style={{ height: 200 }}></div>
          </div>

          <div
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              marginBottom: 0,
              position: 'fixed',
              backgroundColor: '#F8F8F8',
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              height: 60,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 5,
            }}
          >
            <Button
              style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                WebkitBoxShadow: 'none',
              }}
              onClick={() => {}}
            >
              <i
                style={{
                  color: primaryColor,
                  alignSelf: 'center',
                  opacity: 0.7,
                }}
                class='fa fa-home fa-3x'
                aria-hidden='true'
              />
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  sections: PropTypes.array.isRequired,
  getMenu: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
  loaded: state.menus.loaded,
});

export default connect(mapStateToProps, { getMenu })(Landing);
