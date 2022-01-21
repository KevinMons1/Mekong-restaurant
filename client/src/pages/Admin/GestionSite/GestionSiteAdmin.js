import React, { useState, useEffect } from 'react'
import NavBarAdmin from '../../../components/NavBar/NavBarAdmin'
import PolicyIcon from "@material-ui/icons/PolicyOutlined"
import MessageSmall from "../../../components/Services/MessageSmall"
import axios from "axios"
import { Helmet } from "react-helmet"

export default function GestionSiteAdmin() {
    const [reduction, setReduction] = useState(-1)
    const [message, setMessage] = useState("")
    const [alertMessageSpawn, setAlertMessageSpawn] = useState([])
    const [dataFetch, setDataFetch] = useState(null)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetch()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    const fetch = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/all`)
            .then(res => {
                setDataFetch(res.data)
                setLoad(true)
            })
            .catch(err => changeAlertMessage("Une erreur s'est produite, réssayer plus tard.", 1))
    }

    const handleClickToOrder = (state) => {
        axios.put(`${process.env.REACT_APP_API_URL}/gestion-site/toOrder/change/${state}`)
            .then(res => {
                changeAlertMessage(res.data.message, 0)
                setDataFetch({
                    ...dataFetch,
                    toOrder: state.toString()
                })
            })
            .catch(err => changeAlertMessage("Une erreur s'est produite, réssayer plus tard.", 1))
    } 

    const handleClickSeeOrder = (state) => {
        axios.put(`${process.env.REACT_APP_API_URL}/gestion-site/seeOrder/change/${state}`)
            .then(res => {
                changeAlertMessage(res.data.message, 0)
                setDataFetch({
                    ...dataFetch,
                    seeOrder: state.toString()
                })
            })
            .catch(err => changeAlertMessage("Une erreur s'est produite, réssayer plus tard.", 1))
    } 

    const handleClickReduction = () => {
        if (typeof reduction === "number") {
            if (reduction !== -1) {
                if (reduction >= 0) {
                    axios.put(`${process.env.REACT_APP_API_URL}/gestion-site/reduction/change/${reduction}`)
                    .then(res => {
                        changeAlertMessage(res.data.message, 0)
                        setDataFetch({
                            ...dataFetch,
                            reduction: reduction
                        })
                    })
                    .catch(err => changeAlertMessage("Une erreur s'est produite, réssayer plus tard.", 1))
                } else changeAlertMessage("Vous ne pouvez pas mettre de chiffre négagtif.", 1)
            } else changeAlertMessage("Vous n'avez pas mis de nombre.", 1)        
        } else changeAlertMessage("La réduction doit être un nombre.", 1)
    } 

    const handleClickMessage = (state) => {
        if (state === 0 || state === 1) {
            axios.put(`${process.env.REACT_APP_API_URL}/gestion-site/message/change/state/${state}`)
            .then(res => {
                changeAlertMessage(res.data.message, 0)
                setDataFetch({
                    ...dataFetch,
                    messageVisibility: state.toString()
                })
            })
            .catch(err => changeAlertMessage("Une erreur s'est produite, réssayer plus tard.", 1))
        } else if (state === 2) {
            if (message !== "") {
                if (message.length < 200) {
                    axios.put(`${process.env.REACT_APP_API_URL}/gestion-site/message/change/text`, { message })
                        .then(res => {
                            changeAlertMessage(res.data.message, 0)
                            setDataFetch({
                                ...dataFetch,
                                message: message
                            })
                        })
                        .catch(err => changeAlertMessage(err.response.data.error, 1))
                } else changeAlertMessage("Votre message ne peut pas dépasser 200 caractères.", 1)
            } else changeAlertMessage("Votre message est vide.", 1)
        }
    }

    const changeAlertMessage = (text, type) => {
        setAlertMessageSpawn(alertMessageSpawn => [...alertMessageSpawn, {
            message: text,
            type: type,
            disparition: true
        }])
    }

    return (
        <div className="admin-site">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            
             <header>
                <NavBarAdmin active={3} />
            </header>

            {load ?
                <main className="as-main">
                <div className="as-main-messages">
                    {alertMessageSpawn.map((item, index) => {
                        return (
                            <div className="as-main-message" key={index}>
                                <MessageSmall type={item.type} message={item.message} disparition={item.disparition} />
                            </div>
                        )
                    })}
                </div>

                <div className="as-top">
                    <PolicyIcon />
                    <h1>Gestion du site</h1>
                </div>
                <div className="as-bottom">
                    <div className="as-box as-box1">
                        <div className="as-box-left">
                            <h3>Mettre en <strong>suspens</strong> les commandes</h3>
                            <small>Un message avertira que les commandes sont interrompues pour le moment</small>
                            <p>État actuel : <strong>{(dataFetch.toOrder).toString() === "0" ? "Non disponible" : "Disponible"}</strong></p>
                        </div>
                        <div className="as-box-right">
                            <button type="button" className="as-btn1" onClick={() => handleClickToOrder(1)}>
                                <span>Mettre en disponible</span>
                            </button>
                            <button type="button" className="as-btn3" onClick={() => handleClickToOrder(0)}>
                                <span>Mettre en suspens</span>
                            </button>
                        </div>
                    </div>

                    <div className="as-box as-box2">
                        <div className="as-box-left">
                            <h3>Afficher la <strong>possibilité</strong> de commander</h3>
                            <small>L'onglet panier sera visible/invisible, il ne sera pas possible et visible de commander</small>
                            <p>État actuel : <strong>{(dataFetch.seeOrder).toString() === "0" ? "Non visible" : "Visible"}</strong></p>
                        </div>
                        <div className="as-box-right">
                            <button type="button" className="as-btn1" onClick={() => handleClickSeeOrder(1)}>
                                <span>Rendre visible</span>
                            </button>
                            <button type="button" className="as-btn3" onClick={() => handleClickSeeOrder(0)}>
                                <span>Rendre non visible</span>
                            </button>
                        </div>
                    </div>

                    <div className="as-box as-box3">
                        <div className="as-box-left">
                            <h3>Changer la <strong>réduction</strong> pour emporter</h3>
                            <small>La réduction donnée au commandes prise à emporter</small>
                            <p>État actuel : <strong>{dataFetch.reduction} %</strong></p>
                        </div>
                        <div className="as-box-right as-box-btn-input">
                        <input onChange={e => setReduction(parseInt(e.target.value))} type="number" placeholder="..." name="reduction" className="as-input"
                            />
                            <button type="button" className="as-btn2" onClick={() => handleClickReduction()}>
                                <span>Modifier</span>
                            </button>
                        </div>
                    </div>

                    <div className="as-box as-box4">
                        <div className="as-box-left">
                            <h3>Afficher un <strong>message</strong> d'avertissement sur la page menus</h3>
                            <small>Un message d'indication. Exemple : Il sera bientôt possible de commander !</small>
                            <p>État actuel : <strong>{(dataFetch.messageVisibility).toString() === "0" ? "Non visible" : "Visible"}</strong></p>
                            <p>Message afficher : <strong>{dataFetch.message}</strong></p>
                        </div>
                        <div className="as-box-right as-box-btn-input">
                            <input type="text" placeholder="Message ..." name="message" className="as-input as-input-message" onChange={e => setMessage(e.target.value)}/>
                            <div className="as-box-btn">
                                <button type="button" className="as-btn1" onClick={() => handleClickMessage(1)}>
                                    <span>Rendre visible</span>
                                </button>
                                <button type="button" className="as-btn2" onClick={() => handleClickMessage(2)}>
                                    <span>Modifier</span>
                                </button>
                                <button type="button" className="as-btn3" onClick={() => handleClickMessage(0)}>
                                    <span>Rendre non visible</span>
                                </button>                      
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        : null}
        </div>
    )
}
