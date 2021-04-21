import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../../assets/foodItem/FoodCard';

import { Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Dimensions } from 'react';
import { Card, FormGroup, Input, Button, Col, Modal, Row } from 'reactstrap';
import backBoy from './backArrow.png';
import back2 from '../../assets/img/LeftArrow/LA2.png';

import { primaryColor } from '../../primaryColor';

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
        <Link to={'/'}>
          <Button
            onClick={() => console.log(items)}
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              shadowColor: '#636c73',
              shadowRadius: 0,
              shadowOpacity: 0.0,
              boxShadow: `0px 0px 0px #DCDCDC`,
              marginBottom: 10,
              marginTop: -20,
              width: 500,
            }}
          >
            <Row>
              <img src={back2} style={{ marginRight: 20 }}></img>

              <h1
                style={{
                  position: 'fixed',
                  left: 70,
                  top: 16,
                  color: '#22CDEF',
                }}
              >
                GO BACK
              </h1>
            </Row>
          </Button>
        </Link>
        {items.map((item, index) => (
          <FoodCard item={item} index={index}></FoodCard>
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
