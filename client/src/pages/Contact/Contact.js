import React, {useState, useRef} from 'react'
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import MessageSmall from '../../components/Services/MessageSmall'
// import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"
import Loader from "../../components/Services/Loader"
import { Helmet } from "react-helmet"

export default function Contact() {
    const emailRef = useRef()
    const lastNameRef = useRef()
    const firstNameRef = useRef()
    const messageRef = useRef()
    const arrayRef = [emailRef, lastNameRef, firstNameRef, messageRef]
    const [alertMessage, setAlertMessage] = useState("")
    const [alertMessageType, setAlertMessageType] = useState(-1)
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [data, setData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        message: ""
    })


    const handleClickInput = (index, e) => {
        if (e.target.value.length > 0) {
            if (index === 3) arrayRef[index].current.classList.add("animTextArea")
            else arrayRef[index].current.classList.add("animLabel")
        } else if (e.target.value.length === 0) {
            if (index === 3) arrayRef[index].current.classList.remove("animTextArea")
            else arrayRef[index].current.classList.remove("animLabel")
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setDisabled(true)

        const { lastName, firstName, email, message } = data
        const rgNumber = /^[0-9]*$/
        const rgSpecialsChar = /^[A-Za-z0-9^éè,-.à?ôùç'!]+$/
        const rgEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

        if (email !== "" && message !== "" && firstName !== "") {
            if (message.length > 10) {
                if (message.length < 5000) {
                    if (rgEmail.test(String(email).toLowerCase())) {
                        if ((!rgNumber.test(lastName) || lastName === "") && !rgNumber.test(firstName)) {
                            if ((rgSpecialsChar.test(lastName) || lastName === "") && rgSpecialsChar.test(firstName)) {
                                if (isVerified) {
                                    axios.post(`${process.env.REACT_APP_API_URL}/contact/send`, data)
                                        .then(res => {
                                            changeAlertMessage(res.data, 0)
                                            setData({
                                                lastName: "",
                                                firstName: "",
                                                email: "",
                                                message: ""
                                            })
                                        })
                                        .catch(err => {
                                            changeAlertMessage(err.response.data.error, 1)
                                            setData({
                                                ...data,
                                                message: ""
                                            })
                                            messageRef.current.value = ""
                                        })
                                    setDisabled(false)

                                } else changeAlertMessage("ReCaptcha non vérifié", 1)
                            } else changeAlertMessage("Aucun caractère spécial n'est autorisé", 1)
                        } else changeAlertMessage("Aucun chiffre dans votre nom de famille ou prénom n'est autorisé.", 1)
                    } else changeAlertMessage("Votre adresse mail n'est pas valide.", 1)
                } else changeAlertMessage("Votre message est trop long.", 1)
            } else changeAlertMessage("Votre message n'est pas assez long.", 1)
        } else changeAlertMessage("Vous devez remplir tous les champs obligatoires.", 1)

    }

    const changeAlertMessage = (text, type) => {
        setAlertMessage(text)
        setAlertMessageType(type)
        if (!toggleAlertMessage) {
            setToggleAlertMessage(true)
        } 
        setDisabled(false)
    }
    
    const recaptchaLoaded = () => {
        setIsVerified(true)
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="Contactez notre restaurant thaïlandais via notre formulaire." />
            </Helmet>

            <header>
                <NavBar />
            </header>

            <main className="contact">
                <form className="contact-form" onSubmit={e => handleSubmit(e)}>
                    <h4>Envoyer un mail</h4>
                    {disabled ? <div className="contact-loader"><Loader /></div> : null}
                    {toggleAlertMessage ? <MessageSmall type={alertMessageType} message={alertMessage} /> : null}
                    <div className="contact-input-solo">
                        <label ref={emailRef} className="contact-label" htmlFor="email">Adresse mail *</label>
                        <input onInput={(e) => handleClickInput(0, e)} onChange={e => setData({...data, email: e.target.value})} className="contact-input" type="email" name="email" id="email" required/>
                    </div>
                    <div className="contact-input-double">
                        <div className="contact-input-double-left">
                            <label ref={lastNameRef} className="contact-label" htmlFor="lastName">Nom de famille</label>
                            <input onInput={(e) => handleClickInput(1, e)} onChange={e => setData({...data, lastName: e.target.value})} className="contact-input" type="text" name="lastName" id="lastName" />
                        </div>
                        <div className="contact-input-double-right">
                            <label ref={firstNameRef} className="contact-label" htmlFor="firstName">Prénom *</label>
                            <input onInput={(e) => handleClickInput(2, e)} onChange={e => setData({...data, firstName: e.target.value})} className="contact-input" type="text" name="firstName" id="firstName"/>
                        </div>
                    </div>
                    <div className="contact-input-solo contact-message">
                        <label ref={messageRef} className="contact-label-textarea" htmlFor="message">Message ... *</label>
                        <textarea onInput={(e) => handleClickInput(3, e)} onChange={e => setData({...data, message: e.target.value})} className= "contact-textArea" name="message" id="message" cols="30" rows="10" required></textarea>
                    </div>
                    <div className="contact-recaptcha">
                    {/* <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_KEY_SITE}
                        onChange={recaptchaLoaded}
                        onExpired={() => setIsVerified(false)}
                    /> */}
                    </div>
                    <div className="contact-small">
                            <small>* champ obligatoire</small>
                        </div>
                    <button type="submit" disabled={disabled}>
                        <span className="btn-content">Envoyer</span>
                    </button>
                </form>
            </main>

            <Footer />
        </>
    )
}
