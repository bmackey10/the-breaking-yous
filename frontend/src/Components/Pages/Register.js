import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";


export default function Register() {
    const [passError, setPassError] = useState({ "error": false, "errorMessage": "" });
    const [userError, setUserError] = useState({ "error": false, "errorMessage": "" });
    const [firstError, setFirstError] = useState({ "error": false, "errorMessage": "" });
    const [lastError, setLastError] = useState({ "error": false, "errorMessage": "" });
    const [birthError, setBirthError] = useState({ "error": false, "errorMessage": "" });
    const [phoneError, setPhoneError] = useState({ "error": false, "errorMessage": "" });
    const [emailError, setEmailError] = useState({ "error": false, "errorMessage": "" });
    const [existUser, setExistUser] = useState([])
    const [existEmail, setExistEmail] = useState([])
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

    useEffect(() => {
        fetch('/existing_users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((users) => {
            setExistUser([...users.usernames]);
            setExistEmail([...users.emails]);
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserError({ ...userError, "error": false, "errorMessage": "" });
        setPassError({ ...passError, "error": false, "errorMessage": "" });
        setFirstError({ ...firstError, "error": false, "errorMessage": "" });
        setLastError({ ...lastError, "error": false, "errorMessage": "" });
        setBirthError({ ...birthError, "error": false, "errorMessage": "" });
        setPhoneError({ ...phoneError, "error": false, "errorMessage": "" });
        setEmailError({ ...emailError, "error": false, "errorMessage": "" });

        if (formData.username === "") {
            setUserError({ ...userError, "error": true, "errorMessage": "Please enter a username." });
            return;
        }

        if (formData.password === "") {
            setPassError({ ...passError, "error": true, "errorMessage": "Please enter a password." });
            return;
        }

        if (formData.firstName === "") {
            setFirstError({ ...firstError, "error": true, "errorMessage": "Please enter a first name." });
            return;
        }

        if (formData.lastName === "") {
            setLastError({ ...lastError, "error": true, "errorMessage": "Please enter a last name." });
            return;
        }

        if (formData.birthDate === "") {
            setBirthError({ ...birthError, "error": true, "errorMessage": "Please enter a birth date." });
            return;
        }

        if (formData.phoneNumber === "") {
            setPhoneError({ ...phoneError, "error": true, "errorMessage": "Please enter a phone number." });
            return;
        }

        if (formData.email === "") {
            setEmailError({ ...emailError, "error": true, "errorMessage": "Please enter an email." });
            return;
        }

        if (existUser.includes(formData.username) || existEmail.includes(formData.email)) {
            if (existUser.includes(formData.username)) {
                setUserError({ ...userError, "error": true, "errorMessage": "This username is already in use. Please choose a new username." });
                return;
            }

            if (existEmail.includes(formData.email)) {
                setEmailError({ ...emailError, "error": true, "errorMessage": "This email is already in use. Please choose a new email." });
                return;
            }

        }
        if (new RegExp(/^[A-Za-z][A-Za-z0-9]+$/).test(formData.username) === false) {
            setUserError({ ...userError, "error": true, "errorMessage": "Username must begin with a character." });
            return;
        }
        if (new RegExp(/^[A-Za-x0-9#$@!%&*?]{6,20}$/).test(formData.password) === false) {
            setPassError({ ...passError, "error": true, "errorMessage": "Password must be between 6-20 characters." });
            return;
        }
        if (/^\d+$/.test(formData.phoneNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", "")) === false) {
            setPhoneError({ ...phoneError, "error": true, "errorMessage": "Phone number cannot contain non-numbers." })
            return;
        }
        if (formData.phoneNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", "").length !== 10) {
            setPhoneError({ ...phoneError, "error": true, "errorMessage": "Invalid phone number." })
            return;
        }
        if (new RegExp(/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]$/).test(formData.birthDate) === false) {
            setBirthError({ ...birthError, "error": true, "errorMessage": "Birth date must be in MM/DD/YYYY form." });
            return;
        }
        if (new RegExp(/^[A-Za-z][A-Za-z]+$/).test(formData.firstName) === false) {
            setFirstError({ ...firstError, "error": true, "errorMessage": "First name can only include characters." });
            return;
        }
        if (new RegExp(/^[A-Za-z][A-Za-z]+$/).test(formData.lastName) === false) {
            setLastError({ ...lastError, "error": true, "errorMessage": "Last name can only include characters." });
            return;
        }

        try {
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, phoneNumber: formData.phoneNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", "") }),
            }).then((response) => {
                if (response.ok) {
                    console.log("User Registered");
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    return "error";
                }
            }).then((data) => {
                if (data != "error") {
                    setUserError({ ...userError, "error": false, "errorMessage": "" });
                    setPassError({ ...passError, "error": false, "errorMessage": "" });
                    setFirstError({ ...firstError, "error": false, "errorMessage": "" });
                    setLastError({ ...lastError, "error": false, "errorMessage": "" });
                    setBirthError({ ...birthError, "error": false, "errorMessage": "" });
                    setPhoneError({ ...phoneError, "error": false, "errorMessage": "" });
                    setEmailError({ ...emailError, "error": false, "errorMessage": "" });
                }
            });
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
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
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
                                {userError.error ? (<div className='flex justify-center text-xs text-red-600'>{userError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
                                            type="text"
                                            name="password"
                                            id="password"
                                            autoComplete="new-password"
                                            className="block w-full pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={formData.password}
                                        />
                                    </div>
                                </div>
                                {passError.error ? (<div className='flex justify-center text-xs text-red-600'>{passError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
                                {firstError.error ? (<div className='flex justify-center text-xs text-red-600'>{firstError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
                                {lastError.error ? (<div className='flex justify-center text-xs text-red-600'>{lastError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
                                {birthError.error ? (<div className='flex justify-center text-xs text-red-600'>{birthError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
                                {phoneError.error ? (<div className='flex justify-center text-xs text-red-600'>{phoneError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
                                {emailError.error ? (<div className='flex justify-center text-xs text-red-600'>{emailError.errorMessage}</div>) : (<div className='flex justify-center text-transparent text-xs'>.</div>)}
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
