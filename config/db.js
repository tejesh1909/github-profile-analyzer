// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // Test the connection when the server starts
// pool.getConnection()
//     .then(conn => {
//         console.log('✅ Connected to MySQL Database Pool');
//         conn.release();
//     })
//     .catch(err => console.error('❌ Database connection failed:', err.message));

// module.exports = pool;
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // ADD THIS
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000
});

// Test the connection when the server starts
pool.getConnection()
    .then(conn => {
        console.log('✅ Connected to MySQL Database Pool');
        conn.release();
    })
    .catch(err => console.error('❌ Database connection failed:', err.message));

module.exports = pool;