CREATE TABLE Post_Likes (
    like_id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    date_liked DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Blog_Post(post_id)
);
