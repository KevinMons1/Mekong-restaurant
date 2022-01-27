require("dotenv").config()
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")

exports.sendMail = (req, res) => {
    const { email, lastName, firstName, message } = req.body

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "GMAIL", 
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
        to: process.env.NODE_MAILER_USER,
        from: process.env.NODE_MAILER_USER,
        template: 'contactMail',
        subject: 'Message reçu depuis la page Contact.',
        context: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message
        }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).send({error: "Erreur du serveur..."})
        } else {
            transporter.close()
            res.status(200).send("Succès, email envoyé !")
        }
    })
}