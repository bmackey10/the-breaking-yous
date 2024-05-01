/* 
const dummy_data = {
    username: "bmackey",
    photo: "/profile-pic.JPG",
    firstName: "Brooke",
    lastName: "Mackey",
    city: "South Bend",
    state: "Indiana",
    interests: [
        "College Sports",
        "Entertainment",
        "Government",
        "Politics",
        "Foreign Affairs",
        "Economic",
        "Science/Technology",
        "Environment",
    ],
    friends: ["hsiaopat", "annamuller2"],
    posts: [
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
    ],
};*/
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // const fetchUserData = async () => {
        //     try {
        //         const response = await fetch(
        //             `http://3.227.133.217:8020/users/${username}`,
        //         );
        //         if (response.ok) {
        //             const userData = await response.json();
        //             setUserData(userData);
        //         } else {
        //             console.error("Failed to fetch user data");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching user data:", error);
        //     }
        // };

        // fetchUserData();
        fetch('/get_current_user', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            console.log(response)
            return response.json();
        }).then((current_user) => console.log(current_user))
    }, [username]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 font-merriweather text-xl">
                               {userData.friends.length} 
                            </p>
                            <p className="text-gray-400 font-merriweather">
                                Friends
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 font-merriweather text-xl">
                                {userData.posts.length}
                            </p>
                            <p className="text-gray-400 font-merriweather">
                                Posts
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <img
                                src={userData.photo}
                                className="rounded-full"
                                alt="user profile"
                            />
                        </div>
                    </div>

                    <div className="space-x-8 flex justify-center mt-36 md:mt-0 md:justify-center">
                        <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                            Follow
                        </button>
                    </div>
                </div>

                <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium font-merriweather text-gray-700">
                        {userData.firstName} {userData.lastName}
                    </h1>
                    <p className="font-light font-merriweather text-theme-dark-red mt-3">
                        {userData.city}, {userData.state}
                    </p>
                </div>

                <div className="mt-12 flex flex-col justify-center">
                    <div className="font-merriweather font-semibold text-theme-dark-red text-xl pb-4 text-center">
                        Interests
                    </div>
                    <div className="flex flex-row flex-wrap justify-center gap-2 lg:px-16">
                        {userData.interests.map((interest) => (
                            <div
                                key={interest}
                                className="border-2 text-center border-gray-400 bg-white text-theme-navy-blue  font-merriweather rounded-full px-4 py-2 font-semibold"
                            >
                                {interest}
                            </div>
                        ))}
                    </div>
                    <Link
                        to={"/profile/" + username + "/select-interests"}
                        className="flex justify-center pt-6"
                    >
                        <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                            Edit Interests
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
