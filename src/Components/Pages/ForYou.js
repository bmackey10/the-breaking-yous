import { Link } from "react-router-dom";

const dummy_data = [
    [
        0,
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
        "Lisa Friedman",
        "04/09/2024",
        "The New York Times",
        "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
        "/09cli-chemplants-superJumbo.webp",
        "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
        "Environment",
    ],
    [
        1,
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
        "Lisa Friedman",
        "04/09/2024",
        "The New York Times",
        "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
        "/09cli-chemplants-superJumbo.webp",
        "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
        "Environment",
    ],
    [
        2,
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
        "Lisa Friedman",
        "04/09/2024",
        "The New York Times",
        "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
        "/09cli-chemplants-superJumbo.webp",
        "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
        "Environment",
    ],
    [
        3,
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
        "Lisa Friedman",
        "04/09/2024",
        "The New York Times",
        "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
        "/09cli-chemplants-superJumbo.webp",
        "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
        "Environment",
    ],
    [
        4,
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
        "Lisa Friedman",
        "04/09/2024",
        "The New York Times",
        "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
        "/09cli-chemplants-superJumbo.webp",
        "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
        "Environment",
    ],
    [
        5,
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
        "Lisa Friedman",
        "04/09/2024",
        "The New York Times",
        "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
        "/09cli-chemplants-superJumbo.webp",
        "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
        "Environment",
    ],
];

// not sure how to incorporate news source

export default function ForYou() {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-theme-dark-red">
                        For You
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-6 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10">
                        {dummy_data.map((data) => (
                            <Link
                                to={data[5]}
                                target="_blank"
                                className="border-0 shadow-xl rounded-lg transition ease-in-out delay-150 hover:scale-105 lg:hover:scale-110 duration-300"
                            >
                                <div className="p-5 text-theme-navy-blue">
                                    <img
                                        src={data[6]}
                                        className="w-full rounded-lg"
                                        alt="article"
                                    />
                                    <div className="pt-4">
                                        <div className="flex flex-row flex-wrap text-sm font-merriweather items-center gap-2">
                                            <div className="text-theme-dark-red">
                                                {data[2]}
                                            </div>
                                            <div className="rounded-full bg-theme-navy-blue h-1 w-1"></div>
                                            <div className="font-light">
                                                {data[3]}
                                            </div>
                                        </div>
                                        <div className="py-1 font-bold text-xl font-merriweather">
                                            {data[1]}
                                        </div>
                                        <div className="font-light text-sm font-merriweather">
                                            {data[7]}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center p-10">
                        <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white rounded-full px-4 py-2 font-semibold">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
