import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../../assets/foodItem/FoodCard';

import { Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Dimensions } from 'react';
import { Card, FormGroup, Input, Button, Col, Modal, Row } from 'reactstrap';

import back2 from '../../assets/img/LeftArrow/LA2.png';

import { primaryColor } from '../../primaryColor';

const Food = ({ id, food }) => {
  const [items, setItems] = useState([]);
  const { food_id, section_id } = useParams();
  useEffect(() => {
    console.log(food_id);
  });
  return (
    <body>
      <div
        color='info'
        style={
          {
            //   padding: 20,
            //   top: 0,
            //   width: '100%',
            //   height: 80,
            //   background: 'white',
            //   textAlign: 'center',
            //   alignItems: 'center',
          }
        }
      >
        <Link to={`/items/${section_id}/`}>
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
              //float: 'left',
              //marginRight: 68,
              width: 300,
            }}
          >
            <Row>
              <img
                src={back2}
                style={{ marginRight: 20, alignSelf: 'flex-start' }}
              ></img>
              <h1
                style={{
                  position: 'fixed',
                  left: 80,
                  top: 16,
                  color: '#22CDEF',
                }}
              >
                GO BACK
              </h1>
            </Row>
          </Button>
        </Link>

        {/* {items.map((item, index) => (
          <FoodCard item={item} index={index}></FoodCard>
        ))} */}
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

Food.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Food);
