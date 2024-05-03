import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="relative h-screen w-auto">
            <div className="bg-[url('../public/news_background.jpg')] bg-no-repeat bg-cover bg-center bg-scroll h-full"></div>
            <div className="absolute inset-0 h-full w-auto bg-white bg-opacity-50"></div>
            <div className="absolute inset-0">
                <div className="mx-auto max-w-7xl py-10 px-16 sm:py-18 sm:px-10 lg:py-20 lg:px-12">
                    <div className="border-0 shadow-xl rounded-lg bg-white">
                        <div className="p-8 grid grid-cols-1 sm:grid-cols-6 justify-items-center gap-4">
                            <div className="sm:col-span-6 text-2xl pb-6 text-center font-bold text-theme-navy-blue font-merriweather">
                                Error! Please log in to access this page.
                            </div>
                            <div className="sm:col-span-4 sm:col-start-2 flex flex-row gap-4">
                                <Link to="/log-in">
                                    <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                        Log In
                                    </button>
                                </Link>
                                <Link to="/">
                                    <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                        Go to Home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}