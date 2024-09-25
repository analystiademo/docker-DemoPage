const express = require('express');
const path = require('path');
const { Pool } = require('pg');

require('dotenv').config();  // Load environment variables from .env

const app = express();
const port = 4000;

app.get('/demo-page', (req, res) => {
    res.send('Demo Page Works!');
});

// Database connection pool using environment variables
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});


// Test the database connection and check the 'ipinfo' table
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connected successfully at:', res.rows[0].now);

        // Now check if the 'ipinfo' table exists and print its structure
        pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'ipinfo';
        `, (err, result) => {
            if (err) {
                console.error('Error fetching table structure:', err);
            } else if (result.rows.length === 0) {
                console.log("Table 'ipinfo' does not exist.");
            } else {
                console.log("Table 'ipinfo' structure:");
                console.table(result.rows); // Display table structure
            }
        });
    }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Route to save IP information to the database
app.post('/save-ipinfo', async (req, res) => {
    const {
        ip, city, region, country, loc, org, accuracy, area_code, asn,
        continent_code, country_code, country_code3, organization_name, postal, ptr, timestamp
    } = req.body;

    //console.log('Request body:', req.body);

    try {
        const query = `
            INSERT INTO ipinfo (
                ip, city, region, country, loc, org, accuracy, area_code, asn, 
                continent_code, country_code, country_code3, organization_name, postal, ptr, timestamp
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING id;
        `;
        const values = [
            ip, city, region, country, loc, org, accuracy, area_code, asn, continent_code,
            country_code, country_code3, organization_name, postal, ptr, timestamp
        ];

        const result = await pool.query(query, values);
        res.status(200).json({ success: true, id: result.rows[0].id });
    } catch (error) {
        console.error('Error saving IP information to the database:', error.message);
        res.status(500).json({ success: false, error: 'Database error', details: error.message });
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on http://92.112.194.25:4000');
  });