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

    app.get('/api/v1/sites/site', async (req, res) => {
      const site = req.query.site;
      const [site_specific] = await pool.query(`SELECT * FROM site_api_database.sites WHERE site_name='${site}'`);
      res.send(site_specific);
    })

    app.post('/api/v1/sites/addSite', async (req, res) => {
      const site_name = req.query.site_name;
      const power = req.query.power;
      await pool.query(`INSERT INTO site_api_database.sites (site_name, power) VALUES ('${site_name}', ${power});`)
    })
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

main();