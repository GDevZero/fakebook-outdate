import React, { useState, useEffect } from 'react';
import * as allRoutes from './index';
import rolesConfig from '../../config/roles';
import { Route, useNavigate, Navigate } from 'react-router-dom';

function PrivateRoute(props) {
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let role = props.role;
    if (role) {
      setAllowedRoutes(rolesConfig[role].routes);
    } else {
      navigate('/login');
    }
  }, [props.role, navigate]);

  return (
    <>
      {allowedRoutes.map(route => (
        <Route
          exact
          path={route.url}
          element={React.createElement(allRoutes[route.component])}
          key={route.url}
        />
      ))}
      {props.role === 'guest' ? <Navigate to="/login" /> : null}
    </>
  );
}

export default PrivateRoute;
