const express = require("express")
const router = express.Router()
const admin = require("../Controllers/admin")

router.post("/login", admin.login)

module.exports = router