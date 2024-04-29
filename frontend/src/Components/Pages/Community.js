import Article from "../Modules/Article.js";
import PostInfo from "../Modules/PostInfo.js";

const dummy_data = [
    [
        0,
        "bmackey10",
        "04/10/2024",
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
        "This article is super interesting! If you're interested in environmental policy definitely check it out.",
        [
            [0, "hsiaopat", 0, "04/10/2024"],
            [1, "annamuller2", 0, "04/10/2024"],
        ],
        [
            [0, "hsiaopat", 0, "04/10/2024", "Very cool!"],
            [1, "annamuller2", 0, "04/10/2024", "Super interesting read :)"],
        ],
    ],
];

export default function Community() {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
                        Community
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
                    <div className="grid grid-cols-1 grid-flow-row gap-10">
                        {dummy_data.map((data) => (
                            <div className="border-0 shadow-xl rounded-lg">
                                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <PostInfo
                                        user={data[1]}
                                        date={data[2]}
                                        content={data[4]}
                                        likes={data[5]}
                                        comments={data[6]}
                                    />
                                    <Article
                                        url={data[3][5]}
                                        img={data[3][6]}
                                        auth={data[3][2]}
                                        date={data[3][3]}
                                        title={data[3][1]}
                                        desc={data[3][7]}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
