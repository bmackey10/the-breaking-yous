import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";


export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        email: "",
        country: "United States",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then((response) => {
                console.log("User Registered");
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                }
            })
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset form data after submission
        setFormData({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            birthDate: "",
            phoneNumber: "",
            email: "",
            country: "United States",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight font-merriweather text-theme-dark-red">
                        Register
                    </h1>
                </div>
            </header>
            <main>
                <form
                    className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3 sm:col-start-1">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-merriweather font-semibold leading-6 text-black"
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className="block w-full pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={formData.username}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-3 sm:col-start-1">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-merriweather font-semibold leading-6 text-black"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            className="block w-full pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={formData.password}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-merriweather font-semibold leading-6 text-black"
                                >
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon
                                        className="h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                    />
                                    <button
                                        type="button"
                                        className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-semibold font-merriweather leading-6 text-black"
                                >
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData.firstName}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-semibold font-merriweather leading-6 text-black"
                                >
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData.lastName}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="birth-date"
                                    className="block text-sm font-semibold font-merriweather leading-6 text-black"
                                >
                                    Birth Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="birthDate"
                                        id="birth-date"
                                        autoComplete="bday"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:text-sm sm:leading-6"
                                        placeholder="MM/DD/YYYY"
                                        onChange={handleChange}
                                        value={formData.birthDate}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3 sm:col-start-1">
                                <label
                                    htmlFor="phone-number"
                                    className="block text-sm font-semibold font-merriweather leading-6 text-black"
                                >
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        id="phone-number"
                                        autoComplete="tel"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData.phoneNumber}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold font-merriweather leading-6 text-black"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-semibold font-merriweather leading-6 text-black"
                                >
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData.country}
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <button
                            type="submit"
                            className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
