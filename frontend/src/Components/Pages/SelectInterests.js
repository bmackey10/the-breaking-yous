import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SelectInterests() {
    const { username } = useParams();
    const [currUser, setCurrUser] = useState(0);
    const [interestsObj, setInterestsObj] = useState({
        Environment: 0,
        Travel: 0,
        Business: 0,
        Arts: 0,
        Health: 0,
        Technology: 0,
        World: 0,
        Sports: 0,
        Food: 0,
        Lifestyle: 0,
        Politics: 0,
        Tourism: 0,
        US: 0,
        Entertainment: 0,
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
            setCurrUser(current_user.user_id)
            fetch('/get_user_interests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: current_user.user_id })
            }).then((response) => {
                return response.json();
            }).then((interests) => {
                console.log(interests)
                const new_interestsObj = { ...interestsObj }
                interests.interests.map((interest) => new_interestsObj[interest[0].toUpperCase() + interest.slice(1)] = 1)
                setInterestsObj({ ...new_interestsObj })
            })
        })
    }, [username]);

    const handleRemoveInterestClick = (e) => {
        if (e.target.id.length > 0) {
            setInterestsObj((interestsObj) => ({
                ...interestsObj,
                [e.target.id == "US" ? e.target.id : e.target.id[0].toUpperCase() + e.target.id.slice(1)]: 0,
            }));


            fetch('/remove_interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: currUser, topic: (e.target.id == "US" ? e.target.id : e.target.id.toLowerCase()) })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data.message)
            })
        }
    };

    const handleAddInterestClick = (e) => {
        if (e.target.id.length > 0) {
            setInterestsObj((interestsObj) => ({
                ...interestsObj,
                [e.target.id == "US" ? e.target.id : e.target.id[0].toUpperCase() + e.target.id.slice(1)]: 1,
            }));


            fetch('/add_interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: currUser, topic: (e.target.id == "US" ? e.target.id : e.target.id.toLowerCase()) })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data.message)
            })
        }
    }

    return (
        <div className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
            <div className="flex flex-col justify-center pt-10">
                <div className="pt-10 pb-2 text-2xl text-center font-merriweather">
                    Welcome, {username}!
                </div>
                <div className="text-theme-dark-red text-center text-lg font-merriweather">
                    Select the topics you are interested in...
                </div>
                <div className="text-theme-dark-red text-center text-lg font-merriweather">
                    and "The Breaking Yous" will give you articles daily that
                    align with your interests.
                </div>
            </div>
            <div className="flex flex-row justify-center flex-wrap py-8 gap-4">
                {interestsObj && Object.keys(interestsObj).map((data, index) =>
                    interestsObj[data] ? (
                        <button
                            key={index}
                            type="button"
                            id={data}
                            onClick={handleRemoveInterestClick}
                            className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-green-600 bg-green-200 hover:border-red-600 hover:bg-red-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                        >
                            {data}
                            <CheckCircleIcon
                                className="inline h-8 w-8 p-1"
                                aria-hidden="true"
                            />
                        </button>
                    ) : (
                        <button
                            key={index}
                            type="button"
                            id={data}
                            onClick={handleAddInterestClick}
                            className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-gray-400 hover:border-green-600 bg-white hover:bg-green-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                        >
                            {data}
                            <PlusCircleIcon
                                className="inline h-8 w-8 p-1"
                                aria-hidden="true"
                            />
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
