import Article from "../Modules/Article.js";
//import simulate_recommendation_algorithm from "../../../../backend/sqlcommands/commands";

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
                    <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
                        For You
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-6 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10">
                        {dummy_data.map((data) => (
                            <Article
                                id={data[0]}
                                url={data[5]}
                                img={data[6]}
                                auth={data[2]}
                                date={data[3]}
                                title={data[1]}
                                desc={data[7]}
                                type="for-you"
                            />
                        ))}
                    </div>
                    <div className="flex justify-center p-10">
                        <button className="border-2 font-merriweather transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white rounded-full px-4 py-2 font-semibold">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
