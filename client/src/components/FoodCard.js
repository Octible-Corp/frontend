import React from 'react';
import { connect } from 'react-redux';
import { CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { buttonColor } from '../primaryColor';

const FoodCard = ({ item, dba }) => {
  return (
    <div
      style={{
        backgroundColor: dba.background_color,
      }}
    >
      <Link to={`/item/:${item.item_id}`}>
        <Button
          type='button'
          style={{
            borderRadius: 23,
            width: '87%',
            minHeight: 80,
            backgroundColor: dba.item_button_color,
            borderColor: dba.item_button_color,
            WebKitBoxShadow:
              dba.item_button_color === 'transparent' ? 'none' : '',
          }}
        >
          <Row>
            <Col xs='8'>
              <CardTitle
                style={{
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'Helvetica',
                  fontSize: '100%',
                  fontWeight: 'bold',
                  color: dba.item_button_text_color,
                }}
              >
                {item.title}
              </CardTitle>
            </Col>
            <Col xs='4'>
              <CardTitle
                style={{
                  textAlign: 'right',
                  fontFamily: 'Helvetica',
                  fontSize: '100%',
                  fontWeight: 'bold',
                  color: dba.item_button_text_color,
                }}
              >
                {item.price}
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <CardText
              style={{
                marginTop: -15,
                marginLeft: 15,
                marginRight: 10,
                textAlign: 'left',
                fontFamily: 'Helvetica',
                fontSize: '90%',
                textTransform: 'capitalize',
                lineHeight: 1.3,
                color: dba.item_button_text_color2,
              }}
            >
              {item.description}
            </CardText>
          </Row>
        </Button>
      </Link>
    </div>
  );
};

FoodCard.propTypes = {
  item: PropTypes.object.isRequired,
  dba: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dba: state.menus.dba,
});

export default connect(mapStateToProps, null)(FoodCard);
