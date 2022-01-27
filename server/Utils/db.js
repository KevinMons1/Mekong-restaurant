require("dotenv")
const mysql = require("mysql2")

 let db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

// Connect
db.getConnection((err) => {
    if (err) {
        throw err
    }
    console.log("Mysql connected...")
})

module.exports = db