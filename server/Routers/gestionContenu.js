const express = require("express")
const router = express.Router()
const gestionContenu = require("../Controllers/gestionContenu")
const multer = require("../Middleware/multer")

router.post("/add", gestionContenu.addPlat)
router.post("/add/image/:id", multer.single('file'), gestionContenu.addPlatImage)

router.put("/visibility/:id", gestionContenu.visiblityChange)
router.put("/available/:id", gestionContenu.availableChange)
router.put("/change", gestionContenu.changePlat)
router.put("/change/image/:id", multer.single('file'), gestionContenu.changeImagePlat)

router.delete("/delete/:id", gestionContenu.deletePlat)

module.exports = router