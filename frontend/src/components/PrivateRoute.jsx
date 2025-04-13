//relying on AppContext
//understand the app context 

///wrapper component  that allows only to acess the page if the user is logged in 

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

//protect the roots that require login
const PrivateRoute = ({ children, roleRequired }) => {
    const { user } = useContext(AuthContext); //allows to access the status of login token globally 
   
    if (!user) {
      return <Navigate to="/login" />;
    }
     // Convert both to strings to compare safely
  if (roleRequired && user.role !== roleRequired) {
    return (
      <div className="container mt-5">
        <h2 className="text-danger">Access Denied</h2>
        <p>You do not have permission to view this page!</p>
      </div>
    );
    }
    return children;
  };

  export default PrivateRoute;