const app = require('../../../app.js');
const request = require('supertest');
const { connectMongo, disconnectMongo } = require('../../../services/mongo');

describe('Test Launches API', () => {
	beforeAll(async () => {
		await connectMongo();
	});

	afterAll(async () => {
		await disconnectMongo();
	});

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await request(app).get('/v1/launches');
			expect(response.statusCode).toBe(200);
		});
	});

	describe('Test POST /launches', () => {
		const data = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			destination: 'Kepler-62 f',
			launchDate: 'January 4, 2028',
		};

		const dataWithoutDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			destination: 'Kepler-62 f',
		};

		const dataWithInvalidDate = {
			mission: 'USS Enterprise',
			rocket: 'NCC 1701-D',
			destination: 'Kepler-62 f',
			launchDate: 'hai mate',
		};

		test('It should respond with 201 created', async () => {
			const response = await request(app).post('/v1/launches').send(data);
			expect(response.statusCode).toBe(201);

			const requestDate = new Date(data.launchDate).valueOf;
			const responseDate = response.body.launchDate;
			expect(responseDate).toBe(requestDate);

			expect(response.body).toMatchObject(dataWithoutDate);
		});

		test('It should catch missing required properties', async () => {
			const response = await request(app).post('/v1/launches').send(dataWithoutDate);
			expect(response.statusCode).toBe(400);

			expect(response.body).toStrictEqual({
				error: `Missing required property`,
			});
		});

		test('It should catch invalid dates', async () => {
			const response = await request(app).post('/v1/launches').send(dataWithInvalidDate);
			expect(response.statusCode).toBe(400);

			expect(response.body).toStrictEqual({
				error: `Launch date format is invalid`,
			});
		});
	});
});
