import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "../Modules/Article.js";

export default function CreatePost() {
    const { article_id } = useParams();
    const [articleInfo, setArticleInfo] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchArticleInfo();
        fetchCurrentUser();
    }, [article_id]);

    const fetchArticleInfo = () => {
        fetch('/create-post?' + new URLSearchParams({ article_id: article_id }))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Response Code: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (!data.img) {
                    data.img = `/09cli-chemplants-superJumbo.webp`;
                }
                setArticleInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching article information:', error);
            });
    };

    const fetchCurrentUser = () => {
        fetch('/get_current_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((current_user) => {
            setUser({ ...current_user });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        fetch("/create-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.user_id,
                article_id: parseInt(article_id),
                content: postContent,
                post_publish_date: formattedDate,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Optionally, you can redirect the user to another page after successful submission
                } else {
                    throw new Error(`HTTP Response Code: ${response.status}`);
                }
            })
            .catch((error) => {
                console.error('Error submitting post:', error);
            });
    };

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
                        Create Post
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
                    <div className="grid sm:grid-cols-2 gap-5 sm:gap-10">
                        {articleInfo && (
                            <Article
                                id={articleInfo.id}
                                url={articleInfo.url}
                                img={articleInfo.image_url}
                                auth={articleInfo.author}
                                title={articleInfo.title}
                                desc={articleInfo.description}
                                type="create post"
                            />
                        )}
                        <form onSubmit={handleSubmit} className="flex order-first sm:order-2 flex-col content-start justify-center">
                            <label
                                htmlFor="post-content"
                                className="block text-md font-merriweather font-semibold leading-6 text-black"
                            >
                                Add a caption to your post...
                            </label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-dark-red sm:max-w-md">
                                <textarea
                                    id="post-content"
                                    name="post-content"
                                    rows={3}
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    className="block w-full pl-3 border-0 bg-transparent py-1.5 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                ></textarea>
                            </div>
                            <div className="mt-6 flex justify-left">
                                <button
                                    type="submit"
                                    className="border-2 transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white font-merriweather rounded-full px-4 py-2 font-semibold"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
