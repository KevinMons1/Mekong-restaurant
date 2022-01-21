const express = require("express")
const router = express.Router()
const orders = require("../Controllers/orders")

router.get("/all", orders.getAll)
router.get("/today", orders.getToday)
router.get("/home", orders.getHome)
router.get("/page/:id", orders.getPage)

router.put("/change/state/:id", orders.changeState)
router.put("/home/choice", orders.homeChoiceDate)

router.delete("/delete", orders.deleteOrder)

module.exports = router