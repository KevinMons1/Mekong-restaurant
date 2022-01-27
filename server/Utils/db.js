require("dotenv")
const mysql = require("mysql2")

 let db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST_JW,
    user: process.env.DB_USER_JW,
    password: process.env.DB_PASSWORD_JW,
    database: process.env.DB_DATABASE_JW
})

// Connect
db.getConnection((err) => {
    if (err) {
        throw err
    }
    console.log("Mysql connected...")
})

module.exports = db