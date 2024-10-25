const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const app = express();
const port = 3000;


async function main() {
    const pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    app.get('/api/v1/sites', async (req, res) => {
        const [sites] = await pool.query("SELECT * FROM site_api_database.sites");
        res.send(sites);
    });

    app.get('/api/v1/sites/site', async (req, res) => {
      const site_name = req.query.site_name;
      console.log(site_name);
      if (!site_name) {
        return res.status(400).json({
            error: 'Missing required parameters: site_name is required'
        });
        }
      const [site_specific] = await pool.query(`SELECT * FROM site_api_database.sites WHERE site_name=?`, site_name);
      res.send(site_specific);
    });

    app.post('/api/v1/sites/insert', async (req, res) => {
        const site_name = req.query.site_name;
        const power = req.query.power;
        if (!site_name || !power) {
            return res.status(400).json({
                error: 'Missing required parameters: site_name and power are required'
                });
        }
        try {
            await pool.query(
                `INSERT INTO site_api_database.sites (site_name, power) VALUES (?, ?);`,
                [site_name, power]
            );
            res.status(201).json({ message: 'Site inserted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to insert site' });
        }
    });

    app.patch('/api/v1/sites/update', async (req, res) => {
        const site_name = req.query.site_name;
        const power = req.query.power;
        if (!site_name || !power) {
          return res.status(400).json({
            error: 'Missing required parameters: site_name and power are required'
          });
        }
        await pool.query(`UPDATE site_api_database.sites SET power = ? WHERE site_name = ?;`, [power, site_name]);
        res.status(200).json({ message: 'Site updated successfully' });
    });
    
    app.delete('/api/v1/sites/delete', async (req, res) => {
        const site_name = req.query.site_name;
        if (!site_name) {
            return res.status(400).json({
                error: 'Missing required parameters: site_name is required'
            });
        }
        await pool.query('DELETE FROM site_api_database.sites WHERE site_name=?', site_name);
    });

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

main();