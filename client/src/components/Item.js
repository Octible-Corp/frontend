import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './Footer';
import { captureData } from '../actions/menus';
import { initSession } from '../actions/menus';
const Item = ({ restaurant, items, sections, dba, session_id, session_start, initSession  }) => {
  const { item_id } = useParams();
  let location = useLocation();
  location = location.pathname.split(":").pop();
  const time_ref = useRef({
    menu_id: null,
    start_time: null,
    session_id: null,
  });
  const t0 = Date.now();
  useEffect(() => {
    //Create session id, store session id in state
    // if no session id or if it's been 6 days
    const d = Date.now();
    if (!session_id || d - session_start > 21600000) {
      console.log('Generate new session');
      const newSessionId = Math.random().toString(33).substring(2, 30);
      initSession(newSessionId, d);
    }

    //start time = getTimestamp (unix)
    time_ref.current.start_time = t0;
    time_ref.current.menu_id = restaurant.menu_id;
    // Store timestamp in useRef()
    console.log('-----USE EFFECT 1-------');
    return () => {
      console.log('-----USE EFFECT 2-------')
      const time_2 = Date.now();
      const diff = (time_2 - t0) / 1000.0;
      const data_obj = {
        session_id: session_id,
        menu_id: time_ref.current.menu_id,
        start_time: time_ref.current,
        time_spent: diff,
        screen: "Item: " + location,
      };

      //Send object to backend
      captureData(data_obj);
    };
  }, [location]);

  const [item, setItem] = useState({});
  const [name, setName] = useState('');
  useEffect(() => {
    let found_item = items.find((i) => i.item_id === item_id.substring(1));
    let section = sections.find((s) => s.section_id === found_item.section_id);
    setName(section.section);
    setItem(found_item);
  }, []);

  return (
    <Fragment>
      <div style={{ backgroundColor: dba.background_color, height: 'auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'inherit',
          }}
        >
          <h1
            style={{
              marginTop: 30,
              textTransform: 'capitalize',
              fontFamily: 'helvetica',
              fontWeight: 'bold',
              color: dba.section_title_color,
              marginLeft: 21,
              fontSize: 40,
            }}
          >
            {name}
          </h1>
        </div>

        <Col>
          <Row style={{ marginTop: 15 }}>
            <Col xs='8'>
              <p
                style={{
                  textAlign: 'left',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  marginLeft: 9,
                  color: dba.single_item_text_color,
                  fontSize: 14,
                }}
              >
                {item.title}
              </p>
            </Col>
            <Col xs='4'>
              <p
                style={{
                  textAlign: 'right',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  marginRight: 15,
                  color: dba.single_item_text_color,
                  fontSize: 14,
                }}
              >
                {item.price}
              </p>
            </Col>
          </Row>
          <Row>
            <p
              style={{
                alignText: 'right',
                marginLeft: 24,
                marginTop: 3,
                marginRight: 25,
                color: dba.single_item_text_color2,
              }}
            >
              {item.description}
            </p>
          </Row>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -20,
            }}
          >
            {item.item_photos?.map((it) => (
              <img
                style={{
                  borderRadius: 30,
                  marginTop: 30,
                  width: '75%',
                  height: 'auto',
                  alignSelf: 'center',
                }}
                src={it.url}
                class='img-fluid'
                alt='Responsive image'
              />
            ))}
          </Row>
          <div style={{ height: 100 }} />
        </Col>
        <Footer destination={'back'} />
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  session_id: PropTypes.string.isRequired,
  initSession: PropTypes.func.isRequired,
  session_start: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  section: PropTypes.array.isRequired,
  dba: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.menus.menu.items,
  sections: state.menus.menu.sections,
  dba: state.menus.dba,
  restaurant: state.menus.menu,
});

export default connect(mapStateToProps, { initSession })(Item);
