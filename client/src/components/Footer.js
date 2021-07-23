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
          <i className="fas fa-bars fa-lg"
          style={{
            color: "white"
          }}
          ></i>
        </Button>
      </div>
      <Modal isOpen={menuModal} toggle={() => setMenuModal(false)}>
        <Col
          style={{
            bottom: 40,
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'center',
          }}
        >
          {sections.map((sec) => (
            <Link to={`/items/:${sec.section_id}`}>
              <Button
                style={{
                  justifyContent: 'center',
                  borderRadius: '30px',
                  marginTop: 5,
                  width: 200,
                  height: '43px',
                  position: "relative",
                  textAlign: 'center',
                  marginBottom: 10,
                  backgroundColor: dba.footer_color1,
                  borderColor: dba.footer_color1,
                  alignSelf: 'center',
                }}
                onClick={() => setMenuModal(false)}
                placeholder='(Appetisers, entree, drinks, etc)'
                type='button'
              >
                <p
                  style={{
                    fontFamily: 'Lato',
                    color: dba.footer_color2,
                    fontSize: '85%',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    position: 'relative',
                    bottom: '8px',
                    alignSelf: 'center',
                  }}
                >
                  {sec.section}
                </p>
              </Button>
            </Link>
          ))}
          <div style={{
            display: "flex",
            flexDirection: "row",
            height: "70px",
            width: "100%",
          }}> 
          <div
              onClick={() => setMenuModal(true)}
              style={{
                WebkitBoxShadow: 'none',
                backgroundColor: dba.footer_color2,
                borderColor: dba.footer_color2,
                height: 50,
                width: 50,
                borderRadius: 50,
                display: 'flex',
                marginTop: "20px",
                marginLeft: "80px",  
                marginRight: "70px",
                justifyContent: 'center',
                boxShadow: `.3px .3px 5px grey`,
              }} >
                <Link
            style={{
              alignSelf: 'center',
              width:"auto"
            }}
            to={
              destination === 'home'
                ? `/:${dba_id}`
                : `/items/:${active_section_id}`
            }
          >
              <i
                style={{
                  color: dba.footer_color1,
                  alignSelf: 'center',
                  width: "inherit",
                  height: "inherit",
                  marginTop: "10px"
                }}
                className='ni ni-bold-left ni-lg'
              />
            </Link>
          </div>
          <div
              onClick={() => setMenuModal(true)}
              style={{
                WebkitBoxShadow: 'none',
                backgroundColor: dba.footer_color2,
                borderColor: dba.footer_color2,
                height: 50,
                width: 50,
                borderRadius: 50,
                marginLeft: "25px",
                marginTop: "20px",
                display: 'flex',
                justifyContent: 'center',
                boxShadow: `.3px .3px 5px grey`,
              }}
            >
          <Link
            style={{
              alignSelf: 'center',

            }}
            to={
            `/:${dba_id}`
            }>
              <i
                style={{
                  color: dba.footer_color1,
                  alignSelf: 'center',
                
                }}
                className='fa fa-home'
              />
          </Link>
            </div>
          </div>      
        </Col>
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
