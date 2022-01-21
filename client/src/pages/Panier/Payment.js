import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import PanierCard from "../../components/PanierCard/PanierCard"
import MessageSmall from '../../components/Services/MessageSmall'
import MessageBig from '../../components/Services/MessageBig'
// import ReCAPTCHA from "react-google-recaptcha"
import { PanierContext } from '../../Contexts/PanierContext'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Loader from "../../components/Services/Loader"
import { reactLocalStorage } from 'reactjs-localstorage';

export default function Payment() {

    const { setPanier, panier } = useContext(PanierContext)
    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()
    const [start, setStart] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [alertMessageBig, setAlertMessageBig] = useState("")
    const [toggleAlertMessageBig, setToggleAlertMessageBig] = useState(false)
    const [alertMessageBigType, setAlertMessageBigType] = useState(-1)
    const [checked, setChecked] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [billingDetails, setBillingDetails] = useState(0)

    useEffect(() => {
        if (history.location.state !== undefined) {
            if (checkHistoryData(history.location.state)) {
                alert("Card test 4242 4242 4242 4242")
                setBillingDetails(history.location.state)
            } else history.push("/panier")
        } else history.push("/panier")
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const checkHistoryData = (data) => {
        const { lastName, firstName, street, numStreet, postalCode, city, box, phone, hourDeliver, email, message, emporter } = data
        const rgNumber = /^[0-9]*$/
        const rgSpecialsChar = /^[A-Za-z0-9^éè,-.ôùç'à?]+$/
        const rgEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        
        if ((lastName !== undefined && lastName !== "") && (firstName !== undefined && firstName !== "") && (phone !== undefined && phone !== "") && (hourDeliver !== undefined && hourDeliver !== "") && (email !== undefined && email !== "")) {
            if (emporter || ((street !== undefined && street !== "") && (numStreet !== undefined && numStreet !== "") && (postalCode !== undefined && postalCode !== "") && (city !== undefined && city !== ""))) {
                if (emporter || numStreet > 0) {
                    if (checkSize(lastName, 25) && checkSize(firstName, 25)) {
                        if (checkSize(street, 40) && checkSize(numStreet, 5)) {
                            if (emporter || postalCode.length === 4) {
                                if (checkSize(city, 20)) {
                                    if (checkSize(box, 10)) {
                                        if (checkSize(email, 40)) {
                                            if (message.length < 250) {
                                                if (phone.length < 13 && phone.length > 4) {
                                                    if (rgNumber.test(phone)) {
                                                        if (emporter ||rgSpecialsChar.test(numStreet)) {     
                                                            if (!rgNumber.test(lastName) && !rgNumber.test(firstName) && (emporter || (!rgNumber.test(street) && !rgNumber.test(city)))) {
                                                                if ((emporter || (rgSpecialsChar.test(numStreet) && rgSpecialsChar.test(postalCode) && (rgSpecialsChar.test(box.replace(/ /g, "")) || box === ""))) && rgSpecialsChar.test(phone.replace(/ /g, ""))) {
                                                                    if (rgEmail.test(String(email).toLowerCase())) {
                                                                        if (panier.length > 0) return true
                                                                        else return false
                                                                    } else return false
                                                                } else return false
                                                            } else return false
                                                        } else return false
                                                    } else return false
                                                } else return false
                                            } else return false
                                        } else return false
                                    } else return false
                                } else return false
                            } else return false
                        } else return false
                    } else return false
                } else return false
            } else return false
        } else return false
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        if (checked === true) {
            // if (isVerified) {
                setStart(true)

                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: "card",
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${billingDetails.lastName} ${billingDetails.firstName}`,
                        email: billingDetails.email,
                        phone: billingDetails.phone
                    }
                })
        
                if (!error) {
                    const { id } = paymentMethod

                    try {
                        axios.post(`${process.env.REACT_APP_API_URL}/payment/action`, {
                            product: panier,
                            billingDetails: billingDetails,
                            id: id
                        })
                            .then(res => {
                            changeAlertMessageBig("Succès, le paiement à été autorisé", 0)
                                const arrayStorage = Object.keys(localStorage)

                                arrayStorage.forEach(element => {
                                    if (element.includes("plat_")) reactLocalStorage.remove(element)
                                })
                                setPanier([])

                                setTimeout(() => {
                                    history.push("/")
                                }, 5000);
                            })
                            .catch(err => changeAlertMessageBig(err.response.data.error, 1))
                    }
                    catch (error) {
                        changeAlertMessage(error, 1)
                        setStart(false)
                    }
                } else {
                    changeAlertMessage(error.message, 1)
                    setStart(false)
                }
            // } else {
            //     changeAlertMessage("ReCaptcha non vérifié.")
            //     setStart(false)
            // }
        } else {
            changeAlertMessage("Veuillez confirmer les conditions générales de vente.")
            setStart(false)
        }

    }
    
    const changeAlertMessage = text => {
        setAlertMessage(text)
        if (!toggleAlertMessage) {
            setToggleAlertMessage(true)
        }
    }
    
    const changeAlertMessageBig = (text, type) => {
        setStart(false)
        setAlertMessageBig(text)
        setAlertMessageBigType(type)
        setToggleAlertMessageBig(true)
    }

    const checkSize = (value, maxSize) => {
        if (value.length < maxSize) return true
        else return false
    }

    const recaptchaLoaded = (value) => {
        setIsVerified(true)
    }

    return (
        <>
            <header>
                <NavBar />
            </header>

            <main className="panier">
            
                {toggleAlertMessageBig ? <div className="panierMessage"><MessageBig click={() => setToggleAlertMessage(false)} type={alertMessageBigType} message={alertMessageBig} /></div> : null}

                <div className="panier-left">
                    <PanierCard emporter={billingDetails.emporter} panierPage={true} payementPage={true} />
                </div>
                <div className="panier-right">
                    <form className="pr-form" onSubmit={(e) => handleSubmit(e)}>    
                        <h4>Informations bancaire</h4>
                        {start ? <div className="pr-loader"><Loader /></div> : null}
                        {toggleAlertMessage ? <MessageSmall type={1} message={alertMessage} /> : null}
                        <div className="prf-input-solo prf-cardElement">
                            <CardElement 
                                options={{
                                    iconStyle: "solid",
                                    style: {
                                        base: {                       
                                            fontFamily: "Open Sans, sans-serif",
                                            fontSize: "16px"
                                        }
                                    }
                                }}
                            />                
                        </div>
                        <div className="prf-input-solo prf-checked">
                            <input type="checkbox" name="confirmCheck" id="confirmCheck" onChange={e => setChecked(e.target.checked)} />
                            <label htmlFor="confirmCheck">J'accepte les <a href="/conditions-générales-de-vente" target="_blank">Conditions générales de vente</a></label>
                        </div>
                        <div className="contact-recaptcha">
                            {/* <ReCAPTCHA
                                sitekey={process.env.REACT_APP_RECAPTCHA_KEY_SITE}
                                onChange={recaptchaLoaded}
                            /> */}
                        </div>
                        <div className="prf-small">
                            <small>* champ obligatoire</small>
                        </div>
                        <button disabled={start} name="btnSubmit" type="submit">
                            <span className="btn-content">Continuer</span>
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}
