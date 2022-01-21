const express = require("express")
const router = express.Router()
const gestionSite = require("../Controllers/gestionSite")

router.get("/all", gestionSite.getAll)
router.get("/reduction", gestionSite.getReduction)
router.get("/seeOrder", gestionSite.getSeeOrder)
router.get("/state/message", gestionSite.getStateMessage)
router.get("/state/toOrder", gestionSite.getStateToOrder)

router.put("/toOrder/change/:id", gestionSite.toOrderChange)
router.put("/seeOrder/change/:id", gestionSite.seeOrderChange)
router.put("/reduction/change/:id", gestionSite.changeReduction)
router.put("/message/change/state/:id", gestionSite.messageChangeState)
router.put("/message/change/text", gestionSite.messageChangeText)

module.exports = router