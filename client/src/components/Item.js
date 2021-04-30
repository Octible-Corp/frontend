import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import back2 from '../assets/img/LeftArrow/LA2.png';
import { primaryColor } from '../primaryColor';

const Item = ({ items, sections }) => {
  const history = useHistory();
  const { item_id } = useParams();
  const [item, setItem] = useState({});
  const [name, setName] = useState('');
  useEffect(() => {
    let found_item = items.find((i) => i.item_id === item_id.substring(1));
    let section = sections.find((s) => s.section_id === found_item.section_id);
    setName(section.section);
    setItem(found_item);
  }, []);

  return (
    <Fragment>
      <div style={{}}>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            flexDirection: 'column',
            width: 'inherit',
          }}
        >
          <h1
            style={{
              marginTop: 10,
              textTransform: 'capitalize',
              fontFamily: 'helvetica',
              fontWeight: 'bold',
              color: primaryColor,
              marginLeft: 35,
              fontSize: 40,
            }}
          >
            {name}
          </h1>
        </div>

        <Col>
          <Row style={{ marginTop: 15 }}>
            <Col xs='8'>
              <p
                style={{
                  textAlign: 'left',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  marginLeft: 21,
                  color: 'black',
                  fontSize: 14,
                }}
              >
                {item.title}
              </p>
            </Col>
            <Col xs='4'>
              <p
                style={{
                  textAlign: 'right',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  marginRight: 15,
                  color: 'black',
                  fontSize: 14,
                }}
              >
                {item.price}
              </p>
            </Col>
          </Row>
          <Row>
            <p
              style={{
                alignText: 'right',
                marginLeft: 35,
                marginTop: 3,
                marginRight: 25,
              }}
            >
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
          <div style={{ height: 100 }} />
        </Col>
      </div>
      <div>
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
                color: primaryColor,
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

Item.propTypes = {
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  section: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.menus.menu.items,
  sections: state.menus.menu.sections,
});

export default connect(mapStateToProps, null)(Item);
