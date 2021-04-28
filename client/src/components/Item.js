import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import back2 from '../assets/img/LeftArrow/LA2.png';
import { primaryColor } from '../primaryColor';

const Item = ({ items, index }) => {
  const history = useHistory();
  const { item_id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    let found_item = items.find((i) => i.item_id === item_id.substring(1));
    setItem(found_item);
  }, []);

  return (
    <body>
      <div
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: 70,
          background: 'white',
          textAlign: 'left',
          marginLeft: 20,
          zIndex: 5,
        }}
      >
        <Button
          onClick={() => history.goBack()}
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            shadowColor: '#636c73',
            shadowRadius: 0,
            shadowOpacity: 0.0,
            boxShadow: `0px 0px 0px #DCDCDC`,
            marginBottom: 10,
            marginTop: 0,
            //float: 'left',
            //marginRight: 68,

            width: 300,
          }}
        >
          <Row>
            <img
              src={back2}
              style={{
                marginLeft: 1,
                marginTop: 20,
                alignText: 'left',
                alignSelf: 'left',
                width: 20,
                height: 35,
              }}
            />

            <h1
              style={{
                position: 'fixed',
                left: 50,
                top: 22,
                textTransform: 'capitalize',
                fontFamily: 'helvetica',
                color: primaryColor,
              }}
            >
              Go Back
            </h1>
          </Row>
        </Button>
      </div>
      <div
        color='info'
        style={{
          paddingTop: 90,
          top: 0,
          width: '100%',

          background: 'white',
        }}
      >
        <Col>
          <Row style={{ marginTop: 15 }}>
            <Col>
              <p
                style={{
                  textAlign: 'left',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  marginLeft: 11,
                }}
              >
                {item.title}
              </p>
            </Col>
            <Col>
              <p
                style={{
                  textAlign: 'right',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  marginRight: 15,
                }}
              >
                {item.price}
              </p>
            </Col>
          </Row>
          <Row>
            <p style={{ alignText: 'right', marginLeft: 30, marginTop: -10 }}>
              {item.description}
            </p>
          </Row>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -20,
            }}
          >
            {item.item_photos?.map((it) => (
              <img
                style={{
                  borderRadius: 30,
                  marginTop: 30,
                  width: '85%',
                  height: 'auto',
                  alignSelf: 'center',
                }}
                src={it.url}
                class='img-fluid'
                alt='Responsive image'
              />
            ))}
          </Row>
        </Col>
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

Item.propTypes = {
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.menus.menu.items,
});

export default connect(mapStateToProps, null)(Item);
