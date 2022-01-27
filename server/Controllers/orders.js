const db = require("../Utils/db")

const requestQuery = async (query, params) => {
    return await new Promise ((resolve) => {
        db.getConnection((err, connection) => {
            if (err) {
                throw err
            }
            connection.query(query, params, (err, result) => {
                db.releaseConnection(connection)
                if (err) {
                    throw err
                } else {
                    resolve(result)
                }
            })
        })
    })
}

exports.getAll = async (req, res) => {
    let result = []
    let resultOrderContent = []
    let count = 0
    const query = await requestQuery("SELECT * FROM orders ORDER BY orderId DESC LIMIT 30")
    const query2 = await requestQuery("SELECT * FROM clients ORDER BY clientId DESC LIMIT 30")
    const query3 = await requestQuery("SELECT * FROM clientOrder ORDER BY clientOrderId DESC LIMIT 30")
    const query4 = await requestQuery("SELECT COUNT(orderId) as total FROM orders")
    const query5 = await requestQuery("SELECT * FROM orderAndContent ORDER BY orderAndContentId DESC LIMIT 30")

    query5.forEach(async element => {
        const query6 = await requestQuery("SELECT * FROM orderContent WHERE orderContentId = ?", [element.orderContentId])
        const query7 = await requestQuery("SELECT name FROM plats WHERE platId = ?", [query6[0].platId])
        resultOrderContent.push({
            orderId: element.orderId,
            ...query6[0],
            ...query7[0]
        })
        
        count++
        if (count === query5.length) {
            count = 0
            
            query3.forEach(element2 => {        
                result.push({
                    orderInfo: query.find(item => item.orderId === element2.orderId),
                    orderContent: resultOrderContent.filter(item => item.orderId === element2.orderId),
                    client: query2.find(item => item.clientId === element2.clientId)
                })
                
                count++
                if (count === query3.length) res.status(200).send({data: result, total: query4[0].total})
            })
        }
    })
}

exports.getToday = async (req, res) => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const query = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (DAY(date) = ?) AND (MONTH(date) = ?) AND (YEAR(date) = ?)", [day, month, year])
    const query2 = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (DAY(date) = ?) AND (MONTH(date) = ?) AND (YEAR(date) = ?) AND state = 1", [day, month, year])
    const query3 = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (DAY(date) = ?) AND (MONTH(date) = ?) AND (YEAR(date) = ?) AND state = 0", [day, month, year])

    res.status(200).send({
        total: query[0].total,
        delivered: query2[0].total,
        inDelivery: query3[0].total
    })
}

exports.getHome = async (req, res) => {
    let amountDay = 0
    let amountMonth = 0
    let amountYear = 0
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const query = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (DAY(date) = ?) AND (MONTH(date) = ?) AND (YEAR(date) = ?)", [day, month, year])
    const query2 = await requestQuery("SELECT price from orders WHERE (DAY(date) = ?) AND (MONTH(date) = ?) AND (YEAR(date) = ?)", [day, month, year])

    const query3 = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (MONTH(date) = ?) AND (YEAR(date) = ?)", [month, year])
    const query4 = await requestQuery("SELECT price from orders WHERE (MONTH(date) = ?) AND (YEAR(date) = ?)", [month, year])

    const query5 = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (YEAR(date) = ?)", [year])
    const query6 = await requestQuery("SELECT price from orders WHERE (YEAR(date) = ?)", [year])
    
    query2.forEach(element => {
        amountDay += parseFloat(element.price)
    })

    query4.forEach(element => {
        amountMonth += parseFloat(element.price)
    })

    query6.forEach(element => {
        amountYear += parseFloat(element.price)
    })

    res.status(200).send({
        day: {
            total: query[0].total,
            amount: amountDay.toFixed(2)
        },
        month: {
            total: query3[0].total,
            amount: amountMonth.toFixed(2)
        },
        year: {
            total: query5[0].total,
            amount: amountYear.toFixed(2)
        }
    })
}

