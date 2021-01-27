import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getMenus } from '../../actions/post';
import AddMenuCard from './AddMenuCard';
import MenuCard from './MenuCard';
import { Row } from 'reactstrap';
import { primaryColor } from '../../primaryColor';
const AddScreen = ({ auth: { user }, getMenus, menus }) => {
  useEffect(() => {
    getMenus(user._id);
  }, []);

  if (user.step_tracker === '1') {
    return <Redirect to="/step_2" />;
  }

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: primaryColor,
          paddingBottom: '400px',
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        <Row style={{ justifyContent: 'center', marginTop: '80px' }}>
          <p
            style={{
              fontFamily: 'helvetica',
              color: '#F4F5F7',
              textTransform: 'capitalize',
              fontSize: '50px',
              fontWeight: '400'
            }}
          >
            Your Menus
          </p>
        </Row>
        <Row>
          {menus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
          <AddMenuCard />
        </Row>
      </div>
    </Fragment>
  );
};

AddScreen.propTypes = {
  getMenus: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  menus: state.post.menus
});

export default connect(mapStateToProps, {
  getMenus
})(AddScreen);
