import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage.js";

const PrivateRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [canReturn, setCanReturn] = useState(false);

    useEffect(() => {
        try {
            fetch('/api/get_current_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response?.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    throw new Error('Server returned ' + response?.status);
                }
            }).then((user) => {
                setIsLoggedIn(user.authenticated);
                setCanReturn(true);
            })
        } catch (error) {
            console.error('Error:', error);
        }
    });

    return canReturn ? (isLoggedIn ? <Outlet /> : <ErrorPage />) : (<div>Loading...</div>);
};

export default PrivateRoute;
