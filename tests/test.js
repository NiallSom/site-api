const request = require('supertest');
const app = request('../index.js');
describe('API tests', () => {
    it('should return a 200 OK response', async () => {
        const res = await request(app).get('/api/v1/sites');
        expect(res.status).toBe(200);
    })
    it('should return a JSON response', async () => {
        const res = await request(app).get('/api/endpoint');
        expect(res.type).toBe('application/json');
      });
})