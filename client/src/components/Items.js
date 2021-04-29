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
          height: 'auto',
        }}
      >
        <h1
          style={{
            marginTop: 10,
            textTransform: 'capitalize',
            fontFamily: 'helvetica',
            color: primaryColor,
            alignSelf: 'center',
          }}
        >
          {name}
        </h1>
      </div>

      <div
        style={{
          marginTop: 8,
          background: 'white',
          textAlign: 'center',
        }}
      >
        {items.map((item, index) => (
          <FoodCard item={item} key={index}></FoodCard>
        ))}
      </div>
      <div style={{ height: 20, backgroundColor: 'red' }}></div>
      {/**  <div
        style={{
          position: 'fixed',
          padding: 20,
          bottom: -1,
          width: '100%',
          backgroundColor: '#F8F8F8',
          height: 90,
          textAlign: 'center',
        }}
      >
        <i
          style={{ width: 200, height: 200, color: primaryColor }}
          class='fa fa-home fa-3x'
          aria-hidden='true'
        />
      </div>*/}
    </Fragment>
  );
};
// backgroundColor: '#F8F8F8',
Landing.propTypes = {
  sections: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
});

export default connect(mapStateToProps, null)(Landing);

/*
 <Button
          onClick={() => {
            history.goBack();
          }}
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            shadowColor: '#636c73',
            shadowRadius: 0,
            shadowOpacity: 0.0,
            boxShadow: `0px 0px 0px #DCDCDC`,
            marginBottom: 10,
            marginTop: 0,
            width: 'inherit',
          }}
        >
          <Row
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h1
              style={{
                textTransform: 'capitalize',
                fontFamily: 'helvetica',
                color: primaryColor,
                alignSelf: 'center',
              }}
            >
              {name}
            </h1>
          </Row>
        </Button>
*/
