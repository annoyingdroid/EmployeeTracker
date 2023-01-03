const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  // Your MySQL username,
  user: process.env.DB_USER,
  // Your MySQL password
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
},
console.log('Connection to employee_records established!')
).promise();

module.exports = db;