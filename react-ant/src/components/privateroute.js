
import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
    ///Private route for make our websites any page private( Where without login any user can't go).
const PrivateRoute=()=>{
    const auth= localStorage.getItem('user');
    return auth?<Outlet />:<Navigate to="/signin" />
}

export default PrivateRoute;