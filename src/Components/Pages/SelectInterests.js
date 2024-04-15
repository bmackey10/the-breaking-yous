import { useParams } from "react-router-dom";
import { useState } from "react";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SelectInterests({}) {
    const { username } = useParams();
    const [inputWord, setInputWord] = useState("");
    const [interestsObj, setInterestsObj] = useState({
        "College Sports": 0,
        "Professional Sports": 0,
        Entertainment: 0,
        Business: 0,
        Lifestyle: 0,
        "Health/Medicine": 0,
        Government: 0,
        Politics: 0,
        "Foreign Affairs": 0,
        Economic: 0,
        "Domestic Affairs": 0,
        Media: 0,
        "Science/Technology": 0,
        Environment: 0,
        Arts: 0,
        Travel: 0,
    });

    const handleClick = (e) => {
        if (e.target.id.length > 0) {
            setInterestsObj((interestsObj) => ({
                ...interestsObj,
                [e.target.id]: !interestsObj[e.target.id],
            }));
        }
    };

    const handleAddInterest = (e) => {
        e.preventDefault();
        const word = inputWord.trim();
        if (word.length > 0) {
            setInterestsObj((interestsObj) => ({
                ...interestsObj,
                [word.replace(/^[a-zA-Z]/, word[0].toUpperCase())]: 1,
            }));
        }
        setInputWord("");
    };

    const handleInputChange = (e) => {
        setInputWord(e.target.value);
    };

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
            <form className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-10">
                <div className="flex content-center sm:col-span-2">
                    <input
                        type="text"
                        name="interest"
                        id="interest"
                        value={inputWord}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-theme-dark-red sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="sm:col-span-1">
                    <button
                        type="submit"
                        onClick={handleAddInterest}
                        className=" border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                    >
                        Add Interest
                    </button>
                </div>
            </form>
            <div className="flex flex-row flex-wrap py-8 gap-4">
                {Object.keys(interestsObj).map((data, index) =>
                    interestsObj[data] ? (
                        <button
                            key={index}
                            type="button"
                            id={data}
                            onClick={handleClick}
                            className="border-2 text-center transition ease-in-out stroke-green-600 hover:stroke-white duration-500 border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
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
                            onClick={handleClick}
                            className="border-2 text-center transition ease-in-out stroke-gray-400 hover:stroke-white duration-500 border-gray-400 hover:border-green-600 bg-white hover:bg-green-600 text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                        >
                            {data}
                            <PlusCircleIcon
                                className="inline h-8 w-8 p-1"
                                aria-hidden="true"
                            />
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
