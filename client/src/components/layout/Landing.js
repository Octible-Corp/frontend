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
    <Fragment
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Image
        style={{
          maxHeight: 200,
          maxWidth: '70%',
          zIndex: 0,
          //position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        src={restaurant.background_photo}
      />
      <Image
        style={{
          height: 100,
          width: 100,
          borderRadius: 100 / 2,
          //position: 'relative',
          //bottom: 40,
          //left: '40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2.5px solid blue',
          borderWidth: 3,
        }}
        src={restaurant.main_photo}
      ></Image>

      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '350%',
        }}
      >
        {restaurant.restaurant}
      </h1>
      <Row>
        <MiniBubble text={'website'}></MiniBubble>
        <MiniBubble text={'PDF Menu'}></MiniBubble>
      </Row>
      <p1 style={{ marginLeft: '55px' }}>Digital Menu</p1>

      <Row
        //key={sect.section_id}
        style={{ alignSelf: 'center', marginLeft: '5px' }}
      >
        <MenuBubble text={'Appetizers'}></MenuBubble>
        <MenuBubble text={'Entreés'}></MenuBubble>
        <MenuBubble text={'Sides'}></MenuBubble>
        <MenuBubble text={'Desserts'}></MenuBubble>
        <MenuBubble text={'Drinks'}></MenuBubble>
      </Row>

      <Card style={{ backgroundColor: 'red' }}></Card>
    </Fragment>
  );
};

Landing.propTypes = {};

const mapStateToProps = (state) => ({
  restaurant: state.menus.menu,
});

export default connect(mapStateToProps, null)(Landing);
