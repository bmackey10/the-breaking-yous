import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Profile() {
    const { username } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCurrUser, setIsCurrUser] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [profile, setProfile] = useState({
        user_id: 0,
        first_name: "",
        last_name: "",
        followers: 0,
        following: [],
        articles: [],
        interests: [],
        posts: 0,
    });


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
            if (current_user.username && username === current_user.username) {
                setIsCurrUser(true);
            }
            fetch('/get_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username })
            }).then((response) => {
                return response.json();
            }).then((profile_info) => {
                setProfile({ ...profile_info });
            })
        })
    }, [username]);


    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };


    const handleUsernameChange = (e) => {
        setUsernameInput(e.target.value);
    };

    const resetSearch = () => {
        setFoundUsers([]);
        setNameInput("");
        setUsernameInput("");
    };


    const handleNameSubmit = (e) => {
        e.preventDefault();


        const name_split = nameInput.split(/[ ]+/);

        if (name_split) {
            fetch('/get_user_by_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currUser: username, firstName: name_split[0], lastName: (name_split[1] || "") })
            }).then((response) => {
                return response.json();
            }).then((user) => {
                setFoundUsers(user.users);
                setNameInput("");
                setUsernameInput("");
            })
        }
    };

    const handleUnfollow = (e) => {
        const new_profile = { ...profile }
        const index = new_profile.following.indexOf(e.target.value);
        delete new_profile.following.splice(index);
        setProfile({ ...new_profile })

        fetch('/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ following: e.target.value, follower: profile.user_id })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.message)
        })
    };

    const handleFollow = (e) => {
        const new_profile = { ...profile }
        new_profile.following.push(parseInt(e.target.value))
        setProfile({ ...new_profile })

        fetch('/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ following: e.target.value, follower: profile.user_id })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.message)
        })
    };


    const handleUsernameSubmit = (e) => {
        e.preventDefault();

        if (usernameInput) {
            fetch('/get_user_by_username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currUser: username, user: usernameInput })
            }).then((response) => {
                return response.json();
            }).then((user) => {
                setFoundUsers(user.users);
                setNameInput("");
                setUsernameInput("");
            })
        }
    };


    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 font-merriweather text-xl">
                                {profile.followers}
                            </p>
                            <p className="text-gray-400 font-merriweather">
                                Followers
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 font-merriweather text-xl">
                                {profile.following && profile.following.length}
                            </p>
                            <p className="text-gray-400 font-merriweather">
                                Following
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 font-merriweather text-xl">
                                {profile.posts}
                            </p>
                            <p className="text-gray-400 font-merriweather">
                                Posts
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        {/* <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            { <img
                               src={userData.photo}
                               className="rounded-full"
                               alt="user profile"
                           /> }
                            </div> */}
                    </div>
                    <div className="space-x-8 flex justify-center mt-36 md:mt-0 md:justify-center">
                        {isCurrUser ? (
                            <button
                                onClick={() => setOpenModal(true)}
                                className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Add a Friend
                            </button>) : (
                            <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Follow
                            </button>)
                        }
                    </div>
                </div>

                <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium font-merriweather text-gray-700">
                        {profile.first_name} {profile.last_name}
                    </h1>
                </div>

                <div className="mt-12 flex flex-col justify-center">
                    <div className="font-merriweather font-semibold text-theme-dark-red text-xl pb-4 text-center">
                        Interests
                    </div>
                    <div className="flex flex-row flex-wrap justify-center gap-2 lg:px-16">
                        {profile.interests && profile.interests.map((interest) => {
                            const interest_str = interest[0].toUpperCase() + interest.slice(1);
                            return (
                                <div
                                    key={interest_str}
                                    className="border-2 text-center border-gray-400 bg-white text-theme-navy-blue  font-merriweather rounded-full px-4 py-2 font-semibold"
                                >
                                    {interest_str}
                                </div>
                            )
                        }
                        )}
                    </div>
                    {isCurrUser && (
                        <Link
                            to={"/profile/" + username + "/select-interests"}
                            className="flex justify-center pt-6"
                        >
                            <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Edit Interests
                            </button>
                        </Link>
                    )}
                </div>
            </div>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <div className="font-merriweather font-semibold text-theme-dark-red text-xl">Add a Friend</div>
                </Modal.Header>
                <Modal.Body>
                    {foundUsers && foundUsers.length > 0 && (
                        <div className="grid grid-cols-1 divide-y divide-theme-navy-blue">
                            {foundUsers.map((user) => (
                                <div key={user[0]} className="flex flex-row gap-4 p-2">
                                    <div className="flex flex-row items-center font-merriweather text-theme-navy-blue"><Link to={"/profile/" + user[1]} className="flex font-semibold text-theme-dark-red">{user[1]}</Link> - {user[2][0].toUpperCase() + user[2].slice(1)} {user[3][0].toUpperCase() + user[3].slice(1)}</div>
                                    {profile.following.includes(user[0]) ?
                                        (<button
                                            key={user[1]}
                                            type="button"
                                            id={user[1]}
                                            onClick={handleUnfollow}
                                            value={user[0]}
                                            className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-green-600 bg-green-200 hover:border-red-600 hover:bg-red-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                                        >   Following
                                            <CheckCircleIcon
                                                className="inline h-8 w-8 p-1"
                                                aria-hidden="true"
                                            />
                                        </button>
                                        ) : (
                                            <button
                                                key={user[1]}
                                                type="button"
                                                id={user[1]}
                                                onClick={handleFollow}
                                                value={user[0]}
                                                className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-gray-400 hover:border-green-600 bg-white hover:bg-green-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                                            >   Follow
                                                <PlusCircleIcon
                                                    className="inline h-8 w-8 p-1"
                                                    aria-hidden="true"
                                                />
                                            </button>)
                                    }
                                </div>
                            ))}
                        </div>
                    )}
                    {foundUsers && foundUsers.length == 0 && (
                        <div className="flex flex-col gap-4">
                            <form onSubmit={handleNameSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                                <div className="sm:col-span-2">
                                    <div className="font-merriweather font-base text-theme-dark-red">Search by name...</div>
                                    <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            className="block pl-3 w-full flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="First Last"
                                            onChange={handleNameChange}
                                            value={nameInput}
                                        />
                                    </div>
                                </div>
                                <div className="grid sm:col-span-1 content-end justify-center">
                                    <button type="submit" className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                        Search
                                    </button>
                                </div>
                            </form>
                            <form onSubmit={handleUsernameSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                                <div className="sm:col-span-2">
                                    <div className="font-merriweather font-base text-theme-dark-red">Search by username...</div>
                                    <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="Username"
                                            className="block pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="username"
                                            onChange={handleUsernameChange}
                                            value={usernameInput}
                                        />
                                    </div>
                                </div>
                                <div className="grid sm:col-span-1 content-end justify-center">
                                    <button type="submit" className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {foundUsers && foundUsers.length > 0 && (<button type="button" onClick={resetSearch} className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                        Reset Search
                    </button>)}
                </Modal.Footer>
            </Modal>
        </div >
    );
}

