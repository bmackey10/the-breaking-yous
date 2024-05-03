import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    HeartIcon,
    ChatBubbleBottomCenterIcon as ChatBubble,
} from "@heroicons/react/24/outline";

const PostInfo = ({ user, date, content, likes, comments, postId, curr_user }) => {
    const [displayDiff, setDisplayDiff] = useState("");
    const [newComment, setNewComment] = useState("");
    const { user_id } = curr_user;




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
    }, []);



    const handleSubmitComment = (e) => {
        e.preventDefault();
        // Send a request to your backend API to submit the comment
        fetch("/submit-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                content: newComment,
                user_id: user_id
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Clear the comment textbox after successful submission
                    setNewComment("");
                } else {
                    throw new Error(`HTTP Response Code: ${response.status}`);
                }
            })
            .catch((error) => {
                console.error("Error submitting comment:", error);
            });
    };

    return (
        <div className="order-last sm:order-first">
            <div className="relative font-merriweather text-lg">
                <Link to={"/profile/" + user}>
                    <div className="inline font-semibold  text-theme-dark-red pr-1">
                        {user}
                    </div>
                </Link>
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
            {/* Comment Input */}
            <div className="relative flex items-center">
                <input
                    type="text"
                    className="border rounded-lg w-full px-3 py-2 mr-2 focus:outline-none focus:ring focus:border-theme-dark-red"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="bg-theme-dark-red text-white font-bold py-2 px-4 rounded-lg"
                    onClick={(e) => handleSubmitComment(e)}
                >
                    Post
                </button>
            </div>
            {/* Display Comments */}
            {comments.map((comment) => (
                <div key={comment.COMMENT_ID} className="relative text-sm font-merriweather">
                    <Link to={"/profile/" + comment.USER_ID}>
                        <div className="inline font-semibold text-theme-dark-red pr-2">
                            {comment.USERNAME}
                        </div>
                    </Link>
                    {comment.CONTENT}
                </div>
            ))}
        </div>
    );
};

export default PostInfo;
