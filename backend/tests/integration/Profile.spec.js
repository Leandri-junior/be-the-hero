const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG',() => {
    beforeEach(async() => {
      await  connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able return an LIST ',async () => { 
      const response = await request(app)
      .get('/profile')
      .set({
          authorization: 'e39479b4'
      })

      expect(Array.isArray(response.body)).toBe(true)
    })
      
});