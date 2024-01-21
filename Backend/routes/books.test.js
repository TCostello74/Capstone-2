
process.env.NODE_ENV = "test";


const request = require('supertest');
const app = require("../app");
const axiosMock = require('axios-mock-adapter');
const axios = require('axios');

const mock = new axiosMock(axios);

describe('Books Router', () => {
    beforeEach(() => {
        mock.reset();
    });

    // Test for GET all books
    test('GET /books', async () => {
        const mockData = { data: [{ id: '1', title: 'Book 1' }, { id: '2', title: 'Book 2' }] };
        mock.onGet('https://the-one-api.dev/v2/book').reply(200, mockData);

        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Test for GET book by ID
    test('GET /books/:id', async () => {
        const bookId = '5cf5805fb53e011a64671582'; // Example book ID
        const mockData = {
            docs: [
                {
                    _id: bookId,
                    name: 'The Fellowship Of The Ring'
                }
            ]
        };
        mock.onGet(`https://the-one-api.dev/v2/book/${bookId}`).reply(200, mockData);
    
        const response = await request(app).get(`/books/${bookId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Test for error handling
    test('GET /books - handles errors', async () => {
        mock.onGet('https://the-one-api.dev/v2/book').networkError();

        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(500);
    });
});

