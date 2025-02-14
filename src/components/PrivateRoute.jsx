/* eslint-disable no-unused-vars */

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ publicPage = false }) => {

    const { user } = useSelector((state) => state.auth);
    
    if(publicPage) {
        // If It Is A Public Page And The User Exists Navigate The User To The Profile Page
        // Otherwise Using Outlet Which Will Render The Child Components
        // For Eg.=> The Login Page Is A Public Page And If The User Is Being Authenticated
        // The Profile Page Is Shown If Not Authenticated Then Show The Login Page Itself Since It Is There As A Child Component Of The Private Route Component
        return (user ? <Navigate to="/" /> : <Outlet />);
    }

    return ( user ? <Outlet /> : <Navigate to="/login" />);
};

export default PrivateRoute;