require("dotenv")
const mysql = require("mysql2")

let db = mysql.createPool(process.env.DB_URL_JW)

// Connect
db.getConnection((err) => {
    if (err) {
        throw err
    }
    console.log("Mysql connected...")
})

module.exports = db