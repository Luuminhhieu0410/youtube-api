const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-18a0865-luu7940-3df6.i.aivencloud.com',
    user: 'avnadmin',
    port: 19192,
    password: 'AVNS_s1Ym3jwUGkeZ-a3uPXm',
    database: 'defaultdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
