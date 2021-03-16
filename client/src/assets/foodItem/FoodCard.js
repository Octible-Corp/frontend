import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from 'reactstrap';
import { Image } from 'react-bootstrap';
import { primaryColor } from '../../primaryColor';

const steak = require('./logo.png');

const FoodCard = ({ item }) => {
  return (
    <div style={{ marginBottom: 40 }}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <CardTitle>
                {item.title} {item.price}
              </CardTitle>
              <CardText>{item.description}</CardText>
            </Col>
            <CardImg
              alt='...'
              src='https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png'
              style={{ width: 130, height: 80 }}
            />
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

FoodCard.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(FoodCard);
