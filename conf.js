const mysql = require('mysql')

// Setup database connection

const secret = process.env.JWT_SECRET
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // db server address
  user: process.env.DB_USER, // db user's name
  password: process.env.DB_PASS, // db user's password
  database: process.env.DB_NAME // db name
})


// test the connection to the database

connection.connect(err => {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database", err);
    }
});


module.exports = { connection, secret }
