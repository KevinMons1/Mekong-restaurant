import React, { useEffect, useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import PanierCard from "../../components/PanierCard/PanierCard"
import MessageSmall from '../../components/Services/MessageSmall'
import { PanierContext } from '../../Contexts/PanierContext'
import { PositionContext } from '../../Contexts/PositionContext'
import axios from "axios"
import Loader from '../../components/Services/Loader'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Helmet } from "react-helmet"

export default function Panier() {

    const media1024 = useMediaQuery('(max-width:1024px)')
    const lastNameRef = useRef(null)
    const firstNameRef = useRef(null)
    const streetRef = useRef(null)
    const numStreetRef = useRef(null)
    const postalCodeRef = useRef(null)
    const cityRef = useRef(null)
    const boxRef = useRef(null)
    const phoneRef = useRef(null)
    const hourDeliverRef = useRef(null)
    const emailRef = useRef(null)
    const messageRef = useRef(null)
    const history = useHistory()
    const { panier } = useContext(PanierContext)
    const { position } = useContext(PositionContext)
    const [alertMessage, setAlertMessage] = useState("")
    const [reduction, setReduction] = useState(0)
    const [load, setLoad] = useState(false)
    const [toOrder, setToOrder] = useState(-1)
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [ open ] = useState([new Date().getDay(), new Date().getHours(), new Date().getMinutes()])
    const arrayRef = [lastNameRef, firstNameRef, streetRef, numStreetRef, postalCodeRef, cityRef, boxRef, phoneRef, hourDeliverRef, emailRef, messageRef]
    const [data, setData] = useState({
        lastName: "",
        firstName: "",
        street: "",
        numStreet: "",
        postalCode: "",
        city: "",
        box: "",
        phone: "",
        hourDeliver: "",
        email: "",
        message: "",
        emporter: false
    })

    useEffect(() => {
       const fetchData = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/state/toOrder`)
            .then(res => {
                setToOrder(res.data.toOrder)
                setLoad(true)
            })
            .catch(err => console.log(err))

        await axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/reduction`)
            .then(res => {
                setReduction(parseInt(res.data.reduction))
            })
            .catch(err => console.log(err))
       }
       fetchData()
    }, [])

    const handleClickInput = (index, e) => {
        if (e.target.value.length > 0) {
            if (index === 10) arrayRef[index].current.classList.add("animTextArea")
            else arrayRef[index].current.classList.add("animLabel")
        } else if (e.target.value.length === 0) {
            if (index === 10) arrayRef[index].current.classList.remove("animTextArea")
            else arrayRef[index].current.classList.remove("animLabel")
        }
    }
   
    const handleSubmit = e => {
        e.preventDefault()

        const { lastName, firstName, street, numStreet, postalCode, city, box, phone, hourDeliver, email, message } = data
        const rgNumber = /^[0-9]*$/
        const rgSpecialsChar = /^[A-Za-z0-9^éè,-.ôùç'à?]+$/
        const rgEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

        if (lastName !== "" && firstName !== "" && phone !== "" && hourDeliver !== "" && email !== "") {
            if (data.emporter || (street !== "" && numStreet !== "" && postalCode !== "" && city !== "")) {
                if (data.emporter || numStreet > 0) {
                    if (checkSize(lastName, 25) && checkSize(firstName, 25)) {
                        if (checkSize(street, 40) && checkSize(numStreet, 5)) {
                            if (data.emporter || postalCode.length === 4) {
                                if (checkSize(city, 20)) {
                                    if (checkSize(box, 10)) {
                                        if (checkSize(email, 40)) {
                                            if (message.length < 250) {
                                                if (phone.length < 13 && phone.length > 4) {
                                                    if (rgNumber.test(phone)) {
                                                        if (data.emporter || rgSpecialsChar.test(numStreet)) {                         
                                                            if (!rgNumber.test(lastName) && !rgNumber.test(firstName) && (data.emporter || (!rgNumber.test(street) && !rgNumber.test(city)))) {
                                                                if ((data.emporter || (rgSpecialsChar.test(numStreet) && rgSpecialsChar.test(postalCode) && (rgSpecialsChar.test(box.replace(/ /g, "")))) || box === "") && rgSpecialsChar.test(phone.replace(/ /g, ""))) {
                                                                    if (rgEmail.test(String(email).toLowerCase())) {
                                                                        if (panier.length > 0) {
                                                                            history.push("/panier/paiement", data)
                                                                        } else changeAlertMessage("Votre panier est vide, vous ne pouvez donc pas commander.")
                                                                    } else changeAlertMessage("Adresse mail invalide")
                                                                } else changeAlertMessage("N'utilisez pas de caractères spéciaux.")
                                                            } else changeAlertMessage("Chiffre interdit pour le nom de famille, le prénom, la rue et la ville")
                                                        } else changeAlertMessage("Votre numéro de rue n'est pas valide.")
                                                    } else changeAlertMessage("Votre numéro de téléphone ne peut avoir que des chiffres.")
                                                } else changeAlertMessage("Votre numéro de téléphone n'est pas valide.")
                                            } else changeAlertMessage("Mesage complémentaire ne peut pas dépasser 150 caractères")
                                        } else changeAlertMessage("Adresse mail ne peut pas dépasser 40 caractères")
                                    } else changeAlertMessage("Votre boite est trop longue.")
                                } else changeAlertMessage("Nom de ville trop long.")
                            } else changeAlertMessage("Votre code postal doit contenir 4 chiffres.")
                        } else changeAlertMessage("Nom de rue ou numéro de rue trop long.")
                    } else changeAlertMessage("Nom de famille ou prénom trop long.")
                } else changeAlertMessage("Votre numéro de rue ne peut pas être inférieur à 0.")
            } else changeAlertMessage("Vous devez remplir tous les champs obligatoires.")
        } else changeAlertMessage("Vous devez remplir tous les champs obligatoires.")
    }

    const changeAlertMessage = text => {
        setAlertMessage(text)
        if (!toggleAlertMessage) {
            setToggleAlertMessage(true)
        }
    }
    
    const checkSize = (value, maxSize) => {
        if (value.length < maxSize) return true
        else return false
    }

    const warningMessageHtml = (text) => {
        return <div style={{margin: "5px"}}><MessageSmall message={text} type={2} /></div>
    }

    const checkTotalPrice = (min) => {
        let productPrice = 0
        panier.forEach(element => {
            let priceReplace = element.price.replace(",", ".")
            productPrice += (parseFloat(priceReplace) * parseInt(element.quantity))
        })
        if ((productPrice - (productPrice / 100) * reduction).toFixed(2) <= min) return true
        else return false
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="Restauration thaïlandaise à Namur, vous ne serez pas déçu de votre livraison ! Réduction à chaque commande." />
            </Helmet>

            <header>
                <NavBar />
            </header>

            <main className="panier">
                <div className="panier-left">
                    <PanierCard panierPage={true} emporter={data.emporter} />
                </div>
                <div className="panier-right">
                    {load ? 
                        <form className="pr-form" onSubmit={(e) => handleSubmit(e)}>
                            <h4>Informations personnelles</h4>
                            {toggleAlertMessage ? <MessageSmall type={1} message={alertMessage} /> : null}
                            <div className="prf-input-check">
                                <input onChange={() => setData({...data, emporter: !data.emporter})} className="prf-input-check" type="checkbox" name="emporter" id="emporter"/>
                                <label className="prf-label-check" htmlFor="emporter">Prendre à emporter</label>
                            </div>
                            <div className="prf-input-double">
                                <div className="prf-input-double-left">
                                    <label ref={lastNameRef} className="prf-label" htmlFor="lastName">Nom de famille *</label>
                                    <input onInput={(e) => handleClickInput(0, e)} onChange={e => setData({...data, lastName: e.target.value})} className="prf-input" type="text" name="lastName" id="lastName" required/>
                                </div>
                                <div className="prf-input-double-right">
                                    <label ref={firstNameRef} className="prf-label" htmlFor="firstName">Prénom *</label>
                                    <input onInput={(e) => handleClickInput(1, e)} onChange={e => setData({...data, firstName: e.target.value})} className="prf-input" type="text" name="firstName" id="firstName" required/>
                                </div>
                            </div>
                            <div className={!data.emporter ? "prf-input-double" : "prf-input-double emporter"}>
                                <div className="prf-input-double-left">
                                    <label ref={streetRef} className="prf-label" htmlFor="street">Rue *</label>
                                    {!data.emporter 
                                        ? <input onInput={(e) => handleClickInput(2, e)} onChange={e => setData({...data, street: e.target.value})} className="prf-input" type="text" name="street" id="street" required/>
                                        : <input onInput={(e) => handleClickInput(2, e)} onChange={e => setData({...data, street: e.target.value})} className="prf-input" type="text" name="street" id="street" value=""/>
                                    }
                                </div>
                                <div className="prf-input-double-right">
                                    <label ref={numStreetRef} className="prf-label" htmlFor="number">Numéro de rue *</label>
                                    {!data.emporter
                                        ? <input onInput={(e) => handleClickInput(3, e)} onChange={e => setData({...data, numStreet: e.target.value})} className="prf-input" type="text" name="number" id="number" required/>
                                        : <input onInput={(e) => handleClickInput(3, e)} onChange={e => setData({...data, numStreet: e.target.value})} className="prf-input" type="text" name="number" id="number" value="" />
                                    }
                                    </div>
                            </div>
                            <div className={!data.emporter ? "prf-input-double" : "prf-input-double emporter"}>
                                <div className="prf-input-double-left">
                                    <label ref={postalCodeRef} className="prf-label" htmlFor="postalCode">Code postal *</label>
                                    {!data.emporter
                                        ? <input onInput={(e) => handleClickInput(4, e)} onChange={e => setData({...data, postalCode: e.target.value})} className="prf-input" type="number" name="postalCode" id="postalCode" required/>
                                        : <input onInput={(e) => handleClickInput(4, e)} onChange={e => setData({...data, postalCode: e.target.value})} className="prf-input" type="number" name="postalCode" id="postalCode" value="" />
                                    }
                                    </div>
                                <div className="prf-input-double-right">
                                    <label ref={cityRef} className="prf-label" htmlFor="city">Ville *</label>
                                    {!data.emporter
                                        ? <input onInput={(e) => handleClickInput(5, e)} onChange={e => setData({...data, city: e.target.value})} className="prf-input" type="text" name="city" id="city" required/>
                                        : <input onInput={(e) => handleClickInput(5, e)} onChange={e => setData({...data, city: e.target.value})} className="prf-input" type="text" name="city" id="city" value="" />
                                    }
                                    </div>
                            </div>
                            <div className="prf-input-double">
                                <div className={!data.emporter ? "prf-input-double-left" : "prf-input-double-left emporter"}>
                                    <label ref={boxRef} className="prf-label" htmlFor="box">Boite</label>
                                    {!data.emporter
                                        ? <input onInput={(e) => handleClickInput(6, e)} onChange={e => setData({...data, box: e.target.value})} className="prf-input" type="text" name="box" id="box" />
                                        : <input onInput={(e) => handleClickInput(6, e)} onChange={e => setData({...data, box: e.target.value})} className="prf-input" type="text" name="box" id="box" value="" />
                                    }
                                    </div>
                                <div className="prf-input-double-right">
                                    <label ref={phoneRef} className="prf-label" htmlFor="phone">Téléphone *</label>
                                    <input onInput={(e) => handleClickInput(7, e)} onChange={e => setData({...data, phone: e.target.value})} className="prf-input" type="number" name="phone" id="phone" required/>
                                </div>
                            </div>
                            <div className="prf-input-double">
                                <div className="prf-input-double-left">
                                    <label ref={hourDeliverRef} className="prf-label" htmlFor="hour">{media1024 ? "Livrer à *" : "Choisir l'heure *"}</label>
                                    <select onInput={(e) => handleClickInput(8, e)} onChange={e => setData({...data, hourDeliver: e.target.value})} name="hour" id="hour" required>
                                        <option value=""></option>
                                        <option value="12h00-14h00">Entre 12h00 et 14h00</option>
                                        <option value="Après 18h00">Entre 18h00 et (20h00-21h00)</option>
                                    </select>
                                </div>
                                <div className="prf-input-double-right">
                                    <label ref={emailRef} className="prf-label" htmlFor="email">Adresse mail *</label>
                                    <input onInput={(e) => handleClickInput(9, e)} onChange={e => setData({...data, email: e.target.value})} className="prf-input" type="email" name="email" id="email" required/>
                                </div>
                            </div>
                            <small>Nous vous appellerons pour fixer une heure dans le créneau choisi suivant nos disponibilités</small>
                            <div className="prf-input-solo prf-message">
                                <label ref={messageRef} className="prf-label-textarea" htmlFor="additionalMessage">Message complémentaire ...</label>
                                <textarea onInput={(e) => handleClickInput(10, e)} onChange={e => setData({...data, message: e.target.value})} className= "prf-textArea" name="additionalMessage" id="additionalMessage" cols="30" rows="5"></textarea>
                            </div>
                            <div className="prf-small">
                                <small>* champ obligatoire <br /> vous allez payer pour être livrer aujourd'hui</small>
                            </div>
                           {toOrder === 0 
                            ? warningMessageHtml("Les commandes sont suspendues pour le moment.")  
                            : (parseInt(open[0]) === 1 || parseInt(open[0]) === 2)
                                ? warningMessageHtml("Nous sommes fermer le lundi et mardi")
                                : position.areas.area3 && !position.areas.area2 && !position.areas.area1 && checkTotalPrice(40)
                                    ? warningMessageHtml("Vous devez prendre pour un minimum de 40€")
                                    : position.areas.area2 && !position.areas.area1 && checkTotalPrice(35)
                                        ? warningMessageHtml("Vous devez prendre pour un minimum de 35€")
                                        : position.areas.area1 && checkTotalPrice(1)
                                            ? warningMessageHtml("Vous devez prendre pour un minimum de 30€")
                                            : !position.areas.area1 && !position.areas.area2 && !position.areas.area3
                                                ? warningMessageHtml("Vous êtes hors des zones de livraison ou vous n'avez pas activé la géolocalisation. Vous pouvez l'activer dans les paramètres de votre navigateur.")
                                                : <button name="btnSubmit" type="submit">
                                                        <span className="btn-content">Continuer</span>
                                                    </button>
                            }
                        </form> 
                    : <Loader />}
                </div>
            </main>

            <Footer />
        </>
    )
}
