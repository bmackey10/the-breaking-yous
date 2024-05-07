import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Article from "../Modules/Article.js";

export default function Profile() {
    const { username } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [isCurrUser, setIsCurrUser] = useState(false);
    const [currUser, setCurrUser] = useState({})
    const [nameInput, setNameInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
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
                setCurrUser({ ...user })
                if (user.username && username === user.username) {
                    setIsCurrUser(true);
                }
                fetch('/api/get_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: username })
                }).then((response) => {
                    if (response?.ok) {
                        return response.json();
                    } else {
                        console.log(`HTTP Response Code: ${response?.status}`)
                        throw new Error('Server returned ' + response?.status);
                    }
                }).then((profileInfo) => {
                    setProfile({ ...profileInfo });
                    if (user.username && profileInfo.user_id !== user.username) {
                        try {
                            fetch('/api/check_follow', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ following: profileInfo.user_id, follower: user.user_id })
                            }).then((response) => {
                                if (response?.ok) {
                                    return response.json();
                                } else {
                                    console.log(`HTTP Response Code: ${response?.status}`)
                                    throw new Error('Server returned ' + response?.status);
                                }
                            }).then((data) => {
                                if (data.following) {
                                    setIsFollowing(true);
                                }
                            })
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                })
            })
        } catch (error) {
            console.error('Error:', error);
        }
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
            try {
                fetch('/api/get_user_by_name', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ currUser: username, firstName: name_split[0], lastName: (name_split[1] || "") })
                }).then((response) => {
                    if (response?.ok) {
                        return response.json();
                    } else {
                        console.log(`HTTP Response Code: ${response?.status}`)
                        throw new Error('Server returned ' + response?.status);
                    }
                }).then((user) => {
                    setFoundUsers(user.users);
                    setNameInput("");
                    setUsernameInput("");
                })
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleUsernameSubmit = (e) => {
        e.preventDefault();

        if (usernameInput) {
            try {
                fetch('/api/get_user_by_username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ currUser: username, user: usernameInput })
                }).then((response) => {
                    if (response?.ok) {
                        return response.json();
                    } else {
                        console.log(`HTTP Response Code: ${response?.status}`)
                        throw new Error('Server returned ' + response?.status);
                    }
                }).then((user) => {
                    setFoundUsers(user.users);
                    setNameInput("");
                    setUsernameInput("");
                })
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleUnfollow = (followingOpt) => {
        if (profile.user_id === currUser.user_id) {
            const newProfile = { ...profile }
            const index = newProfile.following.indexOf(followingOpt);
            delete newProfile.following.splice(index);
            setProfile({ ...newProfile })
        } else {
            const newProfile = { ...profile }
            newProfile.followers = newProfile.followers - 1
            setProfile({ ...newProfile })
            setIsFollowing(false)
        }

        try {
            fetch('/api/unfollow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ following: followingOpt, follower: currUser.user_id })
            }).then((response) => {
                if (response?.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    throw new Error('Server returned ' + response?.status);
                }
            }).then((data) => {
                console.log(data.message)
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFollow = (followingOpt) => {
        if (profile.user_id === currUser.user_id) {
            const newProfile = { ...profile }
            newProfile.following.push(parseInt(followingOpt))
            setProfile({ ...newProfile })
        } else {
            const newProfile = { ...profile }
            newProfile.followers = newProfile.followers + 1
            setProfile({ ...newProfile })
            setIsFollowing(true)
        }

        try {
            fetch('/api/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ following: followingOpt, follower: currUser.user_id })
            }).then((response) => {
                if (response?.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    throw new Error('Server returned ' + response?.status);
                }
            }).then((data) => {
                console.log(data.message)
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddToFavorites = (articleId) => {

        try {
            fetch('/api/mark-as-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: profile.user_id,
                    article_id: articleId,
                }),
            }).then((response) => {
                if (response?.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    throw new Error('Server returned ' + response?.status);
                }
            }).then((active) => {
                console.log("Favorite changed")
                const newProfile = { ...profile }
                const articleIndex = newProfile.articles.indexOf(newProfile.articles.reduce((accum, currVal) => currVal[0] === articleId ? currVal : accum, -1));
                console.log(articleIndex)
                if (articleIndex !== -1) {
                    delete newProfile.articles.splice(articleIndex);
                    setProfile({ ...newProfile })
                }
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow-xl rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
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
                    <div className="space-x-8 flex justify-center mt-36 md:mt-0 md:justify-center">
                        {isCurrUser ? (
                            <button
                                onClick={() => setOpenModal(true)}
                                className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Add a Friend
                            </button>) : (isFollowing ? (<button
                                onClick={() => handleUnfollow(profile.user_id)}
                                className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-green-600 bg-green-200 hover:border-red-600 hover:bg-red-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Unfollow
                            </button>) : (<button
                                onClick={() => handleFollow(profile.user_id)}
                                className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-gray-400 hover:border-green-600 bg-white hover:bg-green-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Follow
                            </button>)
                        )
                        }
                    </div>
                </div>
                <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium font-merriweather text-gray-700">
                        {profile.first_name} {profile.last_name}
                    </h1>
                </div>
                <div className="grid grid-flow-row auto-rows-min divide-y gap-12">
                    <div className="flex flex-col justify-center">
                        <div className="mt-12 font-merriweather font-semibold text-theme-dark-red text-xl pb-4 text-center">
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
                    <div className="flex flex-col justify-center">
                        <div className="mt-12 font-merriweather font-semibold text-theme-dark-red text-xl pb-4 text-center">
                            Saved Articles
                        </div>
                        <div className="grid grid-cols-3 grid-flow-row justify-center gap-2 lg:px-16">
                            {profile.articles && profile.articles.map((article) => (
                                <Article
                                    key={article[0]}
                                    id={article[0]}
                                    url={article[4]}
                                    img={(article[5] !== 'None' && article[5]) ||
                                        (article[7].toLowerCase() === 'business' ? 'https://img.freepik.com/free-photo/aerial-view-business-data-analysis-graph_53876-146152.jpg' :
                                            article[7].toLowerCase() === 'arts' ? 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?cs=srgb&dl=pexels-steve-1183992.jpg&fm=jpg' :
                                                article[7].toLowerCase() === 'health' ? 'https://st3.depositphotos.com/13349494/17896/i/450/depositphotos_178964966-stock-photo-stethoscope-paper-cardiogram-scattered-pills.jpg' :
                                                    article[7].toLowerCase() === 'technology' ? 'https://media.istockphoto.com/id/1387945043/photo/computer-technology-background-digital-data-flow-network-connection-structure-big-data.jpg?s=612x612&w=0&k=20&c=V2cZ-hiraxH7UVPiTSWgYftHjx0iSevz0xfUuJLJ9pc=' :
                                                        article[7].toLowerCase() === 'world' ? 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?cs=srgb&dl=pexels-nastyasensei-66707-335393.jpg&fm=jpg' :
                                                            article[7].toLowerCase() === 'sports' ? 'https://media.istockphoto.com/id/949190756/photo/various-sport-equipments-on-grass.webp?b=1&s=170667a&w=0&k=20&c=0du9Ul5NHOHDjpolTa8GKvLVSdOCoRPN-JGI_chUOsI=' :
                                                                article[7].toLowerCase() === 'food' ? 'https://media.istockphoto.com/id/1155240408/photo/table-filled-with-large-variety-of-food.jpg?s=612x612&w=0&k=20&c=uJEbKmR3wOxwdhQR_36as5WeP6_HDqfU-QmAq63OVEE=' :
                                                                    article[7].toLowerCase() === 'lifestyle' ? 'https://st2.depositphotos.com/1854227/5608/i/450/depositphotos_56086767-stock-photo-cross-country-trail-running-people.jpg' :
                                                                        article[7].toLowerCase() === 'politics' ? 'https://st.depositphotos.com/1034300/1363/i/450/depositphotos_13632170-stock-photo-business-meeting-conference-journalism-microphones.jpg' :
                                                                            article[7].toLowerCase() === 'travel' ? 'https://t4.ftcdn.net/jpg/02/80/82/81/360_F_280828158_ZZ2W8atYMHiSkLoDzxgDHNhdmXJ31jCR.jpg' :
                                                                                article[7].toLowerCase() === 'us' ? 'https://media.istockphoto.com/id/1314505420/photo/the-flag-of-the-united-states-of-america-flying-in-front-of-the-capitol-building-blurred-in.jpg?s=612x612&w=0&k=20&c=-y5ZHNaTUQzoD9Dx_6D3KYNFvK7Ff4yEitJUUHaNLJ8=' :
                                                                                    article[7].toLowerCase() === 'entertainment' ? 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' :
                                                                                        'https://st2.depositphotos.com/3223379/5688/i/950/depositphotos_56880225-stock-photo-words-news.jpg')}
                                    auth={article[2]}
                                    date={article[3]}
                                    title={article[1]}
                                    desc={article[6]}
                                    favorited={article[8]}
                                    onAddToFavorites={() => handleAddToFavorites(article[0])}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <div className="font-merriweather font-semibold text-theme-dark-red text-xl">Add a Friend</div>
                </Modal.Header>
                <Modal.Body>
                    {foundUsers && foundUsers.length > 0 && (
                        <div className="grid grid-cols-1 gap-2 divide-y divide-theme-navy-blue">
                            {foundUsers.map((user) => (
                                <div key={user[0]} className="flex flex-row gap-4 p-2">
                                    <div className="flex flex-row items-center font-merriweather text-theme-navy-blue"><Link to={"/profile/" + user[1]} reloadDocument className="flex font-semibold text-theme-dark-red">{user[1]}</Link> - {user[2][0].toUpperCase() + user[2].slice(1)} {user[3][0].toUpperCase() + user[3].slice(1)}</div>
                                    {profile.following.includes(user[0]) ?
                                        (<button
                                            key={user[1]}
                                            type="button"
                                            id={user[1]}
                                            onClick={() => handleUnfollow(user[0])}
                                            value={user[0]}
                                            className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-green-600 bg-green-200 hover:border-red-600 hover:bg-red-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                                        >   Unfollow
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
                                                onClick={() => handleFollow(user[0])}
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
                    {foundUsers && foundUsers.length === 0 && (
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

