import { Link } from "react-router-dom";
import { useState } from "react";
import {
    StarIcon,
} from "@heroicons/react/24/outline";

const Article = ({ id, url, img, auth, date, title, desc, favorited, onAddToFavorites }) => {

    const [isFavorite, setIsFavorite] = useState(favorited);

    const handleToggleFavorite = (event) => {
        event.preventDefault(); 
        setIsFavorite(!isFavorite);
        // Invoke the callback function to add or remove the article from favorites
        onAddToFavorites(id);
    };
  

    return (
        <Link
            to={url}
            target="_blank"
            className="border-0 shadow-xl rounded-lg transition ease-in-out delay-150 hover:scale-105 lg:hover:scale-110 duration-300"
        >
            <div className="p-5 text-theme-navy-blue">
                <img src={img} className="w-full rounded-lg" alt="article" />
                <div className="pt-4">
                    <div className="flex flex-row flex-wrap text-sm font-merriweather items-center gap-2">
                        <StarIcon 
                            className={`h-8 w-8 stroke-black ${isFavorite ? 'fill-theme-star-yellow' : ''}`} 
                            aria-hidden="true" 
                            onClick={handleToggleFavorite}
                        />
                        <div className="text-theme-dark-red">{auth}</div>
                        <div className="rounded-full bg-theme-navy-blue h-1 w-1"></div>
                        <div className="font-light">{date}</div>
                    </div>
                    <div className="py-1 font-bold text-xl font-merriweather">
                        {title}
                    </div>
                    <div className="font-light text-sm font-merriweather">
                        {desc}
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    <Link to={"/create-post/" + id}>
                        <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                            Post Article
                        </button>
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default Article;
