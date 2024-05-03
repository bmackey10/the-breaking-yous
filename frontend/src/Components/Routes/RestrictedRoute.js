import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const RestrictedRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        })
    }, []);

    return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default RestrictedRoutes;