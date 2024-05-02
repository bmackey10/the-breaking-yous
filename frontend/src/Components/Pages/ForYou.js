import Article from "../Modules/Article.js";
import { useState, useEffect } from "react";

export default function ForYou() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('/for-you', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(`HTTP Response Code: ${response?.status}`)
                return "error";
            }
        }).then((data) => {
            if (data != "error") {
                console.log(data)
                setArticles(data.articles);
            } else {
                console.error('Error fetching articles:', data.error);
            }
        });
    }, []);
    // useEffect(() => {
    //     fetch('/for-you', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(articleIds)
    //     })
    //     // .then(response => response.json())
    //     // .then(data => setArticleIds(data.topic))
    //     // .catch(error => console.error('Error fetching article IDs:', error));
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             setArticleIds(data.topic);
    //         } else {
    //             console.error('Error in response:', data.error);
    //         }
    //     })
    //     .catch(error => console.error('Error fetching article IDs:', error));
    // }, [articleIds]);

    // useEffect(() => {
    //     fetch('/for-you', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(articleIds)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         // Handle successful response
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         // Handle error
    //         console.error('Error fetching data:', error);
    //     });
    // }, []);

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
                        {articles.map((article) => (
                            <Article
                                id={article.article_id}
                                url={article.url}
                                img={article.image_url}
                                auth={article.author}
                                date={"05/02/2024"}
                                title={article.title}
                                desc={article.description}
                                type="for-you"
                            />
                        ))}
                    </div>
                    <div className="flex justify-center p-10">
                        <button className="border-2 font-merriweather transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white rounded-full px-4 py-2 font-semibold">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
