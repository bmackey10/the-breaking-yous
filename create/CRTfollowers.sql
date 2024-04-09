CREATE TABLE Followers (
    follow_id INT PRIMARY KEY,
    follower_user_id INT,
    followed_user_id INT,
    FOREIGN KEY (follower_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (followed_user_id) REFERENCES Users(user_id)
);
