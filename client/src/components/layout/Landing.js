import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MiniBubble from '../../assets/MiniBubble/MiniBubble';
import MenuBubble from '../../assets/MenuBubble/MenuBubble';
import {
  Card,
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
  Row,
  Col,
  Modal,
} from 'reactstrap';
import { Image } from 'react-bootstrap';
import { Dimensions } from 'react';

const Landing = ({ restaurant }) => {
  return (
    <body>
      <div
        id='Octible-app'
        style={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          flexGrow: 1,
          position: 'relative',
          alignItems: 'center',
          overflow: 'auto',
          marginRight: 0,
          marginBottom: 0,
        }}
      >
        <Fragment>
          <Image
            style={{
              maxWidth: '100%',
              zIndex: 0,
            }}
            src={restaurant.background_photo}
          />
          <Image
            style={{
              height: 100,
              width: 100,
              zindex: 10,
              borderRadius: 100 / 2,
              position: 'relative',
              bottom: 40,
              //left: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2.5px solid blue',
              borderWidth: 3,
            }}
            src={restaurant.main_photo}
          ></Image>
        </Fragment>
        <p1
          style={{
            position: 'relative',
            bottom: 30,
            fontSize: '350%',
          }}
        >
          {restaurant.restaurant}
        </p1>
        <Row style={{ position: 'relative', bottom: 20, marginBottom: -10 }}>
          <MiniBubble text={'website'}></MiniBubble>
          <MiniBubble text={'PDF Menu'}></MiniBubble>
        </Row>
        <p2 style={{ marginBottom: 10 }}>Digital Menu</p2>

        <MenuBubble text={'Appetizers'}></MenuBubble>

        <MenuBubble text={'Entreés'}></MenuBubble>
        <MenuBubble text={'Sides'}></MenuBubble>
        <MenuBubble text={'Desserts'}></MenuBubble>
        <MenuBubble text={'Drinks'}></MenuBubble>

        <Card style={{ backgroundColor: 'red' }}></Card>
      </div>
    </body>
  );
};

Landing.propTypes = {};

const mapStateToProps = (state) => ({
  restaurant: state.menus.menu,
});

export default connect(mapStateToProps, null)(Landing);
