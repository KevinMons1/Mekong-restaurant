import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { PanierContext } from '../../Contexts/PanierContext'
import { PositionContext } from '../../Contexts/PositionContext'
import { Link, useHistory } from "react-router-dom"
import { reactLocalStorage } from 'reactjs-localstorage';
import HighLightOffIcon from "@material-ui/icons/HighlightOff"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from "axios"
import MessageSmall from '../Services/MessageSmall'

let reduction = -1

export default function PanierCard({ panierPage, payementPage, isPhone, closePanier, emporter }) {

    const media500 = useMediaQuery('(max-width:500px)')
    const { panier, setPanier } = useContext(PanierContext)
    const { position } = useContext(PositionContext)
    const history = useHistory()
    const [toOrder, setToOrder] = useState(-1)
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [error, setError] = useState("")
 
    useEffect(() => {
        const fetchData = () => {
            let arrayId = []

            axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/reduction`)
                .then(res => {
                    reduction = parseInt(res.data.reduction)
                })
                .catch(err => console.log(err))

            
            const arrayStorage = Object.keys(localStorage)
            arrayStorage.forEach(element => {
                if (element.includes("plat_")) arrayId.push({id: element.split("plat_")[1]})
            })
            
            let newArrayIdToString = ""
            let count = 0

            arrayId.forEach(element => {
                if (count === 0) newArrayIdToString += `id${(count+1).toString()}=${(element.id).toString()}`
                else newArrayIdToString += `&id${(count+1).toString()}=${(element.id).toString()}`
                count++
            })
            
            if (arrayId.length > 0) {
                axios.get(`${process.env.REACT_APP_API_URL}/plats/panier/${newArrayIdToString}`)
                .then(res => {
                    let arrayData = []
                    res.data.forEach(element => {
                        arrayData.push({
                            ...element,
                            quantity: reactLocalStorage.get(`plat_${element.platId}`)
                        })
                    })
                    setData(arrayData)
                    setPanier(arrayData)
                })
                .catch(err => {
                    if (payementPage) {
                        setError("Id invalid, votre panier va être reset. Vous pouvez réessayer.")
                        arrayStorage.forEach(element => {
                            if (element.includes("plat_")) reactLocalStorage.remove(element)
                        })
                        history.push("/panier")
                    } else {
                        setError("Id invalid, votre panier va être reset. Vous pouvez réessayer.")
                        arrayStorage.forEach(element => {
                            if (element.includes("plat_")) reactLocalStorage.remove(element)
                        })
                    }
                })
            }

            axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/state/toOrder`)
                .then(res => setToOrder(res.data.toOrder))
                .catch(err => console.log(err))
        }

        fetchData()
        setLoad(true)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setData(panier)
    }, [panier])

    const handleClickQuantity = (choice, item) => {
        let newPanier = []

        if (choice === 0) {
            newPanier = panier.map(element => element.platId === item.platId 
                ? {
                    ...element,
                    quantity: element.quantity > 0 ? parseInt(element.quantity) + 1 : 0
                }
                : element
            )

            const qt = parseInt(reactLocalStorage.get(`plat_${item.platId}`)) + 1
            reactLocalStorage.set(`plat_${item.platId}`, qt);
            setPanier(newPanier)

        } else if (choice === 1) {
            newPanier = panier.map(element => element.platId === item.platId 
                ? {
                    ...element,
                    quantity: element.quantity > 0 ? parseInt(element.quantity) - 1 : 0
                }
                : element
            )

            const qt = parseInt(reactLocalStorage.get(`plat_${item.platId}`)) - 1
            if (qt > 0) reactLocalStorage.set(`plat_${item.platId}`, qt)

            // Delete if quantity = 0
            const elementFind = newPanier.find(element => parseInt(element.quantity) === 0)
            newPanier = newPanier.filter(element => parseInt(element.quantity) > 0)

            setPanier(newPanier)
            if (elementFind !== undefined) reactLocalStorage.remove(`plat_${elementFind.platId}`)
        }
    }

    const totalPriceNoReduction = () => {
        let total = 0.00
        if (data.length > 0) {
            data.forEach(element => {
                total += parseFloat(((element.quantity * parseFloat(element.price.replace(",", "."))).toFixed(2)))
            })
        }
        return `${(total).toFixed(2)} €`
    }

    const totalPriceReduction = (emporter) => {
        let total = 0.00
        data.forEach(element => {
            total += parseFloat(((element.quantity * parseFloat(element.price.replace(",", "."))).toFixed(2)))
        })
        if (emporter) return `${(total - (total * reduction) / 100).toFixed(2)} €`
        else return `${(total).toFixed(2)} €`

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

    const warningMessageHtml = (text) => {
        return <div style={{margin: "5px"}}><MessageSmall message={text} type={2} /></div>
    }

    return ( 
        <div className={isPhone ? "panierCard-phone" : "panierCard"}>
            {isPhone 
            ? <div className="pc-p-top">
                <h4>Panier</h4>
               {!media500 ? <div className="pc-p-total">
                    <p className="pc-price-text">Total à payer:</p>
                    <p className="pc-price-text"><strong>{totalPriceReduction()}</strong></p>
                </div> : null}
                {!panierPage ?
                <button className="pc-p-btn-paid">
                    <Link to="/panier" className="btn-content">Payer ({totalPriceReduction()})</Link>
                </button>
                : null}
             </div>
            : <h4>Panier</h4>}
                {load && parseInt(reduction) > -1 ?
                    data.length > 0 ?
                    <div className="pc-box">
                        {data.map((item, index) => {
                            return (
                                <div className="pc-content" key={index}>
                                    <div className="pc-left">
                                        <div className="pc-left-number">
                                            <p>{item.quantity}</p>
                                        </div>
                                        <div className="pc-left-text">
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                    <div className="pc-right">
                                        <div className="pc-right-top">
                                            <p>{((item.quantity * parseFloat(item.price.replace(",", "."))).toFixed(2))} €</p>
                                        </div>
                                       {!payementPage ? 
                                        <div className="pc-right-bottom">
                                            <button className="pc-right-bottom-bloc" name="AjouterQuantite" onClick={() => handleClickQuantity(0, item)}>
                                                <small style={{position: "absolute", opacity: 0, pointerEvents: "none"}}>Ajouter une unité</small>
                                                <AddIcon />
                                            </button>
                                            <button className="pc-right-bottom-bloc" name="RetirerQuantite" onClick={() => handleClickQuantity(1, item)}>
                                                <small style={{position: "absolute", opacity: 0, pointerEvents: "none"}}>Retirer une unité</small>
                                                <RemoveIcon />
                                            </button>
                                        </div>
                                        : null}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="pc-price">
                            <div className="pc-price-left">
                                <p className="pc-price-text">Total du panier</p>
                                {emporter ? <p className="pc-price-text">Réduction</p> : null}
                                <p className="pc-price-text">Total à payer</p>
                            </div>
                            <div className="pc-price-right">
                                <p className="pc-price-text">{totalPriceNoReduction()}</p>
                                {emporter ? <p className="pc-price-text">{`- ${reduction} %`}</p> : null}
                                <p className="pc-price-text"><strong>{totalPriceReduction(emporter)}</strong></p>
                            </div>
                        </div>
                        <small className="pc-price-message"><strong>- 10% si vous prenez à emporter !</strong></small>
                        {toOrder === 0 
                            ? warningMessageHtml("Les commandes sont suspendues pour le moment.")  
                            : position.areas.area3 && !position.areas.area2 && !position.areas.area1 && checkTotalPrice(40)
                                ? warningMessageHtml("Vous devez prendre pour un minimum de 40€")
                                : position.areas.area2 && !position.areas.area1 && checkTotalPrice(35)
                                    ? warningMessageHtml("Vous devez prendre pour un minimum de 35€")
                                    : position.areas.area1 && checkTotalPrice(30)
                                        ? warningMessageHtml("Vous devez prendre pour un minimum de 30€")
                                        : !position.areas.area1 && !position.areas.area2 && !position.areas.area3
                                            ? warningMessageHtml("Vous êtes hors des zones de livraison ou vous n'avez pas activé la géolocalisation. Vous pouvez l'activer dans les paramètres de votre navigateur.")
                                            : null
                            }
                        {!panierPage ?
                        <button className="pc-btn-paid">
                            <Link to="/panier" className="btn-content">Payer ({totalPriceReduction()})</Link>
                        </button>
                        : null}
                    </div>
                : <p>Votre panier est vide 🍤</p> 
                : error !== ""
                ? error
                : <p>Erreur du serveur... Réessayer plus tard.</p>}
            {isPhone ? <div className="pc-close"><HighLightOffIcon onClick={() => closePanier()} /></div> : null}
        </div>   
    )
}