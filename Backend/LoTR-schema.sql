--Create Users table
CREATE TABLE users (
    username TEXT NOT NULL PRIMARY KEY,
    password TEXT
);

-- Create Characters table
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    race VARCHAR(100),
    gender VARCHAR(50),
    birth VARCHAR(100),
    death VARCHAR(100),
    spouse VARCHAR(255),
    realm VARCHAR(255),
    hair_color VARCHAR(50),
    eye_color VARCHAR(50),
    wiki_url TEXT
);

-- Create Quotes table
CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id),
    quote TEXT NOT NULL
);

-- Create Trivia Questions table
CREATE TABLE trivia_questions (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    correct_character_id VARCHAR(255) NOT NULL REFERENCES characters(id),
    option1 VARCHAR(255) NOT NULL REFERENCES characters(id),
    option2 VARCHAR(255) NOT NULL REFERENCES characters(id),
    option3 VARCHAR(255) NOT NULL REFERENCES characters(id),
    option4 VARCHAR(255) NOT NULL REFERENCES characters(id)
);


-- Create User Scores table
CREATE TABLE user_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    score INTEGER NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
