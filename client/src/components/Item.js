import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './Footer';

const Item = ({ items, sections, dba }) => {
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
      <div style={{ backgroundColor: dba.background_color, height: 'auto' }}>
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
              marginLeft: 21,
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
                  marginLeft: 9,
                  color: dba.single_item_text_color,
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
                  color: dba.single_item_text_color,
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
                marginLeft: 24,
                marginTop: 3,
                marginRight: 25,
                color: dba.single_item_text_color2,
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
        <Footer destination={'back'} />
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  section: PropTypes.array.isRequired,
  dba: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.menus.menu.items,
  sections: state.menus.menu.sections,
  dba: state.menus.dba,
});

export default connect(mapStateToProps, null)(Item);
