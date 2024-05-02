import React, { useState, useEffect } from "react";
import Article from "../Modules/Article.js";
import PostInfo from "../Modules/PostInfo.js";

export default function Community() {
    const [communityArticles, setCommunityArticles] = useState([]);

    useEffect(() => {
        fetchCommunityArticles();
    }, []);

    const fetchCommunityArticles = async () => {
        try {
            const response = await fetch('/community-articles');
            if (response.ok) {
                const data = await response.json();
                setCommunityArticles(data.articles);
            } else {
                console.error(`HTTP Response Code: ${response.status}`);
            }
        } catch (error) {

            console.error('Error fetching community articles:', error);
        }
    };

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
                        Community
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-8 sm:px-10 lg:px-12">
                    <div className="grid grid-cols-1 grid-flow-row gap-10">
                        {communityArticles.map((data) => (
                            <div key={data.article_id} className="border-0 shadow-xl rounded-lg">
                                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <PostInfo
                                        user={data.user_id}
                                        date={data.publish_date}
                                        content={data.content}
                                        likes={data.likes_count}
                                        comments={data.comments_count}
                                    />
                                    <Article
                                        id={data.article_id}
                                        url={data.article_url}
                                        img={data.image_url}
                                        auth={data.author}
                                        date={data.article_publish_date}
                                        title={data.title}
                                        desc={data.description}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
