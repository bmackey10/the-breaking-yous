import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const dummy_data = {
    username: "bmackey",
    photo: "/profile-pic.JPG",
    firstName: "Brooke",
    lastName: "Mackey",
    city: "South Bend",
    state: "Indiana",
    interests: [
        "College Sports",
        "Entertainment",
        "Government",
        "Politics",
        "Foreign Affairs",
        "Economic",
        "Science/Technology",
        "Environment",
    ],
    friends: ["hsaiopat", "annamuller2"],
    posts: [
        "Environmental Protection Agency Limits Pollution From Chemical Plants",
    ],
};

export default function Profile() {
    const { username } = useParams();

    return (
        <div class="p-16">
            <div class="p-8 bg-white shadow mt-24">
                <div class="grid grid-cols-1 md:grid-cols-3">
                    <div class="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p class="font-bold text-gray-700 font-merriweather text-xl">
                                {dummy_data.friends.length}
                            </p>
                            <p class="text-gray-400 font-merriweather">
                                Friends
                            </p>
                        </div>
                        <div>
                            <p class="font-bold text-gray-700 font-merriweather text-xl">
                                {dummy_data.posts.length}
                            </p>
                            <p class="text-gray-400 font-merriweather">Posts</p>
                        </div>
                    </div>
                    <div class="relative">
                        <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <img
                                src={dummy_data.photo}
                                className="rounded-full"
                            />
                        </div>
                    </div>

                    <div class="space-x-8 flex justify-center mt-36 md:mt-0 md:justify-center">
                        <button class="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                            Follow
                        </button>
                    </div>
                </div>

                <div class="mt-20 text-center border-b pb-12">
                    <h1 class="text-4xl font-medium font-merriweather text-gray-700">
                        {dummy_data.firstName} {dummy_data.lastName}
                    </h1>
                    <p class="font-light font-merriweather text-theme-dark-red mt-3">
                        {dummy_data.city}, {dummy_data.state}
                    </p>
                </div>

                <div class="mt-12 flex flex-col justify-center">
                    <div className="font-merriweather font-semibold text-theme-dark-red text-xl pb-4 text-center">
                        Interests
                    </div>
                    <div class="flex flex-row flex-wrap justify-center gap-2 lg:px-16">
                        {dummy_data.interests.map((interest) => (
                            <div
                                type="button"
                                id={interest}
                                className="border-2 text-center border-gray-400 bg-white text-theme-navy-blue  font-merriweather rounded-full px-4 py-2 font-semibold"
                            >
                                {interest}
                            </div>
                        ))}
                    </div>
                    <Link
                        to={"/profile/" + username + "/select-interests"}
                        className="flex justify-center pt-6"
                    >
                        <button class="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                            Edit Interests
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
