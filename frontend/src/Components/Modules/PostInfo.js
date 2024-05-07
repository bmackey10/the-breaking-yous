import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const PostInfo = ({ user, date, content, likes, comments, postId, curr_user }) => {
    const [displayDiff, setDisplayDiff] = useState("");
    const [newComment, setNewComment] = useState("");
    const [postComments, setPostComments] = useState(comments); // State variable to store comments
    const [isLiked, setIsLiked] = useState(likes.reduce((accum, currVal) => currVal.USER_ID === curr_user.user_id ? true : accum, false));
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
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        fetch('/api/submit-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: postId,
                content: newComment,
                user_id: user_id,
                comment_publish_date: formattedDate
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Update comments state with the new comment
                    setPostComments([...postComments, {
                        COMMENT_ID: new Date().getTime(), // Generate a unique ID for the comment
                        USERNAME: curr_user.username, // Assuming you have the current user's name
                        CONTENT: newComment,
                        USER_ID: user_id // Assuming you have the current user's ID
                    }]);
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

    const handleUnlike = () => {
        try {
            fetch('/api/unlike_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: user_id, post: postId })
            }).then((response) => {
                if (response?.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    throw new Error('Server returned ' + response?.status);
                }
            }).then((data) => {
                console.log(data.message)
                setIsLiked(false)
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLike = () => {
        try {
            fetch('/api/like_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: user_id, post: postId })
            }).then((response) => {
                if (response?.ok) {
                    return response.json();
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                    throw new Error('Server returned ' + response?.status);
                }
            }).then((data) => {
                console.log(data.message)
                setIsLiked(true)
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="order-last sm:order-first">
            <div className="relative font-merriweather text-lg">
                {isLiked ? (<HeartIcon
                    className="inline h-8 w-8  fill-theme-dark-red stroke-theme-dark-red"
                    aria-hidden="true"
                    onClick={handleUnlike}
                />) : (<HeartIcon
                    className="inline h-8 w-8 stroke-black hover:fill-theme-dark-red hover:stroke-theme-dark-red"
                    aria-hidden="true"
                    onClick={handleLike}
                />)}
                <Link to={"/profile/" + user}>
                    <div className="inline font-semibold text-theme-dark-red px-1">
                        {user}
                    </div>
                </Link>
                <div className="inline font-light font-sans text-gray-500 pr-2">
                    {displayDiff}
                </div>
                {content}
            </div>
            <div className="flex flex-row flex-wrap text-sm font-merriweather items-center py-2 gap-2">
                <div className="font-light">{likes.length} likes</div>
                <div className="rounded-full bg-theme-navy-blue h-1 w-1"></div>
                <div className="font-light">{comments.length} comments</div>
            </div>
            <div className="relative flex gap-2 items-center pb-4">
                <div className="flex flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                    <input
                        type="text"
                        className="block pl-3 flex-1 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                <button
                    className="bg-theme-dark-red text-white font-bold py-2 px-4 rounded-lg"
                    onClick={(e) => handleSubmitComment(e)}
                >
                    Post
                </button>
            </div>
            <div className="flex flex-col gap-1">{postComments
                .sort((a, b) => new Date(a.DATE) - new Date(b.DATE)) // Sort comments by date
                .map((comment) => (
                    <div key={comment?.COMMENT_ID} className="relative text-sm font-merriweather">
                        <Link to={"/profile/" + comment.USER_ID}>
                            <div className="inline font-semibold text-theme-dark-red pr-2">
                                {comment.USERNAME}
                            </div>
                        </Link>
                        {comment.CONTENT}
                    </div>
                ))}</div>
        </div>
    );
};

export default PostInfo;
