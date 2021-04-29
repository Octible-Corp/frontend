import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from './FoodCard';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import back2 from '../assets/img/LeftArrow/LA2.png';
import { buttonColor, primaryColor } from '../primaryColor';

const Landing = ({ restaurant, sections }) => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const { section_id } = useParams();
  useEffect(() => {
    const section = section_id.substring(1);
    let placeholder = restaurant.items.filter(
      (item) => item.section_id === section
    );
    let raw_section_name = sections.find((sec) => sec.section_id === section);
    setName(raw_section_name.section);
    setItems(placeholder);
  }, []);

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          marginTop: 10,
          flexDirection: 'column',
          width: 'inherit',
        }}
      >
        <h1
          style={{
            marginTop: 10,
            textTransform: 'capitalize',
            fontFamily: 'helvetica',
            color: primaryColor,
            marginLeft: 15,
            alignSelf: 'center',
          }}
        >
          {name}
        </h1>
      </div>

      <div
        style={{
          marginTop: 5,
          background: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {items.map((item, index) => (
          <FoodCard item={item} key={index}></FoodCard>
        ))}
      </div>
      <div
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          marginBottom: 0,
          position: 'fixed',
          backgroundColor: '#F8F8F8',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: 90,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            WebkitBoxShadow: 'none',
          }}
          onClick={() => history.goBack()}
        >
          <i
            style={{
              marginTop: 13,
              color: primaryColor,
              alignSelf: 'center',
            }}
            class='fa fa-home fa-3x'
            aria-hidden='true'
          />
        </Button>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  sections: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
});

export default connect(mapStateToProps, null)(Landing);
