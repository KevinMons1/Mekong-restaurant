require("dotenv").config()
const db = require("../Utils/db")
const stripe = require("stripe")("sk_test_51JFYiCF3UauaeAE1kKk3N9UoyhATmTJBvYXhbvNaFpnJT4fdfChhgxWe7TwqL4QPJsOaSNL0HecfYJsFi3h1grpn00vTZAvQ8f")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")
const io = require("../Utils/io").get()

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

const sendCommande = (data) => {
    const io = require("../Utils/io").send(data)
}

const sendMail = (hourDeliver, email, product, total, emporter) => {
    let order = []

    product.forEach(element => {
        order.push(`x${element.quantity} ${element.name} : ${element.price} €`)
    })

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "gmail", 
        auth: {
            user: "kevin.developer.test@gmail.com", 
            pass: process.env.NODE_MAILER_PASSWORD
        }
    })

    let handlebarsOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: path.resolve(__dirname, '../Utils/Templates'),
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, "../Utils/Templates"),
        extName: ".hbs"
    }
    
    transporter.use('compile', hbs(handlebarsOptions))

    const mailOptions = {
        to: email,
        from: "kevin.developer.test@gmail.com",
        template: 'orderMail',
        subject: 'Récapitulatif de votre commande',
        context: {
        hourDeliver: hourDeliver,
        order: order,
        total: total,
        emporter: emporter
        }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        } else {
            transporter.close()
        }
    })
}

exports.action = async (req, res) => {
  const { product, id, billingDetails } = req.body  
  const rgEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  let productName = "Achat de"
  let productPrice = 0
  let count = 0
  let arrayOrderContentId = []

  if (product.length > 0) {
      product.forEach(element => {
          productName += `\nx${element.quantity} ${element.name}`
        })
        
        product.forEach(element => {
            let priceReplace = element.price.replace(",", ".")
            productPrice += (parseFloat(priceReplace) * parseInt(element.quantity))
        })
        
        if (productPrice >= 0) {
            const query = await requestQuery("SELECT reduction FROM gestionSite")
            if (billingDetails.emporter) productPrice = (productPrice - (productPrice * query[0].reduction) / 100).toFixed(2)
            else productPrice = (productPrice).toFixed(2)
            
            if (rgEmail.test(String(billingDetails.email).toLowerCase())) {

                if (parseFloat(productPrice) >= 30) {
                    stripe.paymentIntents.create({
                        amount: parseInt(productPrice * 100),
                        currency: "EUR",
                        description: productName,
                        payment_method: id,
                        receipt_email: billingDetails.email,
                        confirm: true
                    })
                    .then(async result => {
                        let priceStr = (productPrice).toString()
                        const query2 = await requestQuery("INSERT INTO orders (price, state, emporter) VALUES(?, ?, ?)", [priceStr, 0, billingDetails.emporter])
                        const query3 = await requestQuery("INSERT INTO clients (lastName, firstName, hourDeliver, street, numStreet, city, postalCode, box, phone, email, message) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [billingDetails.lastName, billingDetails.firstName, billingDetails.hourDeliver, billingDetails.street, billingDetails.numStreet, billingDetails.city, billingDetails.postalCode, billingDetails.box, billingDetails.phone, billingDetails.email, billingDetails.message])
                        const query4 = await requestQuery("INSERT INTO clientOrder (clientId, orderId) VALUES(?, ?)", [query3.insertId, query2.insertId])
                        
                        product.forEach(async element => {
                            const query5 = await requestQuery("INSERT INTO orderContent (platId, quantity) VALUES(?, ?)", [element.platId, element.quantity])
                            arrayOrderContentId.push(query5.insertId)
                            
                            count++
                            if (count === product.length) {
                                let count = 0
                                arrayOrderContentId.forEach(async item => {
                                    query6 = await requestQuery("INSERT INTO orderAndContent (orderId, orderContentId) VALUES(?, ?)", [query2.insertId, item])
                                    count++
                                    
                                    if (count === arrayOrderContentId.length) {
                                        sendCommande({
                                            orderInfo: {
                                                date: new Date(),
                                                orderId: query2.insertId,
                                                price: priceStr,
                                                state: 0,
                                                emporter: billingDetails.emporter ? "1" : "0"
                                            },
                                            orderContent: product,
                                            client: billingDetails,
                                            isNew: true
                                        })
                                        sendMail((billingDetails.hourDeliver).toString(), billingDetails.email, product, productPrice, billingDetails.emporter)
                                        res.status(200).send({confirm: true})
                                    }
                                })
                            }
                        })    
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).send({error: "Erreur lors du paiement. Cela vient de nous :("})
                    })
                } else res.status(400).send({error: "Erreur lors du paiement. Il semblerait que vous ne dépassez pas les 30€"})
            } else res.status(400).send({error: "Erreur lors du paiement. Vos informations personnelles semblent erronées"})
        } else res.status(400).send({error: "Erreur lors du paiement. Il semblerait que vous ne dépassez pas les 30€"})
    } else res.status(400).send({error: "Erreur lors du paiement. Votre panier était vide, veuillez le remplir."})
}