const {
  Author
} = require('../../../models/author');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('author.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const author = new Author(payload);
    const token = author.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    expect(decoded).toMatchObject(payload);
  });
});