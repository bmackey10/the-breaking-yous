import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Header () {
    return (
        <header className="bg-theme-pale-blue">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-8 lg:px-8">
                <Link to="/" className="font-semibold leading-6 text-white items-center justify-center">
                    <h1 className="text-6xl font-outline-1 font-eb-garamond">The Breaking Yous</h1>
                </Link>
            </nav>
        </header>
    )
}