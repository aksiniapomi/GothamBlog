//relying on AppContext
//understand the app context 

///wrapper component  that allows only to acess the page if the user is logged in 

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

//protect the roots that require login
const PrivateRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext); //allows to access the status of login token globally 
    return authToken ? children : <Navigate to="/" />; //if the user is logged in, show the child page; if not redirect to the login page 
  };
  
  export default PrivateRoute;