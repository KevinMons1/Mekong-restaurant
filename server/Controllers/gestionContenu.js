const db = require("../Utils/db")
const { cloudinary } = require("../Utils/cloudinary")
const path = require("path")
const fs = require("fs")

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

exports.addPlat = async (req, res) => {
    const { name, description, price, allergy, categorys, pepper, visibility } = req.body
    const rgNumber = /^[0-9^,]*$/
    let arrayCategorysId = []
    let count = 0
    let count2 = 0

    if (name !== "" && parseFloat(price.replace(",", ".")) > 0.01 && categorys.length >= 1) {
        if (rgNumber.test(price)) {
            if (parseFloat(price.replace(",", ".")) > 0.01) {
                if ((pepper === "0" || pepper === "1" || pepper === "2" || pepper === "3") && (visibility === "0" || visibility === "1")) {
                    if (price.includes(",")) {
                        let indexSlice = price.indexOf(",")
                        if (price.slice((indexSlice)).length === 3) {
                            const query = await requestQuery("INSERT INTO plats (name, description, price, allergy, pepper, visibility) VALUES (?, ?, ?, ?, ?, ?)", [name, description, price, allergy, pepper, visibility])
        
                            categorys.forEach(async element => {
                                const query2 = await requestQuery("SELECT categoryNameId FROM categorysName WHERE name = ?", element)
                                console.log(element)
                                arrayCategorysId.push(query2[0].categoryNameId)

                                count++
                                if (count === categorys.length) {
                                    arrayCategorysId.forEach(async categoryId => {
                                        const query3 = await requestQuery("INSERT INTO categorys (platId, categoryNameId) VALUES (?, ?)", [query.insertId, categoryId])

                                        count2++
                                        if (count2 === arrayCategorysId.length) res.status(200).send({message: "Plat ajouté avec succès.", id: query.insertId})
                                    })
                                }
                            })
                        } else res.status(400).send({error: "Le prix ne peut avoir que deux chiffres après la virgule."})
                    } else res.status(400).send({error: "Le prix doit être mis à la décimal séparé par une virgule (exemple: 12,35)."})
                } else res.status(400).send({error: "Une erreur s'est produite."})
            } else res.status(400).send({error: "Le prix ne peut pas être négatif."})
        } else res.status(400).send({error: "Le prix doit être un nombre"})
    } else res.status(400).send({error: "Vous devez remplir les champs obligatoires."})
}

exports.addPlatImage = (req, res) => {
    const file = req.file
    const id = req.params.id

    cloudinary.uploader.upload(file.path, async (err, result) => {
        if (err) {
            throw err
        } else {
            const pathStorage = path.join(__dirname, `../Images/${file.filename}`)
            const query = await requestQuery(`UPDATE plats SET imageUrl = ?, cloudinaryPublicId = ?  WHERE platId = ?`, [result.secure_url, result.public_id, id])

            // Delete image storage in folder Images
            fs.unlink(pathStorage, (err) => {
                console.log(err)
                return
            })
            res.status(200).send({message: "Plat ajouté avec succès."})
        }
    })
}

exports.visiblityChange = async (req, res) => {
    const value = req.params.id
    const valueSplit = value.split("-")
    const state = valueSplit[0]
    const id = valueSplit[1]

    const query = await requestQuery("UPDATE plats SET visibility = ? WHERE platId = ?", [state, id])

    if (state === "0") {
        res.status(200).send({message: "Succès, le plat n'est maintenant plus visible."})
    } else if (state === "1") {
        res.status(200).send({message: "Succès, les commandes sont maintenant visible."})
    }
}

exports.availableChange = async (req, res) => {
    const value = req.params.id
    const valueSplit = value.split("-")
    const state = valueSplit[0]
    const id = valueSplit[1]

    const query = await requestQuery("UPDATE plats SET available = ? WHERE platId = ?", [state, id])

    if (state === "0") {
        res.status(200).send({message: "Succès, le plat n'est maintenant plus visible."})
    } else if (state === "1") {
        res.status(200).send({message: "Succès, les commandes sont maintenant visible."})
    }
}

