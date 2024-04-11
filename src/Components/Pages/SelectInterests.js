import { useParams } from "react-router-dom";

export default function SelectInterests() {
    const { username } = useParams();

    return (
        <div className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
            <div className="flex flex-col justify-center">
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
                <div></div>
            </div>
        </div>
    );
}
