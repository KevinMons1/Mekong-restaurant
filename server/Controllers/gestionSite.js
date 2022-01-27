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
exports.getReduction = async (req, res) => {
    const query = await requestQuery("SELECT reduction FROM gestionSite")
    res.status(200).send(query[0])
}

exports.getSeeOrder = async (req, res) => {
    const query = await requestQuery("SELECT seeOrder FROM gestionSite")
    res.status(200).send((query[0].seeOrder).toString())
}

exports.getStateMessage = async (req, res) => {
    const query = await requestQuery("SELECT message, messageVisibility FROM gestionSite")
    res.status(200).send(query[0])
}

exports.getStateToOrder = async (req, res) => {
    const query = await requestQuery("SELECT toOrder FROM gestionSite")
    res.status(200).send(query[0])
}

exports.toOrderChange = async (req, res) => {
    const state = req.params.id

    const query = await requestQuery("UPDATE gestionSite SET toOrder = ?", state)

    if (state === "0") {
        res.status(200).send({message: "Succès, les commandes ne sont maintenant plus disponible."})
    } else if (state === "1") {
        res.status(200).send({message: "Succès, les commandes sont maintenant disponible."})
    }
}

exports.seeOrderChange = async (req, res) => {
    const state = req.params.id

    const query = await requestQuery("UPDATE gestionSite SET seeOrder = ?", state)

    if (state === "0") {
        res.status(200).send({message: "Succès, les commandes ne sont maintenant plus visible."})
    } else if (state === "1") {
        res.status(200).send({message: "Succès, les commandes sont maintenant visible."})
    }
}

exports.changeReduction = async (req, res) => {
    const state = req.params.id

    const query = await requestQuery("UPDATE gestionSite SET reduction = ?", state)
    res.status(200).send({message: "Succès, la réduction à été modifié."})
}

exports.messageChangeState = async (req, res) => {
    const state = req.params.id

    const query = await requestQuery("UPDATE gestionSite SET messageVisibility = ?", state)
    
    if (state === "0") {
        res.status(200).send({message: "Succès, le message n'est maintenant plus visible."})
    } else if (state === "1") {
        res.status(200).send({message: "Succès, le message est maintenant visible."})
    }
}

exports.messageChangeText = async (req, res) => {
    const { message } = req.body

    if (message !== "") {
        if (message.length < 200) {
            const query = await requestQuery("UPDATE gestionSite SET message = ?", message)
            res.status(200).send({message: "Succès, le message n'est maintenant plus visible."})
        } else res.status(400).send({error: "Votre message ne peut pas dépasser 200 caractères."})
    } else res.status(400).send({error: "Votre message est vide."})
}

exports.getAll = async (req, res) => {
    const query = await requestQuery("SELECT * FROM gestionSite")
    res.status(200).send(query[0])
}