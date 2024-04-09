CREATE TABLE User_Interests (
    interest_id INT PRIMARY KEY,
    user_id INT,
    topic VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
