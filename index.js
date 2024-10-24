const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const app = express();
const port = 3000;


async function main() {
    const pool = await mysql.createPool({
        host: 'localhost',
        user: 'user',
        password: 'password',
        port: 3306
    });
    

    app.get('/api/v1/sites', async (req, res) => {
        const [sites] = await pool.query("SELECT * FROM site_api_database.sites");
        res.send(sites);
    })
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

main();