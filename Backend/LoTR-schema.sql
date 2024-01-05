--Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    question TEXT NOT NULL,
    correct_answer INTEGER REFERENCES characters(id)
);

-- Create User Scores table
CREATE TABLE user_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    score INTEGER NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
