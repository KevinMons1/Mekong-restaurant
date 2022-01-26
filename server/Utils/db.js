require("dotenv")
const mysql = require("mysql2")

let db

const connectDb = () => {
    db = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    
    // Connect
    db.getConnection((err) => {
        if (err) {
            throw err
        }
        console.log("Mysql connected...")
    })
}

db.on('error', connectDb());

module.exports = db