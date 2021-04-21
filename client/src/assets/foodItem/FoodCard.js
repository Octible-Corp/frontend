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
import { Link } from 'react-router-dom';
import { primaryColor } from '../../primaryColor';

const steak = require('./logo.png');

const FoodCard = ({ item, index }) => {
  return (
    <div
      style={{
        marginBottom: 40,
        //maxWidth: 400,
        maxHeight: 100,
        // justifyContent: 'center',
        //alignItems: 'center',
      }}
    >
      <Card
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          shadowColor: '#636c73',
          shadowRadius: 10,
          shadowOpacity: 0.2,
          boxShadow: `1px 1px 1px #DCDCDC`,
          justifyContent: 'center',
        }}
      >
        <Link to={`/items/:${item.section_id}/food/:${item.item_id}`}>
          <div
            style={{
              //borderRadius: 100,
              justifyContent: 'center',
            }}
          >
            <CardBody style={{ justifyContent: 'center' }}>
              <Row>
                <Col>
                  <CardTitle
                    style={{
                      // position: 'absolute',
                      // top: -20,
                      // left: 10,
                      marginTop: -15,
                      width: '90%',
                      textAlign: 'left',
                      fontFamily: 'Helvetica',
                      fontSize: '100%',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    {item.title}
                    <p1
                      style={{
                        fontFamily: 'Helvetica',
                        fontSize: '100%',
                        fontWeight: 'bold',
                      }}
                    >
                      {' '}
                      {item.price}
                    </p1>
                  </CardTitle>

                  <CardText
                    style={{
                      marginTop: -15,
                      width: '90%',
                      textAlign: 'left',
                      fontFamily: 'Helvetica',
                      fontSize: '90%',
                      color: 'grey',
                    }}
                  >
                    {item.description}
                  </CardText>
                </Col>
                {item.item_photos ? null : null}
                <CardImg
                  alt='...'
                  src='https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png'
                  style={{ width: 130, height: 80, borderRadius: 15 }}
                />
              </Row>
            </CardBody>
          </div>
        </Link>
      </Card>
    </div>
  );
};

FoodCard.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(FoodCard);
