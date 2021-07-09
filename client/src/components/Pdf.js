import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './Footer';
import { initSession } from '../actions/menus';
import { captureData } from '../actions/menus';
const pre_url = 'https://octible.s3.us-east-2.amazonaws.com/';

const Pdf = ({ restaurant, photos, dba, session_id, session_start, initSession }) => {
  const history = useHistory();
  const time_ref = useRef({
    menu_id: null,
    start_time: null,
    session_id: null
  });
  const t0 = Date.now();

  useEffect(() => {
    //Create session id, store session id in state
    // if no session id or if it's been 6 days
    const d = Date.now();
    if (!session_id || d - session_start > 21600000) {
      const newSessionId = Math.random().toString(33).substring(2, 30);
      initSession(newSessionId, d);
    }

    //start time = getTimestamp (unix)

    time_ref.current.start_time = t0;
    time_ref.current.menu_id = restaurant.menu_id;
    // Store timestamp in useRef()

    return () => {
      const time_2 = Date.now();
      const diff = (time_2 - t0) / 1000.0;
      const data_obj = {
        session_id: session_id,
        menu_id: time_ref.current.menu_id,
        start_time: time_ref.current,
        time_spent: diff,
        screen: "Pdf",
      };

      //Send object to backend
      captureData(data_obj);
    };
  }, []);

  return (
    <Fragment>
      <div style={{ backgroundColor: dba.background_color, height: '100vh' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: dba.background_color,
          }}
        >
          <Col>
            {photos.map((photo) => (
              <img
                style={{ width: '100%', height: 'auto', marginTop: 20 }}
                src={`${pre_url}${photo}`}
              />
            ))}
            <div
              style={{ height: 100, backgroundColor: dba.background_color }}
            />
          </Col>
        </div>
        <Footer destination={'home'} />
      </div>
    </Fragment>
  );
};

Pdf.propTypes = {
  photos: PropTypes.array.isRequired,
  dba: PropTypes.object.isRequired,
  session_id: PropTypes.string.isRequired,
  initSession: PropTypes.func.isRequired,
  session_start: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  photos: state.menus.menu.pdf,
  dba: state.menus.dba,
  restaurant: state.menus.menu,
  session_id: state.menus.session_id,
  session_start: state.menus.session_start,
});

export default connect(mapStateToProps, { initSession })(Pdf);
