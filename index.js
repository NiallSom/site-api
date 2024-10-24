const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const app = express();
const port = 3000;

app.get('/api/v1/sites', (req, res) => {
  res.send('Hello World!');
})
console.log(process.env.DB_PASSWORD)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'site_api_database',
    port: 3306
  });
  
const db = mysql.createConnection(pool);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})