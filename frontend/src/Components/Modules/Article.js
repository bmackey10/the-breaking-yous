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


    // return (
    //     <Link
    //         to={url}
    //         target="_blank"
    //         className="border-0 shadow-xl rounded-lg transition ease-in-out delay-150 hover:scale-105 lg:hover:scale-110 duration-300"
    //     >
    //         <div className="p-5 text-theme-navy-blue">
    //             <img src={img} className="w-full h-48 rounded-lg object-cover" alt="article" />
    //             <div className="pt-4">
    //                 <div className="flex flex-row flex-wrap text-sm font-merriweather items-center gap-2">
    //                     {isFavorite ? (<StarIcon
    //                         className="h-8 w-8 hover:stroke-black fill-theme-star-yellow stroke-theme-star-yellow hover:fill-white"
    //                         aria-hidden="true"
    //                         onClick={handleToggleFavorite}
    //                     />) : (<StarIcon
    //                         className="h-8 w-8 stroke-black hover:fill-theme-star-yellow hover:stroke-theme-star-yellow"
    //                         aria-hidden="true"
    //                         onClick={handleToggleFavorite}
    //                     />)}
    //                     {auth && <div className="text-theme-dark-red">{auth}</div>}
    //                     {auth && <div className="rounded-full bg-theme-navy-blue h-1 w-1"></div>}
    //                     <div className="font-light">{date}</div>
    //                 </div>
    //                 <div className="py-1 font-bold text-xl font-merriweather">
    //                     {title}
    //                 </div>
    //                 <div className="font-light text-sm font-merriweather overflow-hidden">
    //                     {desc}
    //                 </div>
    //             </div>
    //             {/* <div className="flex justify-center p-2">
    //                 <Link to={"/create-post/" + id}>
    //                     <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
    //                         Post Article
    //                     </button>
    //                 </Link>
    //             </div> */}
    //         </div>
    //         <div className="flex justify-center p-2">
    //             <Link to={"/create-post/" + id}>
    //                 <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
    //                     Post Article
    //                 </button>
    //             </Link>
    //         </div>
    //     </Link>
    // );

    return (
        <Link
            to={url}
            target="_blank"
            className="border-0 shadow-xl rounded-lg relative overflow-hidden transition ease-in-out delay-150 hover:scale-105 lg:hover:scale-110 duration-300"
            style={{ display: 'block' }}
        >
            <div className="p-5 text-theme-navy-blue pb-14"> {/* Add padding bottom here */}
                <img src={img} className="w-full h-48 rounded-lg object-cover" alt="article" />
                <div className="pt-4">
                    <div className="flex flex-row flex-wrap text-sm font-merriweather items-center gap-2">
                        {isFavorite ? (
                            <StarIcon
                                className="h-8 w-8  fill-theme-star-yellow stroke-theme-star-yellow "
                                aria-hidden="true"
                                onClick={handleToggleFavorite}
                            />
                        ) : (
                            <StarIcon
                                className="h-8 w-8 stroke-black hover:fill-theme-star-yellow hover:stroke-theme-star-yellow"
                                aria-hidden="true"
                                onClick={handleToggleFavorite}
                            />
                        )}
                        {auth && <div className="text-theme-dark-red">{auth}</div>}
                        {auth && <div className="rounded-full bg-theme-navy-blue h-1 w-1"></div>}
                        <div className="font-light">{date}</div>
                    </div>
                    <div className="py-1 font-bold text-xl font-merriweather">
                        {title}
                    </div>
                    <div className="font-light text-sm font-merriweather text-ellipsis overflow-hidden">
                        {desc}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
                <Link to={"/create-post/" + id}>
                    <button className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold">
                        Post Article
                    </button>
                </Link>
            </div>
        </Link>
    );


};

export default Article;
