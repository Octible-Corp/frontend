import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from './FoodCard';
import Footer from './Footer';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Button } from 'reactstrap';
import { captureData } from '../actions/menus';
import { buttonColor, primaryColor } from '../primaryColor';
import { initSession } from '../actions/menus';
const Landing = ({ restaurant, sections, dba, session_id, session_start, initSession }) => {
  let location = useLocation();
  location = location.pathname.split(":").pop();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const { section_id } = useParams();
  const time_ref = useRef({
    menu_id: null,
    start_time: null,
    session_id: null,
  });
  const t0 = Date.now();
  useEffect(() => {
    const section = section_id.substring(1);
    let placeholder = restaurant.items.filter(
      (item) => item.section_id === section
    );
    let raw_section_name = sections.find((sec) => sec.section_id === section);
    setName(raw_section_name.section);
    setItems(placeholder);
  }, [section_id]);

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
        screen: "Section: " + location,
      };

      //Send object to backend
      captureData(data_obj);
    };
  }, [location]);

  return (
    <Fragment>
      <div style={{ backgroundColor: dba.background_color, height: '100vh' }}>
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
              fontFamily: 'Lato',
              fontWeight: 'bold',
              color: dba.section_title_color,
              marginLeft: 21,
              fontSize: 40,
            }}
          >
            {name}
          </h1>
        </div>

        <div
          style={{
            backgroundColor: dba.background_color,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {items.map((item, index) => (
            <>
              <div
                style={{ height: 10, backgroundColor: dba.background_color }}
              />
              <FoodCard item={item} key={index}></FoodCard>
            </>
          ))}
          {items.map((item, index) => (
            <>
              <div
                style={{ height: 10, backgroundColor: dba.background_color }}
              />
              <FoodCard item={item} key={index}></FoodCard>
            </>
          ))}
          <div style={{ height: 100 }} />
        </div>
        <Footer destination={'home'} />
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  session_id: PropTypes.string.isRequired,
  initSession: PropTypes.func.isRequired,
  session_start: PropTypes.number.isRequired,
  sections: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
  dba: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  session_id: state.menus.session_id,
  session_start: state.menus.session_start,
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
  dba: state.menus.dba,
});

export default connect(mapStateToProps, { initSession })(Landing);
