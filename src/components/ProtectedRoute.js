import React from 'react';
import { Redirect } from 'react-router-dom';


const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Redirect to="/" replace />;
  }

  return children;
};

export default ProtectedRoute