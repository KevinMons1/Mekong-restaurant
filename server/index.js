require('dotenv').config()
const express = require("express")
const app = express()
const http = require("http").Server(app)
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const port = process.env.PORT || 8080
const io = require("./Utils/io").init(http)

const gestionSiteRouters = require("./Routers/gestionSite")
const gestionContenuRouters = require("./Routers/gestionContenu")
const platsRouters = require("./Routers/plats")
const paymentRouter = require("./Routers/payment")
const ordersRouter = require("./Routers/orders")
const adminRouter = require("./Routers/admin")
const contactRouter = require("./Routers/contact")

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use("/Images", express.static(path.join(__dirname, "Images")))

app.use("/api/gestion-site", gestionSiteRouters)
app.use("/api/gestion-contenu", gestionContenuRouters)
app.use("/api/plats", platsRouters)
app.use("/api/payment", paymentRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/admin", adminRouter)
app.use("/api/contact", contactRouter)

http.listen(port, () => {
    console.log("Server started");
})