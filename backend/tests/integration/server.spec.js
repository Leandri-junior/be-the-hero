const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('SERVER',() => {
    beforeEach(async() => {
      
      await  connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })
})