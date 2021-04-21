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

const Food = ({ restaurant, sections }) => {
  const [items, setItems] = useState({
    description: '',
    title: '',
    photos: [],
  });
  const { food_id, section_id } = useParams();
  useEffect(() => {
    const foody = food_id.substring(1);
    const secc = section_id.substring(1);
    restaurant.items.map((item) => {
      if (item.section_id === secc && item.item_id === foody) {
        setItems({
          description: item.description,
          title: item.title,
          photos: item.item_photos,
        });
      }
    });
  }, []);
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
            </Row>
          </Button>
        </Link>
        <h1>{items.title}</h1>
        <p2>{items.description}</p2>
        {items.photos.length > 0
          ? items.photos.map((picture) => (
              //TODO THIS IS PlaCE HOLdER IMAGE MUST be set to
              //src={photo_url} When urls are links
              <img
                src='https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png'
                style={{ width: 130, height: 80, borderRadius: 15 }}
              ></img>
            ))
          : null}

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

Food.propTypes = {
  sections: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  restaurant: state.menus.menu2,
  sections: state.menus.menu.sections,
});

export default connect(mapStateToProps, null)(Food);
