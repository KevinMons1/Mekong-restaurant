const express = require("express")
const router = express.Router()
const contact = require("../Controllers/contact")

router.post("/send", contact.sendMail)

module.exports = router