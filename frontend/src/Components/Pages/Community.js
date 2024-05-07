import React, { useState, useEffect } from "react";
import Article from "../Modules/Article.js";
import PostInfo from "../Modules/PostInfo.js";

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [curr_user, setUser] = useState({});

    const fetchCurrentUser = () => {
        fetch('/api/get_current_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Response Code: ${response.status}`);
            }
            return response.json();
        })
        .then((current_user) => {
            setUser({ ...current_user });
            // Call fetchPosts inside the then block to ensure it's executed after setUser
            fetchPosts(current_user);
        })
        .catch((error) => {
            console.error('Error fetching current user:', error);
        });
    };
    
    const fetchPosts = (current_user) => {
        fetch('/api/get-posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: current_user.user_id })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Response Code: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    };
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    

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
                        {posts.map((post) => (
                            <div key={post.POST_ID} className="border-0 shadow-xl rounded-lg">
                                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <PostInfo
                                        user={post.USERNAME}
                                        date={post.POST_PUBLISH_DATE}
                                        content={post.CONTENT}
                                        likes={post.LIKES || []} // Placeholder for likes
                                        comments={post.COMMENTS || []} // Display comments for the post
                                        postId={post.POST_ID}
                                        curr_user={curr_user}
                                    />
                                    <Article
                                        id={post.ARTICLE_ID}
                                        url={post.URL}
                                        img={post.IMAGE_URL}
                                        auth={post.AUTHOR}
                                        date={post.ARTICLE_PUBLISH_DATE}
                                        title={post.TITLE}
                                        desc={post.DESCRIPTION}
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
