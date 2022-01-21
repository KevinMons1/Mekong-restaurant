const express = require("express")
const router = express.Router()
const payment = require("../Controllers/payment")

router.post("/action", payment.action)

module.exports = router