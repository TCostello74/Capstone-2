process.env.NODE_ENV = "test";


const request = require('supertest');
const app = require("../app");
const axiosMock = require('axios-mock-adapter');
const axios = require('axios');

const mock = new axiosMock(axios);

describe('Movies Router', () => {
    beforeEach(() => {
        mock.reset();
    });

    // Test for GET all movies
    test('GET /movies', async () => {
        const mockData = { data: [{ id: '1', title: 'Movie 1' }, { id: '2', title: 'Movie 2' }] };
        mock.onGet('https://the-one-api.dev/v2/movie').reply(200, mockData);

        const response = await request(app).get('/movies');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Test for GET movie by ID
    test('GET /movies/:id', async () => {
        const movieID = '5cd95395de30eff6ebccde5c'; 
        const mockData = {
            docs: [
                {
                    _id: movieID,
                    name: 'The Fellowship Of The Ring'
                }
            ]
        };
        mock.onGet(`https://the-one-api.dev/v2/movie/${movieID}`).reply(200, mockData);
    
        const response = await request(app).get(`/movies/${movieID}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Test for error handling
    test('GET /movies - handles errors', async () => {
        mock.onGet('https://the-one-api.dev/v2/movie').networkError();

        const response = await request(app).get('/movies');
        expect(response.statusCode).toBe(500);
    });
});