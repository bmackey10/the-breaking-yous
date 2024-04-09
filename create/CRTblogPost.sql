CREATE TABLE Blog_Post (
    post_id INT PRIMARY KEY,
    user_id INT,
    publish_date DATE,
    article_id INT,
    title VARCHAR(255),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);
