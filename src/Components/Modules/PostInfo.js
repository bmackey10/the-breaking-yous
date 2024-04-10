import React, { useEffect, useState } from "react";
import {
    HeartIcon,
    ChatBubbleBottomCenterIcon as ChatBubble,
} from "@heroicons/react/24/outline";

const PostInfo = ({ user, date, content, likes, comments }) => {
    const [displayDiff, setDisplayDiff] = useState("");

    useEffect(() => {
        let today = new Date();
        let articleDate = new Date(date);

        let timeDiff = today.getTime() - articleDate.getTime();

        let hourDiff = Math.round(timeDiff / (1000 * 3600));
        let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
        let weekDiff = Math.round(timeDiff / (1000 * 3600 * 24 * 7));

        if (weekDiff > 0) {
            setDisplayDiff(weekDiff.toString() + "w");
        } else if (dayDiff > 1) {
            setDisplayDiff(dayDiff.toString() + "d");
        } else {
            setDisplayDiff(hourDiff.toString() + "h");
        }
    });

    return (
        <div className="order-last sm:order-first">
            <div className="relative font-merriweather text-lg">
                <div className="inline font-semibold  text-theme-dark-red pr-1">
                    {user}
                </div>
                <div className="inline font-light font-sans text-gray-500 pr-2">
                    {displayDiff}
                </div>
                {content}
            </div>
            <div className="flex flex-row flex-wrap text-sm font-merriweather items-center py-1 gap-2">
                <div className="font-light">{likes.length} likes</div>
                <div className="rounded-full bg-theme-navy-blue h-1 w-1"></div>
                <div className="font-light">{comments.length} comments</div>
            </div>
            <div className="flex flex-row py-2 gap-2">
                <HeartIcon
                    className="h-8 w-8 stroke-black hover:fill-theme-dark-red hover:stroke-theme-dark-red"
                    aria-hidden="true"
                />
                <ChatBubble
                    className="h-8 w-8 stroke-black hover:fill-theme-pale-blue hover:stroke-theme-pale-blue"
                    aria-hidden="true"
                />
            </div>
            {comments.map((comment) => (
                <div className="relative text-sm font-merriweather">
                    <div className="inline font-semibold text-theme-dark-red pr-2">
                        {comment[1]}
                    </div>
                    {comment[4]}
                </div>
            ))}
        </div>
    );
};

export default PostInfo;
