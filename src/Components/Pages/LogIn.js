import { Link } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LogIn() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPass, setShowPass] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        // try {
        //     const response = await fetch('http://3.227.133.217:8022/log-in', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });

        //     if (response.ok) {
        //         console.log('Log In successful');
        //     } else {
        //         console.error('Log In failed');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }

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
                >
                    <div className="flex flex-col justify-center gap-2">
                        <div className="text-theme-dark-red text-center py-2 text-base font-semibold font-merriweather">
                            Don't have an account yet?
                            <Link to="/register" className="px-2">
                                <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                    Register
                                </button>
                            </Link>
                        </div>
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
                                        <EyeIcon className="h-6" />
                                    ) : (
                                        <EyeSlashIcon className="h-6" />
                                    )}
                                </div>
                            </div>
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
