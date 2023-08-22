
import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

    ///Private route for make our websites any page private( Where without login any user can't go).
const PrivateRoute=()=>{
    const auth= localStorage.getItem('user');
    const token = localStorage.getItem('usertoken');
    // if (isJwtTokenExpired(token).exp < Date.now() / 1000) {
    //     // next(action);
    //     localStorage.clear();
    //   }
    return auth&&token?<Outlet />:<Navigate to="/signin" />
}

export default PrivateRoute;