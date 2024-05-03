import Article from "../Modules/Article.js";
import { useState, useEffect } from "react";

export default function ForYou() {
    const [articles, setArticles] = useState([]);
    const [numArticlesToShow, setNumArticlesToShow] = useState(6); // Initial number of articles to show

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = (loadMore = false) => {
        const url = '/for-you' + (loadMore ? '?load_more=true' : ''); // Append load_more parameter if true
        fetch(url, {
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
            if (data !== "error") {
                console.log(data)
                if (loadMore) {
                    // Append new articles to existing articles
                    setArticles(prevArticles => [...prevArticles, ...data.articles]);
                } else {
                    // Replace existing articles with fetched articles
                    setArticles(data.articles);
                }
            } else {
                console.error('Error fetching articles:', data.error);
            }
        });
    };

    const handleLoadMore = () => {
        setNumArticlesToShow(prevNumArticles => prevNumArticles + 6); // Increase by 6 when button is clicked
        fetchData(true); // Send load_more signal
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
                                img={article.image_url || (article.topic.toLowerCase() === 'business' ? 'https://img.freepik.com/free-photo/aerial-view-business-data-analysis-graph_53876-146152.jpg' : 'https://st2.depositphotos.com/3223379/5688/i/950/depositphotos_56880225-stock-photo-words-news.jpg')} 
                                auth={article.author}
                                date={article.retrieved_date}
                                title={article.title}
                                desc={article.description}
                                type="for-you"
                                key={article.article_id}
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



// import Article from "../Modules/Article.js";
// import { useState, useEffect } from "react";

// export default function ForYou() {

//     const [articles, setArticles] = useState([]);
//     const [numArticlesToShow, setNumArticlesToShow] = useState(6); // Initial number of articles to show

//     useEffect(() => {
//         fetch('/for-you', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }).then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 console.log(`HTTP Response Code: ${response?.status}`)
//                 return "error";
//             }
//         }).then((data) => {
//             if (data != "error") {
//                 console.log(data)
//                 setArticles(data.articles);
//             } else {
//                 console.error('Error fetching articles:', data.error);
//             }
//         });
//     }, []);

//     const handleLoadMore = () => {
//         setNumArticlesToShow(prevNumArticles => prevNumArticles + 6); // Increase by 6 when button is clicked
//     };
   
//     return (
//         <div>
//             <header className="bg-white shadow">
//                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold font-merriweather tracking-tight text-theme-dark-red">
//                         For You
//                     </h1>
//                 </div>
//             </header>
//             <main>
//                 <div className="mx-auto max-w-7xl py-6 px-6 sm:px-8 lg:px-10">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10">
//                         {/* {articles.map((article) => ( */}
//                         {articles.slice(0, numArticlesToShow).map((article) => (
//                             <Article
//                                 id={article.article_id}
//                                 url={article.url}
//                                 img={article.image_url}
//                                 auth={article.author}
//                                 date={article.retrieved_date}
//                                 title={article.title}
//                                 desc={article.description}
//                                 type="for-you"
//                             />
//                         ))}
//                     </div>
//                     {articles.length > numArticlesToShow && (
//                         <div className="flex justify-center p-10">
//                             <button className="border-2 font-merriweather transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white rounded-full px-4 py-2 font-semibold" onClick={handleLoadMore}>
//                                 Load More Articles
//                             </button>
//                         </div>
//                     )}
//                     {/* <div className="flex justify-center p-10">
//                         <button className="border-2 font-merriweather transition ease-in-out duration-500 border-theme-navy-blue bg-white hover:bg-theme-navy-blue text-theme-navy-blue hover:text-white rounded-full px-4 py-2 font-semibold">
//                             Load More Articles
//                         </button>
//                     </div> */}
//                 </div>
//             </main>
//         </div>
//     );
// }
