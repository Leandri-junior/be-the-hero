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

    it('should be able to create a new ONG',async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name:"APAD",
	        email: "contato@gmail.com.br",
	        whatsapp: "4600000000",
	        city: "Francisco beltrão",
	        uf: "PR"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8)
       
    });

    it('should be able to return an LIST OF ONGS', async () => {
        const response = await request(app).get('/ongs')
    
        expect(Array.isArray(response.body)).toBe(true)
    
        
    });
});