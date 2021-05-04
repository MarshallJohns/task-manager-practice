CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    email VARCHAR(40),
    hash TEXT
);

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    task VARCHAR(100),
    user_id INT REFERENCES users(user_id)
)