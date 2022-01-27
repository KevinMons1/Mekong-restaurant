import React, { useState, useEffect } from 'react'
import NotificationCircle from "../../../components/Services/NotificationCircle"
import NavBarAdmin from '../../../components/NavBar/NavBarAdmin'
import MotorcycleIcon from "@material-ui/icons/MotorcycleOutlined"
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmptyOutlined"
import CheckCircleIcon from "@material-ui/icons/CheckCircleOutline"
import ErrorIcon from "@material-ui/icons/ErrorOutline"
import CancelIcon from "@material-ui/icons/CancelOutlined"
import SeeCommande from '../../../components/SeeCommande/SeeCommande'
import MessageSmall from "../../../components/Services/MessageSmall"
import axios from "axios"
import moment from "moment"
import "moment/locale/fr"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Helmet } from "react-helmet"

// const socket = io(process.env.REACT_APP_URL, {
//     forceNew : false , 
//     secure : true ,
//     transports: [ 'websocket' ] 
// })

export default function CommandesAdmin() {

    const media650 = useMediaQuery('(max-width:650px)')
    const [toggleSeeCommande, setToggleSeeCommande] = useState(false)
    const [seeCommandeCard, setSeeCommandeCard] = useState(null)
    const [alertMessageSpawn, setAlertMessageSpawn] = useState([])
    const [load, setLoad] = useState(false)
    const [data, setData] = useState([])   
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [dataToday, setDataToday] = useState([])   
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/orders/all`)
            .then(res => {
                let dataArray = []
                res.data.data.forEach(element => {
                    dataArray.push({
                        ...element,
                        isNew: false
                    })
                })
                setTotal(res.data.total)
                setData(dataArray)
                // listenSocket()
                })
                .catch(err => changeAlertMessage("Erreur du serveur...", 1))

            await axios.get(`${process.env.REACT_APP_API_URL}/orders/today`)
                .then(res => setDataToday(res.data))
                .catch(err => changeAlertMessage("Erreur du serveur...", 1))
        }
        fetchData()
        setLoad(true)
    }, [])

    const handleClickState = (choice, id, state) => {
        axios.put(`${process.env.REACT_APP_API_URL}/orders/change/state/${choice}-${id}`)
            .then(res => {
                changeAlertMessage(res.data, 0)
                setData(data => data.map(element => element.orderInfo.orderId === id 
                    ? {
                        ...element,
                        orderInfo: {
                            ...element.orderInfo,
                            state: choice
                        }
                    }
                    : element
                    ))

                if (choice === 1) {
                   if (state === 0) {
                    setDataToday({
                        total: dataToday.total,
                        delivered: dataToday.delivered + 1,
                        inDelivery: dataToday.inDelivery - 1 
                    })
                   } else if (state === 2) {
                    setDataToday({
                        total: dataToday.total,
                        delivered: dataToday.delivered + 1,
                        inDelivery: dataToday.inDelivery 
                    })
                   }
                } else if (choice === 2) {
                    if (state === 0) {
                        setDataToday({
                            total: dataToday.total,
                            delivered: dataToday.delivered,
                            inDelivery: dataToday.inDelivery - 1
                        })
                    } else if (state === 1) {
                        setDataToday({
                            total: dataToday.total,
                            delivered: dataToday.delivered - 1,
                            inDelivery: dataToday.inDelivery
                        })
                    }
                }
            })
            .catch(err => changeAlertMessage(err.response.data.error, 1))
    }

    const handleDelete = item => {
        let orderContentIds = ""

        item.orderContent.forEach(element => {
            orderContentIds += `${element.orderContentId}-`
        })

        axios.delete(`${process.env.REACT_APP_API_URL}/orders/delete`, {
            headers: {
                Authorization: "***"
            }, 
            data: {
                clientId: item.client.clientId,
                orderContentIds: orderContentIds,
                orderId: item.orderInfo.orderId,
            }
        })
            .then(res => {
                changeAlertMessage(res.data, 0)
                setData(data => data.filter(element => element.orderInfo.orderId !== item.orderInfo.orderId))
            })
            .catch(err => changeAlertMessage(err.response.data.error, 1))
    }

    const handleChangePage = nbr => {
        const nbrItem = parseInt(nbr) === 1 ? 30 : (parseInt(nbr) * 30).toFixed(0)
        setPage(nbr)

        axios.get(`${process.env.REACT_APP_API_URL}/orders/page/${nbrItem}`)
            .then(res => {
                let dataArray = []
                res.data.data.forEach(element => {
                    dataArray.push({
                        ...element,
                        isNew: false
                    })
                })
                parseInt(nbr) === 1 ? setData(dataArray.slice(0, 30)) : setData(dataArray.slice(nbrItem * 4, (nbrItem * 4) + 30))
            })
            .catch(err => changeAlertMessage("Erreur du serveur..."))
    }

//     const listenSocket = () => {
//         // get new order
//         socket.on("sendCommande", newData => {
//             setData(data => [newData, ...data])
//         })
//    }

    const handleClickSee = (item) => {
        setSeeCommandeCard(<SeeCommande data={item} toggleSeeCommande={() => setToggleSeeCommande(false)} />)  
        setToggleSeeCommande(true)
    }

    const changeAlertMessage = (text, type) => {
        setAlertMessageSpawn(alertMessageSpawn => [...alertMessageSpawn, {
            message: text,
            type: type,
            disparition: true
        }])
    }

    return (
        <div className="admin-commandes">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>

            {toggleSeeCommande ? seeCommandeCard : null}

            <header>
                <NavBarAdmin active={1} />
            </header>

            <main className="ac-main">
                <div className="ac-top">
                    <MotorcycleIcon />
                    <h1>Commandes</h1>
                </div>
                <div className="ac-bottom">
                    <div className="ac-main-messages">
                        {alertMessageSpawn.map((item, index) => {
                                return (
                                    <div className="ac-main-message" key={index}>
                                        <MessageSmall type={item.type} message={item.message} disparition={item.disparition} />
                                    </div>
                                )
                            })}
                    </div>
                    <div className="ac-info">
                        <div className="ac-info-left">
                            <div>
                                <div className="ac-state-time">
                                    <HourglassEmptyIcon />
                                </div>
                                <p>En cours</p>
                            </div>
                            <div>
                                <div className="ac-state-success">
                                    <CheckCircleIcon />
                                </div>
                                <p>Livré</p>
                            </div>
                            <div>
                                <div className="ac-state-error">
                                    <ErrorIcon />
                                </div>
                                <p>Jamais livré</p>
                            </div>
                        </div>
                        <div className="ac-info-center">
                            <div className="ac-ic-notif">
                                <div className="ac-ic-circle"></div>
                                <p>Nouvelles commandes</p>
                            </div>
                            <small>Elle dispraît après 10 minutes</small>
                        </div>
                        <div className="ac-info-right">
                            <p>Commandes passé aujourd'hui: <strong>{load ? dataToday.total : null}</strong></p>
                            <p>Commandes livré aujourd'hui: <strong>{load ? dataToday.delivered : null}</strong></p>
                            <p>Commandes en cours de livraison: <strong>{load ? dataToday.inDelivery : null}</strong></p>
                        </div>
                    </div>
                    <table>
                        <caption style={{opacity: 0.6}}>L'id revient à 0 tout les 1er du mois</caption>
                        <thead>
                            <tr>
                                <th>{media650 ? "H. payé" : "Heure payé"}</th>
                                <th>Choix</th>
                                <th>{media650 ? "Info." : "Informations"}</th>
                                <th>État</th>
                                <th>Date</th>
                                <th>{media650 ? "Supp." : "Supprimer"}</th>
                            </tr>
                        </thead>
                        <tbody>
                           {load && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr className={index % 2 === 0 ? "ac-tr-grey" : null} key={index}>
                                        <td className="ac-new">
                                            {(moment(item.client.hourPaid).format('LT')).replace(":", "h")}
                                            {item.isNew ? <NotificationCircle /> : null}
                                        </td>
                                        <td>{item.orderInfo.emporter === "1" ? `(Emporter) ${item.client.hourDeliver}` : `(Livrer) ${item.client.hourDeliver}`}</td>
                                        <td className="ac-see">
                                            <button onClick={() => handleClickSee(item)}>Voir</button>
                                        </td>
                                        <td className="ac-state">
                                           {item.orderInfo.state === 0
                                            ?  <div className="ac-state-time"><HourglassEmptyIcon /></div>
                                            : item.orderInfo.state === 1 
                                             ?  <div className="ac-state-success"><CheckCircleIcon /></div>
                                             :  <div className="ac-state-error"><ErrorIcon /></div>}
                                            <button><CheckCircleIcon onClick={() => handleClickState(1, item.orderInfo.orderId, item.orderInfo.state)} /></button>
                                            <button><ErrorIcon onClick={() => handleClickState(2, item.orderInfo.orderId, item.orderInfo.state)} /></button>
                                        </td>
                                        <td>{moment(item.orderInfo.date).format('DD-MM-YYYY')}</td>
                                        <td className="ac-delete">
                                            <button><CancelIcon onClick={() => handleDelete(item)} /></button>
                                        </td>
                                    </tr> 
                                )
                            }) 
                        : null}                          
                        </tbody>
                    </table>
                    <div className="ac-pages">
                        {page === 1 ? <button className={page === 1 ? "ac-pages-active" : null} onClick={() => handleChangePage(1)}>1</button> : null}
                        {page > 2 ? <button onClick={() => handleChangePage(1)}>1</button> : null}
                        {page > 1 ? <button onClick={() => handleChangePage(page - 1)}>{page - 1}</button> : null}
                        {page > 1 ? <button className="ac-pages-active" onClick={() => handleChangePage(page)}>{page}</button> : null}
                        {parseInt(page) < (total / 30).toFixed(0) ? <button onClick={() => handleChangePage(page + 1)}>{page + 1}</button> : null}
                        {parseInt(page) < (total / 30).toFixed(0) ? <button onClick={() => handleChangePage((total / 30).toFixed(0))}>...{(total / 30).toFixed(0)}</button> : null}
                    </div>
                </div>
            </main>
        </div>
    )
}
