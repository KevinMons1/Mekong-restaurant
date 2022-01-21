import React, { useEffect, useState } from 'react'
import NavBarAdmin from '../../../components/NavBar/NavBarAdmin'
import HomeIcon from "@material-ui/icons/HomeOutlined"
import axios from "axios"
import MessageSmall from '../../../components/Services/MessageSmall'
import { Helmet } from "react-helmet"

export default function HomeAdmin() {

    const [alertMessage, setAlertMessage] = useState("")
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [load, setLoad] = useState(false)
    const [date, setDate] = useState(null)
    const [data, setData] = useState({
        total: 0,
        amount: 0
    })
    const [amount, setAmount] = useState({
        day: {
            total: 0,
            amount: 0
        },
        month: {
            total: 0,
            amount: 0
        },
        year: {
            total: 0,
            amount: 0
        }
    })

    useEffect(() => {
        const fetchData = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/orders/home`)
                .then(res => setAmount(res.data))
                .catch(err => alert("Erreur du server..."))
        }
        fetchData()
        setLoad(true)
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const rgSpecialsChar = /^[A-Za-z0-9]+$/

        
        if (date !== "") {
            const day = date.split("-")[2]
            const month = date.split("-")[1]
            const year = date.split("-")[0]
            
            if (day.length === 2 && month.length === 2 && year.length === 4) {
                if (rgSpecialsChar.test(day) && rgSpecialsChar.test(month) && rgSpecialsChar.test(year)) {

                    axios.put(`${process.env.REACT_APP_API_URL}/orders/home/choice`, {day, month, year})
                        .then(res => setData(res.data))
                        .catch(err => changeAlertMessage(err.response.data.error))

                } else changeAlertMessage("Date invalid.")
            } else changeAlertMessage("Date invalid.")
        } else changeAlertMessage("Vous devez entrer une date.")
    }

    const changeAlertMessage = text => {
        setAlertMessage(text)
        if (!toggleAlertMessage) {
            setToggleAlertMessage(true)
        }
    }

    return (
        <div className="admin-home">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>

            <header>
                <NavBarAdmin active={0} />
            </header>

            <main className="ah-main">
                <div className="ah-top">
                    <HomeIcon />
                    <h1>Home</h1>
                </div>
                {load ?
                <div className="ah-bottom">
                    <div className="ah-bottom-left">
                        <div className="ah-bl-box ah-bl-top">
                            <h3>Analyse d'aujourd'hui</h3>
                            <div className="ah-bl-box-bottom">
                                <div className="ah-bl-child">
                                    <p className="ah-child-title">Gains</p>
                                    <p className="ah-child-info">{amount.day.amount} €</p>
                                </div>
                                <div className="ah-bl-child">
                                    <p className="ah-child-title">Commandes</p>
                                    <p className="ah-child-info">{amount.day.total} commandes</p>
                                </div>
                            </div>
                        </div>
                        <div className="ah-bl-box ah-bl-center">
                            <h3>Analyse depuis le 1er du mois</h3>
                            <div className="ah-bl-box-bottom">
                                <div className="ah-bl-child">
                                    <p className="ah-child-title">Gains</p>
                                    <p className="ah-child-info">{amount.month.amount} €</p>
                                </div>
                                <div className="ah-bl-child">
                                    <p className="ah-child-title">Commandes</p>
                                    <p className="ah-child-info">{amount.month.total} commandes</p>
                                </div>
                            </div>
                        </div>
                        <div className="ah-bl-box ah-bl-bottom">
                            <h3>Analyse depuis le 1er janvier</h3>
                            <div className="ah-bl-box-bottom">
                                <div className="ah-bl-child">
                                    <p className="ah-child-title">Gains</p>
                                    <p className="ah-child-info">{amount.year.amount} €</p>
                                </div>
                                <div className="ah-bl-child">
                                    <p className="ah-child-title">Commandes</p>
                                    <p className="ah-child-info">{amount.year.total} commandes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ah-bottom-right">
                        <div className="ah-br-box">
                            {toggleAlertMessage ? <MessageSmall type={1} message={alertMessage} /> : null}
                            <h3>Analyse depuis</h3>
                            <form className="ah-br-form" onSubmit={e => handleSubmit(e)}>
                                <label htmlFor="date">Entrer la date</label>
                                <input type="date" name="date" onChange={e => setDate(e.target.value)} required/>
                                <button type="submit">
                                    <span className="btn-content">Résultat</span>
                                </button>
                            </form>
                            <div className="ah-br-result">
                                <p className="ah-child-title">Gains :</p>
                                <p className="ah-child-info">{data.amount} €</p>
                            </div>
                            <div className="ah-br-result">
                                <p className="ah-child-title">Commandes :</p>
                                <p className="ah-child-info">{data.total}</p>
                            </div>
                        </div>
                    </div>
                </div> : null}
            </main>
        </div>
    )
}
