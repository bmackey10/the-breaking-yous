CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    birth_date DATE,
    gender VARCHAR(10),
    country VARCHAR(100),
    state VARCHAR(100)
);
