process.env.NODE_ENV = "test";


const request = require('supertest');
const app = require("../app");
const axiosMock = require('axios-mock-adapter');
const axios = require('axios');

const mock = new axiosMock(axios);

describe('Quotes Router', () => {
    beforeEach(() => {
        mock.reset();
    });

    // Test to GET all quotes
    test('GET /quotes', async () => {
        const mockData = { data: [{ id: '1', dialog: 'Quote 1' }, { id: '2', dialog: 'Quote 2' }] };
        mock.onGet('https://the-one-api.dev/v2/quote').reply(200, mockData);

        const response = await request(app).get('/quotes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Test to GET quote by ID
    test('GET /quotes/:id', async () => {
        const quoteId = '5cd96e05de30eff6ebcce80b'; 
        const mockData = {
            docs: [
                {
                    _id: quoteId,
                    dialog: 'Now come the days of the King. May they be blessed.'
                }
            ]
        };
        mock.onGet(`https://the-one-api.dev/v2/quote/${quoteId}`).reply(200, mockData);
    
        const response = await request(app).get(`/quotes/${quoteId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Test for error handling
    test('GET /quotes - handles errors', async () => {
        mock.onGet('https://the-one-api.dev/v2/quote').networkError();

        const response = await request(app).get('/quotes');
        expect(response.statusCode).toBe(500);
    });
});