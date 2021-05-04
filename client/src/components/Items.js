import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from './FoodCard';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

import { buttonColor, primaryColor } from '../primaryColor';

const Landing = ({ restaurant, sections, dba }) => {
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
      <div style={{ backgroundColor: dba.background_color, height: '100vh' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'inherit',
          }}
        >
          <h1
            style={{
              marginTop: 30,
              textTransform: 'capitalize',
              fontFamily: 'helvetica',
              fontWeight: 'bold',
              color: dba.section_title_color,
              marginLeft: 35,
              fontSize: 40,
            }}
          >
            {name}
          </h1>
        </div>

        <div
          style={{
            backgroundColor: dba.background_color,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {items.map((item, index) => (
            <>
              <div
                style={{ height: 10, backgroundColor: dba.background_color }}
              />
              <FoodCard item={item} key={index}></FoodCard>
            </>
          ))}
        </div>
        <div
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            marginBottom: 0,
            position: 'fixed',
            backgroundColor: dba.footer_color,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            height: 60,
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
                color: dba.footer_text_color,
                alignSelf: 'center',
              }}
              class='fa fa-home fa-3x'
              aria-hidden='true'
            />
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  sections: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
  dba: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
  dba: state.menus.dba,
});

export default connect(mapStateToProps, null)(Landing);
