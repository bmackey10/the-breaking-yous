CREATE TABLE Liked_Articles (
    like_id INT PRIMARY KEY,
    user_id INT,
    article_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);
