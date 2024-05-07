import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            }).then((current_user) => {
                setIsLoggedIn(current_user.authenticated);
            })
        } catch (error) {
            console.error('Error:', error);
        }

    });

    return (
        <div className="relative h-screen w-auto">
            <div className="bg-[url('../public/news_background.jpg')] bg-no-repeat bg-cover bg-center bg-scroll h-full"></div>
            <div className="absolute inset-0 h-full w-auto bg-white bg-opacity-50"></div>
            <div className="absolute inset-0">
                <div className="mx-auto max-w-7xl py-10 px-16 sm:py-18 sm:px-10 lg:py-20 lg:px-12">
                    <div className="border-0 shadow-xl rounded-lg bg-white">
                        <div className="p-8 grid grid-cols-1 sm:grid-cols-6 justify-items-center gap-4">
                            <div className="sm:col-span-6 text-2xl pb-6 text-center font-bold text-theme-navy-blue font-merriweather">
                                Welcome to The Breaking Yous!
                            </div>
                            <div className="sm:col-span-6 text-lg text-center font-semibold text-theme-dark-red font-merriweather">
                                We're here to help bring you the news you're
                                interested in every day. The news, but for you.
                            </div>
                            <div className="sm:col-span-4 sm:col-start-2 text-gray-500 font-merriweather text-center">
                                Articles will be delivered to your "For You"
                                page daily, and through the "Community" page,
                                you can share the news that you find interesting
                                with your friends and start a discussion.
                            </div>
                            {isLoggedIn && (<div className="sm:col-span-4 sm:col-start-2 pt-4 flex flex-row gap-4"><Link to="/for-you">
                                <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                    For You
                                </button>
                            </Link>
                                <Link to="/community">
                                    <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                        Community
                                    </button>
                                </Link></div>)}
                            {!isLoggedIn && (<div className="sm:col-span-4 sm:col-start-2 pt-4 flex flex-row gap-4"><Link to="/log-in">
                                <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                    Log In
                                </button>
                            </Link>
                                <Link to="/register">
                                    <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                        Register
                                    </button>
                                </Link></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
