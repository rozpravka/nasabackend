import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { app } from '../../server';

    describe('Test GET /launches/getAll', () => {
        test('It should respond with status 200', async () => {
            const response = await request(app).get('/launches/getAll');
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toHaveProperty('launchId');
            expect(response.body[0]).toHaveProperty('launchDate');
            expect(response.body[0]).toHaveProperty('mission');
            expect(response.body[0]).toHaveProperty('rocket');
            expect(response.body[0]).toHaveProperty('customers');
            expect(response.body[0]).toHaveProperty('upcoming');
            expect(response.body[0]).toHaveProperty('success');
            expect(response.body[0]).toHaveProperty('destinationName');
            expect(response.body[0]).toHaveProperty('createdAt');
        });
    });

    describe('Test GET /launches/getLatest', () => {
        test('It should respond with status 200', async () => {
            const response = await request(app).get('/launches/getLatest');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('launchId');
            expect(response.body).toHaveProperty('launchDate');
            expect(response.body).toHaveProperty('mission');
            expect(response.body).toHaveProperty('rocket');
            expect(response.body).toHaveProperty('customers');
            expect(response.body).toHaveProperty('upcoming');
            expect(response.body).toHaveProperty('success');
            expect(response.body).toHaveProperty('destinationName');
            expect(response.body).toHaveProperty('createdAt');
        });
    });

    describe('Test POST /launches/add', () => {
        test('It should respond with status 201', async () => {
            const response = await request(app).post('/launches/add').send({
                mission: 'Test Mission',
                rocket: 'Test Rocket',
                destinationName: 'Test Destination',
                launchDate: 'January 1, 2030'
            });
            expect(response.statusCode).toBe(201);
        });
    });

    describe('Test POST /launches/add', () => {
        test('It should respond with status 400', async () => {
            const response = await request(app).post('/launches/add').send({
                mission: 'Test Mission',
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('Test POST /launches/add', () => {
        test('It should respond with status 400', async () => {
            const response = await request(app).post('/launches/add').send({
                mission: 'Test Mission',
                rocket: 'Test Rocket',
                destinationName: 'Test Destination',
                launchDate: '301023/123/123'
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    let idToBeAborted: string;
    describe('Test POST /launches/abort', () => {
        beforeAll(async () => {
            const response = await request(app).get('/launches/getAll');
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            idToBeAborted = response.body[0].launchId;
        });

        test('It should respond with status 200', async () => {
            const response = await request(app).post('/launches/abort').send({
                id: idToBeAborted,
            });
            expect(response.statusCode).toBe(200);
        });
    });

    describe('Test POST /launches/abort', () => {
        test('It should respond with status 404', async () => {
            const response = await request(app).post('/launches/abort').send({
                id: "some random id"
            });
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error');
        });
    });