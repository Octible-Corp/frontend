import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Modal, Row } from 'reactstrap';

const Footer = ({ dba, sections, dba_id, destination, active_section_id }) => {
  const [menuModal, setMenuModal] = useState(false);
  return (
    <Fragment>
      <div
        style={{
          bottom: 0,
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => setMenuModal(true)}
          style={{
            WebkitBoxShadow: 'none',
            backgroundColor: dba.footer_color1,
            borderColor: dba.footer_color1,
            position: 'fixed',
            height: 70,
            width: 70,
            borderRadius: 40,
            bottom: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `.3px .3px 5px grey`,
          }}
        >
          <svg
            id='Drop_Menu'
            data-name='Drop Menu'
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='48'
            viewBox='0 0 48 37'
          >
            <rect
              id='Rectangle_20'
              data-name='Rectangle 20'
              width='48'
              height='7'
              rx='3.5'
              fill={dba.footer_color2}
            />
            <rect
              id='Rectangle_21'
              data-name='Rectangle 21'
              width='48'
              height='7'
              rx='3.5'
              transform='translate(0 15)'
              fill={dba.footer_color2}
            />
            <rect
              id='Rectangle_22'
              data-name='Rectangle 22'
              width='48'
              height='7'
              rx='3.5'
              transform='translate(0 30)'
              fill={dba.footer_color2}
            />
          </svg>
        </Button>
      </div>
      <Modal isOpen={menuModal} toggle={() => setMenuModal(false)}>
        <div>
          <Col
            style={{
              bottom: 40,
              position: 'fixed',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {sections.map((sec) => (
              <Link to={`/items/:${sec.section_id}`}>
                <Button
                  style={{
                    borderRadius: '30px',
                    marginTop: 5,
                    width: 200,
                    height: '43px',
                    textAlign: 'center',
                    marginBottom: 10,
                    backgroundColor: dba.footer_color1,
                    borderColor: dba.footer_color1,
                    left: -4,
                  }}
                  onClick={() => setMenuModal(false)}
                  placeholder='(Appetisers, entree, drinks, etc)'
                  type='button'
                >
                  <p
                    style={{
                      fontFamily: 'Helvetica',
                      color: dba.footer_color2,
                      fontSize: '100%',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}
                  >
                    {sec.section}
                  </p>
                </Button>
              </Link>
            ))}
            <Link
              style={{
                alignSelf: 'flex-start',
                marginLeft: '13%',
                marginTop: '5%',
              }}
              to={
                destination === 'home'
                  ? `/:${dba_id}`
                  : `/items/:${active_section_id}`
              }
            >
              <Button
                onClick={() => setMenuModal(true)}
                style={{
                  WebkitBoxShadow: 'none',
                  backgroundColor: dba.footer_color2,
                  borderColor: dba.footer_color2,
                  height: 50,
                  width: 50,
                  borderRadius: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  boxShadow: `.3px .3px 5px grey`,
                }}
              >
                <i
                  style={{
                    color: dba.footer_color1,
                    alignSelf: 'center',
                  }}
                  class='ni ni-bold-left ni-lg'
                />
              </Button>
            </Link>
          </Col>
        </div>
      </Modal>
    </Fragment>
  );
};

Footer.propTypes = {
  dba: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  dba_id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  active_section_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  sections: state.menus.menu.sections,
  dba_id: state.menus.menu.dba_id,
  dba: state.menus.dba,
  active_section_id: state.menus.active_section_id,
});

export default connect(mapStateToProps, null)(Footer);
