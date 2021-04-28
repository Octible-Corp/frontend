import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import back2 from '../assets/img/LeftArrow/LA2.png';

const FoodCard = ({ item, index }) => {
  return (
    <div
      style={{
        marginBottom: 25,
      }}
    >
      <Link to={`/item/:${item.item_id}`}>
        <Button
          color='secondary'
          type='button'
          style={{
            borderRadius: 23,
            width: '90%',
            justifyContent: 'center',
            minHeight: 80,
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

              <CardText
                style={{
                  marginTop: -15,
                  width: '90%',
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
