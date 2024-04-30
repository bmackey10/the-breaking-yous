import Article from "../Modules/Article.js";

const dummy_data = [
    0,
    "Environmental Protection Agency Limits Pollution From Chemical Plants",
    "Lisa Friedman",
    "04/09/2024",
    "The New York Times",
    "https://www.nytimes.com/2024/04/09/climate/epa-pollution-chemical-plants.html",
    "/09cli-chemplants-superJumbo.webp",
    "The new regulation is aimed at reducing the risk of cancer for people who live close to plants emitting toxic chemicals.",
    "Environment",
];

export default function CreatePost() {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
                        Create Post
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
                    <div className="grid sm:grid-cols-2 gap-5 sm:gap-10">
                        <Article
                            id={dummy_data[0]}
                            url={dummy_data[5]}
                            img={dummy_data[6]}
                            auth={dummy_data[2]}
                            date={dummy_data[3]}
                            title={dummy_data[1]}
                            desc={dummy_data[7]}
                            type="create-post"
                        ></Article>
                        <form className="flex order-first sm:order-2 flex-col content-start justify-center">
                            <label
                                htmlFor="post-content"
                                className="block text-sm font-merriweather font-semibold leading-6 text-black"
                            >
                                Add a caption...
                            </label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                <textarea
                                    id="post-content"
                                    name="post-content"
                                    rows={3}
                                    className="block w-full pl-3 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                ></textarea>
                            </div>
                            <div className="mt-6 flex justify-center sm:justify-left">
                                <button
                                    type="submit"
                                    className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
