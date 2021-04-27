import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../foodItem/FoodCard';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import back2 from '../../assets/img/LeftArrow/LA2.png';

const Landing = ({ restaurant, sections }) => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const { section_id } = useParams();
  useEffect(() => {
    const section = section_id.substring(1);
    let placeholder = restaurant.items.filter(
      (item) => item.section_id === section
    );
    setItems(placeholder);
  }, []);

  return (
    <body>
      <div
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: 100,
          background: 'white',
          textAlign: 'left',
          marginLeft: 20,
          zIndex: 5,
        }}
      >
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
            //float: 'left',
            //marginRight: 68,

            width: 300,
          }}
        >
          <Row>
            <img
              src={back2}
              style={{
                marginRight: 20,
                alignText: 'left',
                alignSelf: 'left',
              }}
            ></img>
            <h1
              style={{
                position: 'fixed',
                left: 80,
                top: 16,
                color: '#22CDEF',
              }}
            >
              GO BACK
            </h1>
          </Row>
        </Button>
      </div>
      <div
        color='info'
        style={{
          padding: 20,
          top: 0,
          width: '100%',
          height: 80,
          background: 'white',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <h2 style={{ height: 100 }}></h2>
        {/* <Link to={'/'}>
          <Button
            onClick={() => console.log(items)}
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              shadowColor: '#636c73',
              shadowRadius: 0,
              shadowOpacity: 0.0,
              boxShadow: `0px 0px 0px #DCDCDC`,
              marginBottom: 10,
              marginTop: -20,
              //float: 'left',
              //marginRight: 68,
              width: 300,
              height: 100,
            }}
          >
            <Row>
              <img
                src={back2}
                style={{ marginRight: 20, alignSelf: 'flex-start' }}
              ></img>
              <h1
                style={{
                  position: 'fixed',
                  left: 80,
                  top: 16,
                  color: '#22CDEF',
                }}
              >
                GO BACK
              </h1>
            </Row>
          </Button> 
        </Link>*/}
        {items.map((item, index) => (
          <FoodCard item={item} key={index}></FoodCard>
        ))}

        <h2 style={{ height: 100 }}></h2>
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
  placeholder: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  restaurant: state.menus.menu,
  sections: state.menus.menu.sections,
});

export default connect(mapStateToProps, null)(Landing);
