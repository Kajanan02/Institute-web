import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getAccessToken} from "./Authentication";

const PrivateRoute = () => {
    const auth = getAccessToken()// determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;