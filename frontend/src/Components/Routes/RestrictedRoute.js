import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const RestrictedRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            fetch('/api/get_current_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    return "error";
                }
            }).then((current_user) => {
                setIsLoggedIn(current_user.authenticated);
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }, []);

    return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default RestrictedRoutes;