exports.changePlat = async (req, res) => {
    const { name, description, price, allergy, categorys, pepper, visibility, platId } = req.body
    const rgNumber = /^[0-9^,]*$/
    let arrayCategorysId = []
    let count = 0
    let count2 = 0

    if (name !== "" && parseFloat(price.replace(",", ".")) > 0.01 && categorys.length >= 1) {
        if (rgNumber.test(price)) {
            if (parseFloat(price.replace(",", ".")) > 0.01) {
                if ((pepper.toString() === "0" || pepper.toString() === "1" || pepper.toString() === "2" || pepper.toString() === "3") && (visibility.toString() === "0" || visibility.toString() === "1")) {
                    if (price.includes(",")) {
                        let indexSlice = price.indexOf(",")
                        if (price.slice((indexSlice)).length === 3) {
                            const query = await requestQuery("UPDATE plats SET name = ?, description = ?, price = ?, allergy = ?, pepper = ?, visibility = ? WHERE platId = ?", [name, description, price, allergy, pepper, visibility, platId])
                            const query2 = await requestQuery("DELETE FROM categorys WHERE platId = ?", [platId])

                            categorys.forEach(async element => {
                                const query3 = await requestQuery("SELECT categoryNameId FROM categorysName WHERE name = ?", element)
                                arrayCategorysId.push(query3[0].categoryNameId)
                                count++
                                if (count === categorys.length) {
                                    arrayCategorysId.forEach(async categoryId => {
                                        const query4 = await requestQuery("INSERT INTO categorys (platId, categoryNameId) VALUES (?, ?)", [platId, categoryId])
                                        count2++
                                        if (count2 === arrayCategorysId.length) res.status(201).send({message: "Plat modifié avec succès."})
                                    })
                                }
                            })
                        } else res.status(400).send({error: "Le prix ne peut avoir que deux chiffres après la virgule."})
                    } else res.status(400).send("Le prix doit être mis à la décimal séparé par une virgule (exemple: 12,35).")
                } else res.status(400).send({error: "Une erreur s'est produite."})
            } else res.status(400).send({error: "Le prix ne peut pas être négatif."})
        } else res.status(400).send({error: "Le prix doit être un nombre"})
    } else res.status(400).send({error: "Vous devez remplir les champs obligatoires."})
}

exports.changeImagePlat = (req, res) => {
    const id = req.params.id
    const file = req.file

    cloudinary.uploader.upload(file.path, {
        upload_preset: "ml_default"
    }, async (err, result) => {
        if (err) {
            throw err
        } else {
            const pathStorage = path.join(__dirname, `../Images/${file.filename}`)
            const query = await requestQuery(`SELECT * FROM plats WHERE platId = ?`, [id])
            const query2 = await requestQuery(`UPDATE plats SET imageUrl = ?, cloudinaryPublicId = ?  WHERE platId = ?`, [result.secure_url, result.public_id, id])

            // Delete image storage in couldinary
            await cloudinary.uploader.destroy(query[0].cloudinaryPublicId, (err) => {
                if (err) {
                    throw err
                } 
            })

            // Delete image storage in folder Images
            await fs.unlink(pathStorage, (err) => {
                console.log(err)
                return
            })
            res.status(200).send({message: "Plat modifié avec succès."})
        }
    })
}

exports.deletePlat = async (req, res) => {
    const id = req.params.id
    const query = await requestQuery("SELECT * FROM plats WHERE platId = ?", [id])
    const query2 = await requestQuery("DELETE FROM plats WHERE platId = ?", [id])

    if (query[0].cloudinaryPublicId !== null) {
        await cloudinary.uploader.destroy(query[0].cloudinaryPublicId, (err) => {
            if (err) {
                res.status(400).send({error: "Erreur, le plat à été supprimé mais pas l'image..."})
                throw err
            } 
            res.status(200).send({message: "Succès, le plat à été supprimé."})
        })
    } else res.status(200).send({message: "Succès, le plat à été supprimé."})
}