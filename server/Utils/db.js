// require("dotenv")
// const mysql = require("mysql2")

//  let db = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// })
    
// // Connect
// db.getConnection((err) => {
//     if (err) {
//         throw err
//     }
//     console.log("Mysql connected...")
// })

// module.exports = db

require("dotenv")
const mysql = require("mysql2")

const mysqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

db = mysql.createConnection(mysqlConfig)

const handleDisconnect = (client) => {
    client.on('error', (err) => {
        if (!err.fatal) return
        if (err.code !== "PROTOCOL_CONNECTION_LOST") throw err

        console.error('> Re-connecting lost MySQL connection: ' + error.stack)

        db = mysql.createConnection(mysqlConfig)
        handleDisconnect(mysqlClient)
        mysqlClient.connect()
    })
}

handleDisconnect(db)

module.exports = db