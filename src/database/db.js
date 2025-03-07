const mysql2 = require('mysql2');

const connection = mysql2.createPool({
    user:"root",
    password:"",
    database:"youtube_list",
    host:"localhost"
})


module.exports = connection.promise();
