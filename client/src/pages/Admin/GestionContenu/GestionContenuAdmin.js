import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import NavBarAdmin from '../../../components/NavBar/NavBarAdmin'
import EditIcon from "@material-ui/icons/EditOutlined"
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined"
import CancelIcon from "@material-ui/icons/CancelOutlined"
import NotInterestedIcon from "@material-ui/icons/NotInterestedOutlined"
import SearchIcon from '@material-ui/icons/Search'
import Filter from '../../../components/Filter/Filter'
import axios from 'axios'
import Loader from "../../../components/Services/Loader"
import MessageSmall from "../../../components/Services/MessageSmall"
import MenusContent from '../../MenusCommander/MenusContent'
import { Helmet } from "react-helmet"

export default function GestionContenuAdmin() {

    const [toggleFilter, setToggleFilter] = useState(true)
    const [alertMessageSpawn, setAlertMessageSpawn] = useState([])
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [filterDataEmpty, setFilterDataEmpty] = useState(-1)

    useEffect(() => {
        const fetch = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/plats/all`)
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }
        fetch()
        setLoad(true)
    }, [])

    const handleClickVisibility = (state, id) => {
        axios.put(`${process.env.REACT_APP_API_URL}/gestion-contenu/visibility/${state}-${id}`)
            .then(res => {
                changeAlertMessage(res.data.message, 0)
                const newData = data.map((element, index) => element.plat.platId === id 
                    ? {
                        plat: {
                            ...data[index].plat,
                            visibility: state
                        },
                        category: {...data[index].category},
                        isVegan: data[index].isVegan
                    }
                    : element)
                setData(newData)
            })
            .catch(err => changeAlertMessage(err.response.data.error, 1))
    } 

    const handleClickAvailable = (state, id) => {
        axios.put(`${process.env.REACT_APP_API_URL}/gestion-contenu/available/${state}-${id}`)
            .then(res => {
                changeAlertMessage(res.data.message, 0)
                const newData = data.map((element, index) => element.plat.platId === id 
                    ? {
                        plat: {
                            ...data[index].plat,
                            available: state
                        },
                        category: {...data[index].category},
                        isVegan: data[index].isVegan
                    }
                    : element)
                setData(newData)
            })
            .catch(err => changeAlertMessage("Une erreur s'est produite, réssayer plus tard.", 1))
    } 

    const handleClickDelete = id => {
        axios.delete(`${process.env.REACT_APP_API_URL}/gestion-contenu/delete/${id}`)
            .then(res => {
                console.log(res)
                changeAlertMessage(res.data.message, 0)
                const newData = data.map(element => element.plat.platId === id 
                    ? null              
                    : element)
                console.log(newData)
                const newDataFilter = newData.filter(element => element !== null)
                setData(newDataFilter)
            })
            .catch(err => console.log(err)) // changeAlertMessage(err.response.data.error, 1)
    }

    const changeAlertMessage = (text, type) => {
        setAlertMessageSpawn(alertMessageSpawn => [...alertMessageSpawn, {
            message: text,
            type: type,
            disparition: true
        }])
    }

    const handleFilter = newData => {
        let newDataFilter = []
        let newDataFilterPepper = []
        let dataFilter

        // Categorys filter
        data.forEach(element => {
            if (newData.categorys.length > 0) {
                newData.categorys.forEach(element2 => {
                    if (element.category.categoryNameId === element2.nbr) {
                        dataFilter = data.filter(item => item.category.categoryNameId === element2.nbr)
                        newDataFilter = [...newDataFilter, ...dataFilter]
                    }
                })
                // all categorys
            } else newDataFilter = data
        })
        newDataFilter = [...new Set(newDataFilter)]
        
        // Pepper filter
        newDataFilter.forEach(element => {
            if (newData.pepper.length > 0) {
                newData.pepper.forEach(element2 => {
                    if (element.plat.pepper === element2) {
                        dataFilter = newDataFilter.filter(item => item.plat.pepper === element2)
                        newDataFilterPepper = [...newDataFilterPepper, ...dataFilter]
                    }
                })
            } else newDataFilterPepper = newDataFilter
        })
        newDataFilter = [...new Set(newDataFilterPepper)]

        newDataFilter = newDataFilter.filter(element => {
            let price = parseFloat((element.plat.price).replace(",", "."))
            return price >= newData.minimum && price <= newData.maximum
        })

        newDataFilter = [...new Set(newDataFilter)]

        if (newDataFilter.length === 0) setFilterDataEmpty(0)
        else if (newDataFilter.length > 0) setFilterDataEmpty(1)

        setFilterData(newDataFilter)
    }

    return (
        <div className="admin-gestionContenu">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            
            {!toggleFilter ? <Filter hide={toggleFilter} setFilter={(newData) => handleFilter(newData)} toggleFilter={() => setToggleFilter(!toggleFilter)} /> : null}

            <header>
                <NavBarAdmin active={2} />
            </header>

            <main className="agc-main">
                <div className="agc-main-messages">
                    {alertMessageSpawn.map((item, index) => {
                        return (
                            <div className="agc-main-message" key={index}>
                                <MessageSmall type={item.type} message={item.message} disparition={item.disparition} />
                            </div>
                        )
                    })}
                </div>

                <div className="agc-top">
                    <EditIcon />
                    <h1>Gestion du contenu</h1>
                </div>
                <div className="agc-bottom">
                    <div className="agc-info">
                        <button name="btnFiltrer" onClick={() => setToggleFilter(!toggleFilter)}>
                            <div className="btn-content">
                                <SearchIcon className="btn-icon"/>
                                <span>Filtrer</span>
                            </div>
                        </button>
                        <Link to="/admin/gestion-contenu/ajout">
                            <div className="btn-content">
                                <span>Ajouter un plat</span>
                            </div>
                        </Link>
                        <div className="agc-info-legend">
                            <div className="agc-info-legend-box">
                                <div className="agc-info-legend-icon agc-edit"><EditIcon /></div>
                                <p>Modifier</p>
                            </div>
                            <div className="agc-info-legend-box">
                                <div className="agc-info-legend-icon agc-visibility"><VisibilityIcon /></div>
                                <p>Visible/non visible</p>
                            </div>
                            <div className="agc-info-legend-box">
                                <div className="agc-info-legend-icon agc-hide"><NotInterestedIcon /></div>
                                <p>Mettre en non disponible</p>
                            </div>
                            <div className="agc-info-legend-box">
                                <div className="agc-info-legend-icon agc-delete"><CancelIcon /></div>
                                <p>Supprimer</p>
                            </div>
                        </div>
                    </div>
                    {load && data !== null ?
                        <div className="mc-plats">
                            {filterDataEmpty >= 0
                            ? filterDataEmpty === 0
                                ? 
                                <div className="agc-reset-box">
                                    <p>Aucun résultat trouvé...</p>
                                    <button onClick={() => {
                                        setFilterData([])
                                        setFilterDataEmpty(-1)
                                    }}>
                                        <span className="btn-content">Reset le filtre</span>
                                    </button>
                                </div>
                                : <MenusContent isAdmin={true} data={filterData} /> 
                            : <MenusContent 
                                isAdmin={true} 
                                data={data}
                                handleClickDelete={(id) => handleClickDelete(id)} 
                                handleClickVisibility={(state, id) => handleClickVisibility(state, id)}
                                handleClickAvailable={(state, id) => handleClickAvailable(state, id)}
                            />}
                        </div>
                    : <div className="agc-loader"><Loader /></div>}
                </div>
            </main>
        </div>
    )
}
