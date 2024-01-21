process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('../app'); 
const axiosMock = require('axios-mock-adapter');
const axios = require('axios');

const mock = new axiosMock(axios);

describe('Character Router', () => {
    beforeEach(() => {
        mock.reset();
    });

    // Fetching All Characters
    test('GET /characters', async () => {
        const mockData = { docs: [{ _id: '5cd99d4bde30eff6ebccfbe6', name: 'Aragorn II Elessar' }] };
        mock.onGet('https://the-one-api.dev/v2/character').reply(200, mockData);

        const response = await request(app).get('/characters');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Fetching a Character by Name
    test('GET /characters/search with name query', async () => {
        const mockData = { docs: [{ _id: '5cd99d4bde30eff6ebccfbe6', name: 'Aragorn II Elessar' }] };
        mock.onGet('https://the-one-api.dev/v2/character').reply(200, mockData);

        const response = await request(app).get('/characters/search?name=Aragorn');
        expect(response.statusCode).toBe(200);
        expect(response.body.some(character => character.name.includes('Aragorn'))).toBe(true);
    });

    // Fetching a Character by ID
    test('GET /characters/:id', async () => {
        const characterID = '5cd99d4bde30eff6ebccfbe6';
        const mockData = { _id: characterID, name: 'Aragorn II Elessar' };
        mock.onGet(`https://the-one-api.dev/v2/character/${characterID}`).reply(200, { docs: [mockData] });

        const response = await request(app).get(`/characters/${characterID}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.docs[0]).toEqual(mockData);
    });

    // Fetching Quotes for a Character by ID
    test('GET /characters/:id/quotes', async () => {
        const characterID = '5cd99d4bde30eff6ebccfbe6';
        const mockData = { docs: [{ _id: '5cd96e05de30eff6ebcce80c', dialog: 'This day does not belong to one man...', character: characterID }] };
        mock.onGet(`https://the-one-api.dev/v2/character/${characterID}/quote`).reply(200, mockData);

        const response = await request(app).get(`/characters/${characterID}/quotes`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    // Error Handling for a Nonexistent Character ID
    test('GET /characters/nonexistentID', async () => {
        const nonexistentID = 'nonexistentID';
        mock.onGet(`https://the-one-api.dev/v2/character/${nonexistentID}`).reply(500);

        const response = await request(app).get(`/characters/${nonexistentID}`);
        expect(response.statusCode).toBe(500);
    });
});
