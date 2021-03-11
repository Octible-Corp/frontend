import React, { Fragment, useEffect, useState } from 'react';
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
import { Link, useParams } from 'react-router-dom';
import { Dimensions } from 'react';

const Landing = ({ restaurant, sections }) => {
  const [items, setItems] = useState([]);
  const { section_id } = useParams();
  useEffect(() => {
    const section = section_id.substring(1);
    let placeholder = [];
    restaurant.items.map((item) => {
      if (item.section_id === section) {
        placeholder.push(item);
      }
    });
    setItems(placeholder);
  }, []);
  return (
    <body>
      <div style={{ backgroundColor: 'red' }}>
        <Button onClick={() => console.log(items)}>
          <h1>Item Page</h1>
        </Button>
      </div>
    </body>
  );
};

Landing.propTypes = {
  sections: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.menus.menu2,
  sections: state.menus.menu.sections,
});

export default connect(mapStateToProps, null)(Landing);
