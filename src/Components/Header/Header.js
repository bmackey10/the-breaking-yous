import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NewspaperIcon from "../../Images/newspaper.png";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-theme-navy-blue">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="lg:grid lg:grid-cols-3 lg:w-full">
                    <div className="hidden lg:flex lg:col-span-1 lg:gap-x-12">
                        <Link
                            to="/for-you"
                            className="-m-1.5 p-1.5 transition-all ease-in-out duration-500 border-b-2 border-theme-navy-blue hover:border-white text-sm font-semibold font-merriweather leading-6 text-white"
                        >
                            For You
                        </Link>
                        <Link
                            to="/community"
                            className="-m-1.5 p-1.5 transition-all ease-in-out duration-500 border-b-2 border-theme-navy-blue hover:border-white text-sm font-semibold font-merriweather leading-6 text-white"
                        >
                            Community
                        </Link>
                    </div>
                    <div className="flex lg:cols-span-1 justify-center">
                        <Link
                            to="/"
                            className="text-2xl font-semibold font-merriweather leading-6 text-white"
                        >
                            The Breaking Yous
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:cols-span-1 lg:justify-end">
                        <Link
                            to="/log-in"
                            className="-m-1.5 p-1.5 transition-all ease-in-out duration-500 border-b-2 border-theme-navy-blue hover:border-white text-sm font-semibold font-merriweather leading-6 text-white"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Bars3Icon
                            className="h-8 w-8 stroke-white"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-theme-navy-blue px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="-m-1.5 p-1.5 text-white font-merriweather"
                        >
                            <img
                                className="h-8 w-auto"
                                src={NewspaperIcon}
                                alt="newspaper icon"
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <XMarkIcon
                                className="h-8 w-8 stroke-white"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white">
                            <div className="space-y-2 py-6">
                                <Link
                                    to="/for-you"
                                    className="-mx-3 transition-all ease-in-out duration-500 hover:bg-theme-pale-blue block rounded-lg px-3 py-2 text-base font-semibold font-merriweather leading-7 text-white"
                                >
                                    For You
                                </Link>
                                <Link
                                    to="/community"
                                    className="-mx-3 transition-all ease-in-out duration-500 hover:bg-theme-pale-blue block rounded-lg px-3 py-2 text-base font-semibold font-merriweather leading-7 text-white"
                                >
                                    Community
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/log-in"
                                    className="-mx-3 transition-all ease-in-out duration-500 hover:bg-theme-pale-blue block rounded-lg px-3 py-2.5 text-base font-semibold font-merriweather leading-7 text-white"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