exports.homeChoiceDate = async (req, res) => {
    const { day, month, year } = req.body
    const rgSpecialsChar = /^[A-Za-z0-9]+$/
    let amount = 0

    if (day.length === 2 && month.length === 2 && year.length === 4) {
        if (rgSpecialsChar.test(day) && rgSpecialsChar.test(month) && rgSpecialsChar.test(year)) {

            const query = await requestQuery("SELECT COUNT(orderId) as total FROM orders WHERE (DAY(date) >= ?) AND (MONTH(date) >= ?) AND (YEAR(date) >= ?)", [day, month, year])
            const query2 = await requestQuery("SELECT price from orders WHERE (DAY(date) >= ?) AND (MONTH(date) >= ?) AND (YEAR(date) >= ?)", [day, month, year])

            query2.forEach(element => {
                amount += parseFloat(element.price)
            })

            res.status(200).send({
                total: query[0].total,
                amount: amount.toFixed(2)
            })

        } else res.status(400).send({error: "Date invalid."})
    } else res.status(400).send({error: "Date invalid."})
    
}

exports.getPage = async (req, res) => {
    const nbr = parseInt(req.params.id)
    const nbr2 = nbr === 5 ? 0 : nbr - 5
    let result = []
    let resultOrderContent = []
    let count = 0
    const query = await requestQuery("SELECT * FROM orders ORDER BY orderId DESC LIMIT ?, ?", [nbr2, nbr])
    const query2 = await requestQuery("SELECT * FROM clients ORDER BY clientId DESC LIMIT ?, ?", [nbr2, nbr])
    const query3 = await requestQuery("SELECT * FROM clientOrder ORDER BY clientOrderId DESC LIMIT ?, ?", [nbr2, nbr])
    const query4 = await requestQuery("SELECT COUNT(orderId) as total FROM orders")
    const query5 = await requestQuery("SELECT * FROM orderAndContent ORDER BY orderAndContentId DESC LIMIT ?, ?", [nbr2, nbr])

    query5.forEach(async element => {
        const query6 = await requestQuery("SELECT * FROM orderContent WHERE orderContentId = ?", [element.orderContentId])
        const query7 = await requestQuery("SELECT name FROM plats WHERE platId = ?", [query6[0].platId])
        resultOrderContent.push({
            orderId: element.orderId,
            ...query6[0],
            ...query7[0]
        })
        
        count++
        if (count === query5.length) {
            count = 0
            
            query3.forEach(element2 => {   
                result.push({
                    orderInfo: query.find(item => item.orderId === element2.orderId),
                    orderContent: resultOrderContent.filter(item => item.orderId === element2.orderId),
                    client: query2.find(item => item.clientId === element2.clientId)
                })
                
                count++
                if (count === query3.length) res.status(200).send({data: result, total: query4[0].total})
            })
        }
    })

    if (query5.length === 0) res.status(400)
}

exports.changeState = async (req, res) => {
    const rgNumber = /^[0-9]*$/
    const paramsSplit = req.params.id
    const state = paramsSplit.split("-")[0]
    const id = paramsSplit.split("-")[1]

    if (rgNumber.test(parseInt(state)) && rgNumber.test(parseInt(id))) {
        const query = await requestQuery("UPDATE orders SET state = ? WHERE orderId = ?", [state, id])
        res.status(200).send("Succès, état modifié.")
    } else res.status(400).send({error: "Erreur, les données envoyés ne sont pas bon."})
}

exports.deleteOrder = async (req, res) => {
    const { orderId, clientId, orderContentIds } = req.body
    const rgNumber = /^[0-9]*$/
    const orderContentIdsSplit = orderContentIds.split("-")
    let query, query2
    let count = 0

    orderContentIdsSplit.forEach(async element => {
        if (rgNumber.test(parseInt(element)) && parseInt(element) > 0) {
            query = await requestQuery("DELETE FROM orderContent WHERE orderContentId = ?", [element])
            query2 = await requestQuery("DELETE FROM orderAndContent WHERE orderContentId = ?", [element])
        }

        count++

        if (count === orderContentIdsSplit.length) {
            const query3 = await requestQuery("DELETE FROM orders WHERE orderId = ?", [orderId])
            const query4 = await requestQuery("DELETE FROM clients WHERE clientId = ?", [clientId])
            const query5 = await requestQuery("DELETE FROM clientOrder WHERE clientId = ?", [clientId])
            res.status(200).send("Succès, la commande a été supprimé.")
        }
    }) 
}