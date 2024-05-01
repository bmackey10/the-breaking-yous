import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LogIn() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPass, setShowPass] = useState(1);
    const [passError, setPassError] = useState({ "error": false, "errorMessage": "" });
    const [userError, setUserError] = useState({ "error": false, "errorMessage": "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.username == "" || formData.password == "") {
            if (formData.username == "") {
                setUserError({ ...userError, "error": true, "errorMessage": "Please enter your username." });
            }

            if (formData.password == "") {
                setPassError({ ...passError, "error": true, "errorMessage": "Please enter your password." });
            }

            return;
        }

        try {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then((response) => {
                if (response.ok) {
                    console.log("User Logged In");
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    setPassError({ ...passError, "error": true, "errorMessage": "Incorrect username or password." });
                    setUserError({ ...userError, "error": false, "errorMessage": "" });
                    return "error";
                }
            }).then((data) => {
                if (data != "error") {
                    fetch('/get_current_user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then((response) => {
                        return response.json();
                    });
                    setPassError({ ...passError, "error": false, "errorMessage": "" });
                    setUserError({ ...userError, "error": false, "errorMessage": "" });
                    navigate("/");
                }
            });
        } catch (error) {
            console.error('Error:', error);
            setPassError({ ...passError, "error": true, "errorMessage": "Could not log in user with credentials." });
            setUserError({ ...userError, "error": false, "errorMessage": "" });
        }

        setFormData({
            username: "",
            password: "",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight font-merriweather text-theme-dark-red">
                        Log In
                    </h1>
                </div>
            </header>
            <main>
                <form
                    className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12"
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            handleSubmit(e);
                    }}
                >
                    <div className="flex flex-col justify-center gap-1">
                        <div className="text-theme-dark-red text-center py-2 text-base font-semibold font-merriweather">
                            Don't have an account yet?
                            <Link to="/register" className="px-2">
                                <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                    Register
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="block pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        value={formData.username}
                                    />
                                </div>
                            </div>
                            {userError.error ? (<div className='flex justify-center text-xs text-red-600'>{userError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-center">
                                <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                    <input
                                        type={showPass ? "password" : "text"}
                                        name="password"
                                        id="password"
                                        autoComplete="username"
                                        className="block pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6 sm:max-w-md"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={formData.password}
                                    />
                                    <div
                                        className="relative p-2"
                                        onClick={handleClickShowPass}
                                    >
                                        {showPass ? (
                                            <EyeIcon className="h-5" />
                                        ) : (
                                            <EyeSlashIcon className="h-5" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {passError.error ? (<div className='flex justify-center text-xs text-red-600'>{passError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
                        </div>
                        <div className="flex justify-center py-4">
                            <button
                                type="submit"
                                className="flex-grow justify-center sm:max-w-md border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
