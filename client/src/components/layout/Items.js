import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../../assets/foodItem/FoodCard';

import { Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Dimensions } from 'react';
import { Card, FormGroup, Input, Button, Col, Modal, Row } from 'reactstrap';

const leftArrow = require('../../assets/img/LeftArrow/backArrow.png');

const Landing = ({ restaurant, sections, placeholder }) => {
  const [items, setItems] = useState([]);
  const { section_id } = useParams();
  useEffect(() => {
    const section = section_id.substring(1);
    console.log('SECTION ID:', section);
    let placeholder = [];
    restaurant.items.map((item) => {
      if (item.section_id === section) {
        console.log('CALLING', item.section_id, section);
        placeholder.push(item);
      }
    });
    setItems(placeholder);
    console.log('current items: ', items);
  }, []);
  return (
    <body>
      <div
        color='info'
        //type='div'
        style={{
          position: 'fixed',
          padding: 20,
          top: 0,
          width: '100%',
          background: '#4C9AFF',
          height: 100,
          textAlign: 'left',
          zIndex: 5,
        }}
      >
        <Row>
          {/* <i class='nc ni-bold-left ni-custom'></i> */}

          <img src='/backArrow.png'></img>

          <h1 style={{ fontFamily: 'Helvetica' }}>GO BACK</h1>
        </Row>
      </div>

      <div
        color='info'
        style={{
          padding: 20,
          top: 0,
          width: '100%',
          height: 80,
          background: 'white',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => console.log(items)}>
          <h1
            style={{
              // position: 'fixed',
              // left: 40,
              color: 'blue',
            }}
          >
            X GO BACK
          </h1>
        </Button>

        <Button onClick={() => console.log(items)}>
          <h1>Item Page</h1>
        </Button>

        {items.map((item, index) => (
          <FoodCard item={item}></FoodCard>
        ))}
      </div>
      <div
        color='info'
        //type='div'
        style={{
          position: 'fixed',
          padding: 20,
          bottom: -75,
          width: '100%',
          borderRadius: 25,
          height: 150,
          background: '#4C9AFF',
          textAlign: 'center',
          zIndex: 5,
        }}
      >
        <p1
          style={{
            color: 'white',
          }}
        >
          Powered by Octible
        </p1>
      </div>
    </body>
  );
};

Landing.propTypes = {
  sections: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  restaurant: state.menus.menu2,
  sections: state.menus.menu.sections,
  placeholder: state.menus.menu2.items.filter(
    (item) => ownProps.id === item.id
  ),
});

export default connect(mapStateToProps, null)(Landing);
