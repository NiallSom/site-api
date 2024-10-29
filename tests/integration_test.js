const request = require('supertest'); 
const app = require('../index.js');
const mysql = require('mysql');
const { exec } = require('child_process');
async function connectToDb() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  while (true) {
    try {
      await pool.execute('Select *');
      break;
    } catch (error) {
      console.log('Waiting for DB..');
      await new Promise(resolve => setTimeout(resolve, 1000));
      // if database is not connected timeout for 1 sec and retry
    }
  }

  pool.end();
}

describe('Integration Tests', () => {
  beforeAll(async () => {
    // Docker Compose up
    await exec('docker-compose -f../docker-compose.yaml up -d');
    await connectToDb();
  });

  afterAll(async () => {
    await exec('docker-compose -f../docker-compose.yaml down');
  });

  describe('GET /api/v1/sites', () => {
    it('should return all sites', async () => {
      const response = await request(app).get('/api/v1/sites');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});