const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session',() => { 
    beforeEach(async() => {
        await  connection.migrate.latest();
    });
    
    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able create SESSION', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            name:"APAD",
	        email: "contato@gmail.com.br",
	        whatsapp: "4600000000",
	        city: "Francisco beltrão",
	        uf: "PR"
        });

        const response = await request(app)
        .post('/sessions')
        .send({ id: responseOng.body.id })

        expect(response.status).toBe(200)
    })
    
    it('should be able NOT CREATE SESSION', async () => {
        const response = await request(app)
        .post('/sessions')
        .send({ id: 'invalid_id' })

        expect(response.status).toBe(400)
    })
})