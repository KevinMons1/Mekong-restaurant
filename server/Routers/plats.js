const express = require("express")
const router = express.Router()
const plats = require("../Controllers/plats")

router.get("/all", plats.getAll)
router.get("/one/:id", plats.getOne)
router.get("/panier/:id", plats.getPanier)

module.exports = router