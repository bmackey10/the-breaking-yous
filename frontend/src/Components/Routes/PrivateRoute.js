import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage.js";

const PrivateRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [canReturn, setCanReturn] = useState(false);

    useEffect(() => {
        fetch('/get_current_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((current_user) => {
            setIsLoggedIn(current_user.authenticated);
            setCanReturn(true);
        })
    });



    return canReturn ? (isLoggedIn ? <Outlet /> : <ErrorPage />) : (<div>Loading...</div>);
};

export default PrivateRoute;
