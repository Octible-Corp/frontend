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
import { Link } from 'react-router-dom';
import { Dimensions } from 'react';

const Landing = ({ restaurant, sections }) => {
  console.log(sections);
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
            src={restaurant.logo_photo}
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
          <MiniBubble
            text={'website'}
            link={`${restaurant.website}`}
          ></MiniBubble>
          <MiniBubble text={'PDF Menu'} link={null}></MiniBubble>
        </Row>

        <p2 style={{ marginBottom: 10 }}>Digital Menu</p2>

        {sections.map((section) => (
          <Link to={`/items/:${section.section_id}`}>
            <MenuBubble text={`${section.section}`}></MenuBubble>
          </Link>
        ))}
        <div style={{ height: 200 }}></div>
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

Landing.propTypes = {
  sections: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.menus.menu2,
  sections: state.menus.menu2.sections,
});

export default connect(mapStateToProps, null)(Landing);
