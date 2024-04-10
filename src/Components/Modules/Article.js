import { Link } from "react-router-dom";

const Article = ({ url, img, auth, date, title, desc }) => {
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
            </div>
        </Link>
    );
};

export default Article;
