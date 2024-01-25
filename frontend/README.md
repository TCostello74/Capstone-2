# Lore Of The Rings

Lore Of The Rings is an app for fans of the Lord Of The Rings trilogy. Fans will be able to explore all the different characters and see some of their favorite character's most memorable quotes from the series. It also includes an interactive "Who said it?" game and A trivia quiz to test their Lord Of The Rings IQ!

API: [Link](https://the-one-api.dev/)
Website: [LoreOfTheRings](https://loreoftherings-j9iq.onrender.com/)(Deployed with Render)

## Features

- **Rando-Quote Game:** A random quote will be displayed to the page from the Lord Of The Rings trilogy with the name of the character who said it hidden. A user will be able to guess who they think said the line, then hover over the reval answer to if they were right! After that they can generate another quote and keep guessing!
- **Search Character:** A user may search for a specific character they might be thinking of and view a page displaying their information, quotes by that character, and a Wiki-page link. For additional search functionality a user can also search for characters by letter. This is all functionality to help users to specifically find who they're looking for.
- **Secure Login:** A user may register and log in and out of their account. 
- **Lord Of The Rings Trivia:** Once logged in a user can participate in the Lord Of The Rings trivia game! Users can test their knowledge of the Lord Of The Rings by answering 10 randomized questions about the trilogy. At the end of the quiz users will get their score and see how much of a fan they really are.

## Standard User Flow

A user will arrive at the home page, welcomed to Middle-earth and the world of The Lord The Rings. With a fully accessible navigation bar, users can decide where to go next. They might start with the character page, which features an extensive list of characters from The Lord Of The Rings, ranging from the well-known to even the lesser-known. Next, they can visit the Rando-Quote game and spend some time testing their knowledge of favorite Quotes from the series. Finally after signing up and logging in, users can test their understanding of The Lord Of The Rings by taking a 10-question trivia quiz! With randomly generated questions, users can retake the quiz as many times as they wish.

## Testing

**Backend Testing** Various tests to ensure proper data fetching from the API, for all routes.
    - Run with **'jest'**
**Frontend Testing** Various testing to ensure proper rendering and functionality.
    - Run with **'npm test'** 

## Tech Stack

**Backend**
- Language: JavaScript
- Runtime Environment: Node.js
- Framework: Express.js
- Database: PostgreSQL 
- Authentication: JSON Web Tokens (JWT)
**Frontend**
- Library: React
- Routing: React Router
- HTTP Requests: Axios
**Testing** (Both Frontend and Backend)
- Testing Framework: Jest
