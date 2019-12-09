const request = require('supertest');
const {
    Author
} = require('../../models/author');
const {
    Course
} = require('../../models/course');
let server;

describe('auth middleware', () => { 
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        await Course.remove({});
        server.close();
    });

    let token;

    const exec = () => {
        return request(server)
        .post('/courses/add')
        .set('x-auth-token', token)
        .send({
            name: 'genre1'
        });
    }

    beforeEach(() => {
        token = new Author().generateAuthToken();
    });

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {

        const res = await exec();

        expect(res.status).toBe(200);
    });
})