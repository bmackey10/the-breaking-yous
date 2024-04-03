import fetch from 'node-fetch';

//NOTES: category parameter does not return accurately sorted results

const url = 'https://newsapi.org/v2/top-headlines?' +
                'from=2024-04-02&' +
                // 'q=business&' +
                'topic=business&' +
                'sortBy=popularity&' +
                'pageSize=5&' + 
                'page=1&' +
                'apiKey=52145a112e864c4da343e0dbe167bff2';


let responseData; // Variable to store the JSON response

fetch(url)
    .then(response => response.json())
    .then(data => {
        responseData = data; // Store the JSON response in the variable
        console.log(responseData); // log the response
    })
    .catch(error => console.error('Error:', error));    