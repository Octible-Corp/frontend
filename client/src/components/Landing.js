import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuBubble from '../assets/MenuBubble/MenuBubble';
import { Row, Button, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMenu, initSession } from '../actions/menus';
import { preLoadImg } from '../actions/workers';
import { useLocation } from 'react-router-dom';
import { captureData } from '../actions/menus';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const url = 'https://octible.s3.us-east-2.amazonaws.com/';

const Landing = ({ restaurant, sections, getMenu, loaded, dba, session_id, session_start, initSession }) => {
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(true);
  const time_ref = useRef({
    menu_id: null,
    start_time: null,
    session_id: null
  });

  const t0 = Date.now();

  useEffect(() => {
    const api_url = window.location.href;
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

  useEffect(() => {
    if (restaurant.hasOwnProperty('menu_id')) {
      time_ref.current.menu_id = restaurant.menu_id;
      (async () => {
        await preLoadImg(restaurant);
        setLoadingImg(false);
      })();
    }
  }, [restaurant]);

  const location = useLocation();
  const screen_name = location.pathname;

  useEffect(() => {
    //Create session id, store session id in state
    // if no session id or if it's been 6 days
    const d = Date.now();
    if (session_id === "" || d - session_start > 21600000) {
      const newSessionId = Math.random().toString(33).substring(2, 30);
      initSession(newSessionId, d);
      time_ref.current.session_id = newSessionId
    } else {
      time_ref.current.session_id = session_id
    }

    //start time = getTimestamp (unix)

    time_ref.current.start_time = t0;


    // Store timestamp in useRef()

    return () => {
      const time_2 = Date.now();
      const diff = (time_2 - time_ref.current.start_time) / 1000.0;
      const data_obj = {
        session_id: time_ref.current.session_id,
        menu_id: time_ref.current.menu_id,
        start_time: time_ref.current.start_time,
        time_spent: diff,
        screen: "Landing",
      };

      //Send object to backend
      captureData(data_obj);
    };
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
            {loadingImg ? (
              <div style={{ height: 100, width: '100%' }} />
            ) : (
              <>
                {restaurant.background_photo ? (
                  <Image
                    style={{
                      maxWidth: '100%',
                      zIndex: 0,
                      boxShadow: '1px 1px 1px #9E9E9E',
                    }}
                    src={`${url}${restaurant.background_photo}`}
                  />
                ) : (
                  <div style={{ height: 100, width: '100%' }} />
                )}

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
                    border: `2.5px solid ${dba.primary_color}`,
                    borderWidth: 3,
                    boxShadow: '2px 2px 2px #9E9E9E',
                  }}
                  src={`${url}${restaurant.logo_photo}`}
                />
              </>
            )}

            <p
              style={{
                position: 'relative',
                bottom: 25,
                fontFamily: 'helvetica',
                fontWeight: 'bold',
                color: dba.title_color,
                fontSize: 55,
              }}
            >
              {restaurant.name}
            </p>
            <Row
              style={{ position: 'relative', bottom: 40, marginBottom: -10 }}
            >
              <Col>
                <Button
                  type='button'
                  style={{
                    position: 'relative',
                    borderRadius: '30px',
                    width: 130,
                    height: 40,
                    backgroundColor: dba.section_button_color,
                    borderColor: dba.section_button_color,
                  }}
                >
                  <Link
                    style={{
                      color: dba.section_button_text_color,
                      fontFamily: 'helvetica',
                      fontSize: 20,
                      justifyContent: 'center',
                      position: 'absolute',
                      top: '5px',
                      left: '23px',
                      textTransform: 'none'
                    }}
                    to='https://www.google.com'
                  >
                    Website
                  </Link>
                </Button>
              </Col>
              <Col>
              <Button
                  type='button'
                  style={{
                    position: 'relative',
                    borderRadius: '30px',
                    width: 130,
                    height: 40,
                    padding: '0px',
                    backgroundColor: dba.section_button_color,
                    borderColor: dba.section_button_color,
                  }}
                >
                  <Link
                    style={{
                      color: dba.section_button_text_color,
                      fontFamily: 'helvetica',
                      fontSize: 18,
                      justifyContent: 'center',
                      position: 'absolute',
                      top: '7px',
                      left: '20px',
                      textTransform: 'none'
                    }}
                    to={'/pdf/photos'}
                  >
                    PDF Menu
                  </Link>
                </Button>
              </Col>
            </Row>

            <p
              style={{
                marginBottom: 20,
                marginTop: 5,
                fontFamily: 'helvetica',
                fontSize: 25,
                color: dba.subtitle_color,
              }}
            >
              Digital Menu
            </p>

            {sections.map((section) => (
              <Link
                to={`/items/:${section.section_id}`}
                id={section.section_id}
                key={section.section_id}
              >
                <MenuBubble
                  section_id={section.section_id}
                  text={`${section.section}`}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  session_id: PropTypes.string.isRequired,
  initSession: PropTypes.func.isRequired,
  session_start: PropTypes.number.isRequired,
  sections: PropTypes.array.isRequired,
  getMenu: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  dba: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session_id: state.menus.session_id,
  session_start: state.menus.session_start,
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
  dba: state.menus.dba,
  loaded: state.menus.loaded,
});

export default connect(mapStateToProps, { getMenu, initSession })(Landing);
