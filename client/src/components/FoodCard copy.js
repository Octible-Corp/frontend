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

const FoodCard = ({ item, index }) => {
  return (
    <div
      style={{
        marginBottom: 30,
        // justifyContent: 'center',
        //alignItems: 'center',
      }}
    >
      <Link to={`/items/:${item.section_id}/food/:${item.item_id}`}>
        <Button
          color='secondary'
          type='button'
          style={{
            borderRadius: 10,
            width: '95%',
            justifyContent: 'center',
            minHeight: 120,
          }}
        >
          <Row>
            <Col>
              <CardTitle
                style={{
                  // position: 'absolute',
                  // top: -20,
                  // left: 10,

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
                  textTransform: 'capitalize',
                  lineHeight: 1.3,
                  color: 'grey',
                }}
              >
                {item.description}
              </CardText>
            </Col>
            {item.item_photos.length > 0 ? (
              <CardImg
                alt='...'
                src={`${item.item_photos[0]?.url}`}
                style={{
                  width: 130,
                  height: 80,
                  borderRadius: 15,
                  margin: 'auto',
                  marginRight: 10,
                }}
              />
            ) : null}
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
