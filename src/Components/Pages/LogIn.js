import { Link } from "react-router-dom";

export default function LogIn() {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight font-merriweather text-theme-dark-red">
                        Log In
                    </h1>
                </div>
            </header>
            <main>
                <form className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
                    <div className="flex flex-col justify-center gap-2">
                        <div className="text-theme-dark-red text-center py-2 text-base font-semibold font-merriweather">
                            Don't have an account yet?
                            <Link to="/register" className="px-2">
                                <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                    Register
                                </button>
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className="block pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    autoComplete="username"
                                    className="block pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6 sm:max-w-md"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center py-4">
                            <button className="flex-grow justify-center sm:max-w-md border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
