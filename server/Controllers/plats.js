const db = require("../Utils/db")
const { cloudinary } = require("../Utils/cloudinary")

const requestQuery = async (query, params) => {
    return await new Promise ((resolve) => {
        db.query(query, params, (err, result) => {
            if (err) {
                throw err
            } else {
                resolve(result)
            }
        })
    })
}

exports.getAll = async (req, res) => {
    let result = []
    let vegan = []
    let count = 0
    const query = await requestQuery("SELECT * FROM plats ORDER BY platId ASC")
    const query2 = await requestQuery("SELECT * FROM categorys")

    query.forEach(plat => {
        query2.forEach(category => {
            if (plat.platId === category.platId) {
                if (category.categoryNameId === 8) vegan.push(plat.platId)
                result.push({
                    plat: plat,
                    category: category,
                    isVegan: false
                })
            }
        })
        count++

        if (count === query.length) {
            result = result.map(element => vegan.find(veg => veg === element.plat.platId) 
            ? {
                ...element,
                isVegan: true
            }
            : element)
            
            res.status(200).send(result)
        }
    })
}

exports.getOne = async (req, res) => {
    const id = parseInt(req.params.id)
    const rgNumber = /^[0-9]*$/
    let arrayCategorys = []
    let count = 0

    if (rgNumber.test(id)) {
        const query = await requestQuery("SELECT * FROM plats WHERE platId = ?", [id])
        if (query.length > 0) {
            const query2 = await requestQuery("SELECT categoryNameId FROM categorys WHERE platId = ?", [id])
            if (query2.length > 0) {
                query2.forEach(async element => {
                    const query3 = await requestQuery("SELECT name FROM categorysName WHERE categoryNameId = ?", element.categoryNameId)
                    arrayCategorys.push(query3[0].name)

                    count++
                    if (count === query2.length) {
                        res.status(200).send({
                            plat: query[0],
                            categorys: arrayCategorys
                        })
                    }
                })

            } else res.status(404).send({error : "Erreur... pas de catégorie pour ce plat."})
        } else res.status(404).send({error : "Ce plat n'existe pas."})
    } else res.status(400).send({error : "Id invalid, vérifiez l'url."})
}

exports.getPanier = async (req, res) => {
    const ids = req.params.id.split("&")
    let arrayId = []
    const rgNumber = /^[0-9]*$/
    let result = []
    let checked = true
    let count = 0

    ids.forEach(id => {
        arrayId.push(id.split("=")[1])
    })

    arrayId.forEach(id => {
        if (!rgNumber.test(parseInt(id))) checked = false
    })
    
    if (checked) {
        arrayId.forEach(async id => {
            if (checked) {
                const query = await requestQuery("SELECT platId, name, price, available, visibility FROM plats WHERE platId = ?", id)
                if (query.length > 0) {
                    if (parseInt(query[0].visibility) === 1 && parseInt(query[0].available) === 1) {
                        result.push({
                            platId: query[0].platId,
                            name: query[0].name,
                            price: query[0].price
                        })
                    }
                }

                count++
                if (count === arrayId.length) res.status(200).send(result)
            } else res.status(400).send({error: "Id invalid, vidé les caches de votre navigateur."})
        })
    } else res.status(400).send({error: "Id invalid, vidé les caches de votre navigateur."})
}