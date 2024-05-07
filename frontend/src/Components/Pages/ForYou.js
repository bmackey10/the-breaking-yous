import Article from "../Modules/Article.js";
import { useState, useEffect } from "react";

export default function ForYou() {
    const [articles, setArticles] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = () => {
        try {
            fetch('/get_current_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    //return response.json();
                    if (response?.ok) {
                        return response.json();
                    } else {
                        console.log(`HTTP Response Code: ${response?.status}`)
                        throw new Error('Server returned ' + response?.status);
                    }
                })
                .then((current_user) => {
                    setUser({ ...current_user });
                    fetchData(current_user);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const fetchData = (current_user, loadMore = false) => {
        try {
            const url = '/for-you' + (loadMore ? '?load_more=true' : '');
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: current_user.user_id,
                }),
            })
                .then((response) => {
                    // if (response.ok) {
                    //     return response.json();
                    // } else {
                    //     console.log(`HTTP Response Code: ${response?.status}`)
                    //     return "error";
                    // }
                    if (response?.ok) {
                        return response.json();
                    } else {
                        console.log(`HTTP Response Code: ${response?.status}`)
                        throw new Error('Server returned ' + response?.status);
                    }
                })
                .then((data) => {
                    // Handle response data
                    if (data !== "error") {
                        console.log(data)
                        if (Array.isArray(data.articles)) {
                            if (loadMore) {
                                // Append new articles to existing articles
                                setArticles(prevArticles => [...(prevArticles || []), ...data.articles]);
                            } else {
                                // Replace existing articles with fetched articles
                                setArticles(data.articles);
                            }
                        } else {
                            console.error('Articles data is not in the expected format:', data.articles);
                        }
                    } else {
                        console.error('Error fetching articles:', data.error);
                    }
                })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddToFavorites = (articleId, newFavoriteStatus) => {
        try {
            // Send a request to the backend to mark the article as favorited

            fetch('/mark-as-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    article_id: articleId,
                }),
            })
                .then((response) => {
                    if (response?.ok) {
                        return response.json();
                    } else {
                        console.log(`HTTP Response Code: ${response?.status}`)
                        throw new Error('Server returned ' + response?.status);
                    }
                })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLoadMore = () => {
        fetchData(user, true);
    };


    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
                        For You
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 px-6 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10">
                        {articles && articles.map((article) => (
                            <Article
                                id={article.article_id}
                                url={article.url}
                                img={(article.image_url !== 'None' && article.image_url) ||
                                    (article.topic.toLowerCase() === 'business' ? 'https://img.freepik.com/free-photo/aerial-view-business-data-analysis-graph_53876-146152.jpg' :
                                        article.topic.toLowerCase() === 'arts' ? 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?cs=srgb&dl=pexels-steve-1183992.jpg&fm=jpg' :
                                            article.topic.toLowerCase() === 'health' ? 'https://st3.depositphotos.com/13349494/17896/i/450/depositphotos_178964966-stock-photo-stethoscope-paper-cardiogram-scattered-pills.jpg' :
                                                article.topic.toLowerCase() === 'technology' ? 'https://media.istockphoto.com/id/1387945043/photo/computer-technology-background-digital-data-flow-network-connection-structure-big-data.jpg?s=612x612&w=0&k=20&c=V2cZ-hiraxH7UVPiTSWgYftHjx0iSevz0xfUuJLJ9pc=' :
                                                    article.topic.toLowerCase() === 'world' ? 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?cs=srgb&dl=pexels-nastyasensei-66707-335393.jpg&fm=jpg' :
                                                        article.topic.toLowerCase() === 'sports' ? 'https://media.istockphoto.com/id/949190756/photo/various-sport-equipments-on-grass.webp?b=1&s=170667a&w=0&k=20&c=0du9Ul5NHOHDjpolTa8GKvLVSdOCoRPN-JGI_chUOsI=' :
                                                            article.topic.toLowerCase() === 'food' ? 'https://media.istockphoto.com/id/1155240408/photo/table-filled-with-large-variety-of-food.jpg?s=612x612&w=0&k=20&c=uJEbKmR3wOxwdhQR_36as5WeP6_HDqfU-QmAq63OVEE=' :
                                                                article.topic.toLowerCase() === 'lifestyle' ? 'https://st2.depositphotos.com/1854227/5608/i/450/depositphotos_56086767-stock-photo-cross-country-trail-running-people.jpg' :
                                                                    article.topic.toLowerCase() === 'politics' ? 'https://st.depositphotos.com/1034300/1363/i/450/depositphotos_13632170-stock-photo-business-meeting-conference-journalism-microphones.jpg' :
                                                                        article.topic.toLowerCase() === 'travel' ? 'https://t4.ftcdn.net/jpg/02/80/82/81/360_F_280828158_ZZ2W8atYMHiSkLoDzxgDHNhdmXJ31jCR.jpg' :
                                                                            article.topic.toLowerCase() === 'us' ? 'https://media.istockphoto.com/id/1314505420/photo/the-flag-of-the-united-states-of-america-flying-in-front-of-the-capitol-building-blurred-in.jpg?s=612x612&w=0&k=20&c=-y5ZHNaTUQzoD9Dx_6D3KYNFvK7Ff4yEitJUUHaNLJ8=' :
                                                                                article.topic.toLowerCase() === 'entertainment' ? 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' :
                                                                                    'https://st2.depositphotos.com/3223379/5688/i/950/depositphotos_56880225-stock-photo-words-news.jpg')}
                                auth={article.author}
                                date={article.retrieved_date}
                                title={article.title}
                                desc={article.description}
                                favorited={article.favorited}
                                key={article.article_id}
                                onAddToFavorites={() => handleAddToFavorites(article.article_id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center p-10">
                    <button className="border-2 font-merriweather transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white rounded-full px-4 py-2 font-semibold" onClick={handleLoadMore}>
                        Load More Articles
                    </button>
                </div>
            </main>
        </div>
    );
}
