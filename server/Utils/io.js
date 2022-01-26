// module.exports = {
//     init: (http) => {
//         io = require('socket.io')(http, {
//             log: false,
//             agent: false,
//             transports : [ 'websocket' ],
//             cors: {
//               origin: '*',
//             }
//         })
//         return io
//     },
    
//     get: (data) => {
//         io.on("connection", (socket) => {
           
//         })
//         return io
//     },

//     send: (data) => {
//         io.emit("sendCommande", data)
//     }
// }