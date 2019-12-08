const request = require('supertest');
const {
    Course
} = require('../../models/course');
const {
    Author
} = require('../../models/author');
const mongoose = require('mongoose');
let server;

describe('/courses', () => {
    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(async () => {
        server.close();
        await Course.remove({});
    });

    describe('GET /courses/find', () => {

        it('should return all courses', async () => {
            await Course.collection.insertMany([{
                    name: 'course1'
                },
                {
                    name: 'course2'
                },
            ]);

            const res = await request(server).get('/courses/find');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(c => c.name === 'course1')).toBeTruthy();
            expect(res.body.some(c => c.name === 'course2')).toBeTruthy();

        });

    });

    describe('GET /courses/view/:id/:name', () => {
        it('should return found course if valid _id and name is passed', async () => {
            const course = new Course({
                name: 'course1 '
            });
            await course.save();

            const res = await request(server).get('/courses/view/' + course._id + "/" + course.name);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', course.name);
        });

        it('should return 404 if invalid _id or name is passed', async () => {

            const res = await request(server).get('/courses/view/1/coursename');

            expect(res.status).toBe(404);
        });

    });

    describe('POST /courses/add', () => {

        //  Define the happy path, and then in each test
        //  We change on parameter that clearly aligns with the name of the test

        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/courses/add')
                .set('x-auth-token', token)
                .send({
                    name
                });
        };

        beforeEach(() => {
            token = new Author().generateAuthToken();
            name = 'course1';
        });

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if course is less than 5 characters', async () => {
            name = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if course is more than 50 characters', async () => {

            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {

            await exec();

            const course = await Course.find({
                name: 'course1'
            });

            expect(course).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'course1');
        });
    })



})