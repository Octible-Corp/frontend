import React from 'react';
import { connect } from 'react-redux';
import { CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { buttonColor } from '../primaryColor';

const FoodCard = ({ item }) => {
  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      <Link to={`/item/:${item.item_id}`}>
        <Button
          type='button'
          style={{
            borderRadius: 23,
            width: '90%',
            minHeight: 80,
            backgroundColor: buttonColor,
            borderColor: buttonColor,
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
                  color: 'black',
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
                  color: 'black',
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
                color: 'grey',
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
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(FoodCard);
