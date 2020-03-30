const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
    beforeEach(async() => {
        await connection.migrate.forceFreeMigrationsLock().then(() => {
            connection.migrate.latest();
            connection('incidents').where('ong_id', null).delete()
        })

    })
    it('should be able to create a new INCIDENT', async() => {
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
        .post('/incidents')
        .send({
            title: "Caso teste",
	        description: " Detalhes do caso",
            value: 120,
            ong_id: responseOng.body.id
            
        })
        .set({
            authorization: 'e39479b4'
        })
        expect(response.body).toHaveProperty('id')
    })

    it('should be able to return an INCIDENT LIST', async () => {
        const response = await request(app)
        .get('/incidents')
        .set({
            authorization: 'e39479b4'
        })
        
    
        // expect(JSON.stringify(response)).toBe(true)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThan(0)

        
    })
    
    it('should be able to DELETE INCIDENT', async () => {
        const responseIncident = await request(app)
        .post('/incidents')
        .send({
            title: "Caso teste",
	        description: " Detalhes do caso",
            value: 120,
            ong_id: 'e39479b4'
        })
        .set({
            authorization: 'e39479b4'
        })


        const response = await request(app)
        .delete('/incidents/' + responseIncident.body.id)
        .set({
            authorization: 'e39479b4'
        })

        expect(response.status).toBe(204)

    })
    it('should be able to DELETE INCIDENT', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            name:"APAD",
	        email: "contato@gmail.com.br",
	        whatsapp: "4600000000",
	        city: "Francisco beltrão",
	        uf: "PR"
        });

        const responseIncident = await request(app)
        .post('/incidents')
        .send({
            title: "Caso teste",
	        description: " Detalhes do caso",
            value: 120,
            ong_id: responseOng.body.id
        })
        .set({
            authorization: responseOng.body.id
        })

        const response = await request(app)
        .delete('/incidents/' + responseIncident.body.id)
        .set({
            authorization: 'e39479b4'
        })

        expect(response.status).toBe(401)

    })
})