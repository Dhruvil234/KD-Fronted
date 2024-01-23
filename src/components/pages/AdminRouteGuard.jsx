import React from 'react';
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

const AdminRouteGuard = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin');

  if (isAdmin === 'true') {
    return element;
  } else {
    // Redirect to a 404 page or any other page for unauthorized access
    return <Navigate to="/error" />;
  }
};
    AdminRouteGuard.propTypes = {
        element:PropTypes.element.isRequired,
    };

export default AdminRouteGuard;