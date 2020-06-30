const mysql = require('mysql')

const secret = process.env.JWT_SECRET
// Setup database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // db server address
  user: process.env.DB_USER, // db user's name
  password: process.env.DB_PASS, // db user's password
  database: process.env.DB_NAME // db name
})

module.exports = { connection, secret }
