process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('../app'); 

jest.mock('../db'); 
const db = require('../db');

describe('Trivia Questions Router', () => {
    // Mock data
    const triviaQuestions = [
        { id: 1, question: 'Who is the author of The Lord of the Rings?', correct_answer_id: 1, option1: 'J.R.R. Tolkien', option2: 'C.S. Lewis', option3: 'George R.R. Martin', option4: 'J.K. Rowling' },
        { id: 2, question: 'Which race is Legolas?', correct_answer_id: 2, option1: 'Human', option2: 'Elf', option3: 'Dwarf', option4: 'Hobbit' }
    ];

    // Fetching a Random Trivia Question
    test('GET /triviaQuestions/random', async () => {
        db.query.mockResolvedValue({ rows: [triviaQuestions[0]] });
        const response = await request(app).get('/triviaQuestions/random');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('question');
        
    });

    // Fetching a Random Trivia Question Excluding Used IDs
    test('GET /triviaQuestions/random with usedQuestionIds', async () => {
        db.query.mockResolvedValue({ rows: [triviaQuestions[1]] });
        const response = await request(app).get('/triviaQuestions/random?usedQuestionIds=1');
        expect(response.statusCode).toBe(200);
        expect(response.body.questionId).not.toBe(1);
        
    });

    // Validation of a Correct Answer
    test('POST /triviaQuestions/validate with correct answer', async () => {
        db.query.mockResolvedValueOnce({ rows: [{ correct_answer_id: 1 }] })
               .mockResolvedValueOnce({ rows: [{ option1: 'J.R.R. Tolkien' }] });
        const response = await request(app).post('/triviaQuestions/validate').send({ questionId: 1, selectedOption: 'J.R.R. Tolkien' });
        expect(response.statusCode).toBe(200);
        expect(response.body.isCorrect).toBe(true);
    });

    // Validation of an Incorrect Answer
    test('POST /triviaQuestions/validate with incorrect answer', async () => {
        db.query.mockResolvedValueOnce({ rows: [{ correct_answer_id: 1 }] })
               .mockResolvedValueOnce({ rows: [{ option1: 'J.R.R. Tolkien' }] });
        const response = await request(app).post('/triviaQuestions/validate').send({ questionId: 1, selectedOption: 'C.S. Lewis' });
        expect(response.statusCode).toBe(200);
        expect(response.body.isCorrect).toBe(false);
    });
});
