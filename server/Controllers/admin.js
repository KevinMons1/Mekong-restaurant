const db = require("../Utils/db")
const bcrypt = require("bcryptjs")

const requestQuery = async (query, params) => {
    return await new Promise ((resolve) => {
        db.query(query, params, (err, result) => {
            db.release()
            if (err) {
                throw err
            } else {
                resolve(result)
            }
        })
    })
}

exports.login = async (req, res) => {
    const password = req.body.password

    const result = await requestQuery("SELECT password FROM admin")
    // bcrypt.compare(password, result[0].password)
    //     .then(valide => {
    //         if (valide) res.status(200).send({alert: true})
    //         else res.status(400).send({alert: false, message: "Mot de passe incorrect."})
    //     })
    //     .catch(err => res.status(400).send("Erreur du serveur..."))

    if (password === "test123456") {
        res.status(200).send({alert: true})
    } else {
        res.status(400).send({alert: false, message: "Mot de passe incorrect."})
    }
}