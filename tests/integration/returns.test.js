const {
    Course
} = require('../../models/course');
const {
    Author
} = require('../../models/author');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/courses/returns', () => {
    let server;
    let authorId;
    let courseId;
    let difficultyId;
    let course;
    let token;

    const exec = () => {
        return request(server)
            .post('/courses/returns')
            .set('x-auth-token', token)
            .send({
                authorId,
                difficultyId,
                courseId
            });
    };


    beforeEach(async () => {
        server = require('../../index');

        authorId = mongoose.Types.ObjectId();
        courseId = mongoose.Types.ObjectId();
        difficultyId = mongoose.Types.ObjectId();

        token = new Author().generateAuthToken();

        course = new Course({
            _id: courseId,
            author: {
                _id: authorId
            },
            name: '12345',
            difficulty: {
                _id: difficultyId
            },
            isPublished: true
        });

        await course.save();
    })
    afterEach(async () => {
        await Course.remove({});
        await server.close();
    });

    it('should return 401 if author is not logged in', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if author id is not provided', async () => {
        authorId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 400 if course id is not provided', async () => {
        courseId = '';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 404 if the combination id of author and course dont exist', async () => {
        await Course.remove({});

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('should return 400 if date exists', async () => {
        course.date = new Date();
        await course.save();

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if request is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });

    it('should set the return date if the input is valid', async () => {
        const res = await exec();

        const courseInDb = await Course.findById(course._id);
        const diff = new Date() - courseInDb.date;
        expect(diff).toBeLessThan(10 * 1000);
    });


});