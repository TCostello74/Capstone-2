
-- CREATE TABLE users (
--     username TEXT NOT NULL PRIMARY KEY,
--     password TEXT NOT NULL
-- );

CREATE TABLE trivia_game (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    correct_answer_id INT NOT NULL,
    option1 VARCHAR(255) NOT NULL,
    option2 VARCHAR(255) NOT NULL,
    option3 VARCHAR(255) NOT NULL,
    option4 VARCHAR(255) NOT NULL
);

\q