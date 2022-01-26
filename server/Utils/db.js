require("dotenv")
const mysql = require("mysql2")

// const db = mysql.createConnection({
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





let db_config = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
  
let db

const handleDisconnect = () => {
    db = mysql.createConnection(db_config)


    db.connect((err) => {        
        if(err) {                              
            console.log('error when connecting to db:', err)
            setTimeout(handleDisconnect, 2000) 
        }                                    
    })                                     

    db.on('error', (err) => {
        console.log('db error', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect()                         
        } else {                                      
            throw err                                  /
        }
        })
}

handleDisconnect()

module.exports = db