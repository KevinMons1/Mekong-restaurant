import React, { useState, useEffect, useContext, useRef } from 'react'
import { SeeOrderContext } from '../../Contexts/SeeOrderContext'
import { PositionContext } from '../../Contexts/PositionContext'
import SearchIcon from '@material-ui/icons/Search'
import HighLightOffIcon from "@material-ui/icons/HighlightOff"
import ChiliPepper from "../../components/ChiliPepper/ChiliPepper"
import PanierCard from "../../components/PanierCard/PanierCard"
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import Filter from '../../components/Filter/Filter'
import MenusContent from './MenusContent'
import Loader from "../../components/Services/Loader"
import MessageSmall from "../../components/Services/MessageSmall"
import axios from "axios"
import Area from '../../components/Area/Area'
import MenusPdf from "../../assets/Menus.pdf"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { gsap, Power1 } from "gsap"
import { Helmet } from "react-helmet"

export default function MenusCommander() {

    const media1024 = useMediaQuery('(max-width:1024px)')
    const media950 = useMediaQuery('(max-width:950px)')
    const panierRef = useRef(null)
    const { seeOrder } = useContext(SeeOrderContext)
    const { position } = useContext(PositionContext)
    const [toggleFilter, setToggleFilter] = useState(true)
    const [filterData, setFilterData] = useState([])
    const [filterDataEmpty, setFilterDataEmpty] = useState(-1)
    const [area, setArea] = useState(false)
    const [load, setLoad] = useState(false)
    const [openPanier, setOpenPanier] = useState(false)
    const [data, setData] = useState(null)
    const [state, setState] = useState({
        messageVisibility: 0,
        message: ""
    })

    useEffect(() => {
        const fetch = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/plats/all`)
                .then(res => setData(res.data))
                .catch(err => console.log(err))

            await axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/state/message`)
                .then(res => setState(res.data))
                .catch(err => console.log(err))
        }
        fetch()
        setLoad(true)
    }, [])

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

        // Price filter
        newDataFilter = newDataFilter.filter(element => parseFloat((element.plat.price).replace(",", ".")) >= newData.minimum && parseFloat((element.plat.price).replace(",", ".")) <= newData.maximum)

        newDataFilter = [...new Set(newDataFilter)]

        if (newDataFilter.length === 0) setFilterDataEmpty(0)
        else if (newDataFilter.length > 0) setFilterDataEmpty(1)

        setFilterData(newDataFilter)
        setToggleFilter(!toggleFilter)
     }

     const handleClosePanier = () => {
        if (media950) {
            setOpenPanier(false)
        gsap.to(panierRef.current, {
            duration: 0.5,
            height: "65px",
            backgroundColor: "#FCB03F",
            overflow: "hidden",
            position: "fixed",
            ease: Power1.easeInOut
        })
    }
     }

     const handleOpenPanier = () => {
        if (!openPanier && media950) {
            setOpenPanier(true)
            gsap.to(panierRef.current, {
                duration: 0.5,
                position: "abosulute",
                height: "100vh",
                backgroundColor: "#fff",
                overflow: "auto",
                ease: Power1.easeInOut
            })
        }
     }

    return (
        <>
            <Helmet>
                <meta name="description" content="Restauration thaïlandaise à Namur, venez passer commandes et votre livraison aura une réduction !" />
            </Helmet>

            <header>
                <NavBar />
            </header>

            <main className="menus">

                <Filter hide={toggleFilter} setFilter={(newData) => handleFilter(newData)} toggleFilter={() => setToggleFilter(!toggleFilter)} />
                {state.messageVisibility === 1 ? <div className="mc-message"><MessageSmall message={state.message} type={3} /></div> : null}
                {area ? 
                <div>
                    <div className="mc-area">
                        <Area position={position} />
                        <div className="mc-legend">
                            <p className="mc-l-1">Zone 1 - minimum 30€</p>
                            <p className="mc-l-2">Zone 2 - minimum 35€</p>
                            <p className="mc-l-3">Zone 3 - minimum 40€</p>
                        </div>
                        <HighLightOffIcon className="area-close" onClick={() => setArea(false)} />
                        </div>
                    <div className="area-opacity"></div>
                </div>
                : null}

                <div className={seeOrder === 1 ? media950 ? "menus-content-full" : "menus-content" : "menus-content-full"}>
                    {media1024
                    ? <div className="mc-top">
                    <div className="mc-top-center">
                        <button name="btnpdf" className="mc-top-btn-dwl">
                            <a href={MenusPdf} download className="btn-content">Menus en PDF</a>
                        </button>
                        <button name="btnFiltrer" className="mc-top-btn-filter" onClick={() => setToggleFilter(!toggleFilter)}>
                            <div className="btn-content">
                                <SearchIcon className="btn-icon"/>
                                <span>Filtrer</span>
                            </div>
                        </button>
                    </div>
                    <div className="mc-top-left-responsive">
                        <div className="mc-top-left">
                            <ul className="mc-top-peppers">
                                <li className="mc-top-pepper-text">Piquant léger</li>
                                <li className="mc-top-pepper-text">Piquant moyen</li>
                                <li className="mc-top-pepper-text">Piquant fort</li>
                            </ul>
                            <ul className="mc-top-peppers">
                                <li className="mc-top-pepper"><ChiliPepper /></li>
                                <li className="mc-top-pepper"><ChiliPepper /> <ChiliPepper /></li>
                                <li className="mc-top-pepper"><ChiliPepper /> <ChiliPepper /> <ChiliPepper /></li>
                            </ul>
                        </div>
                        {seeOrder === 1 ?
                            <div className="mc-top-right">
                                <p>Zone 1 - minimum 30€</p>
                                <p>Zone 2 - minimum 35€</p>
                                <p>Zone 3 - minimum 40€</p>
                                <button name="btnZones" onClick={() => setArea(true)}>
                                    <span className="btn-content">Voir les zones</span>
                                </button>
                            </div>
                        : null }
                    </div>
                    </div>
                    : <div className="mc-top">
                    <div className="mc-top-left">
                        <ul className="mc-top-peppers">
                            <li className="mc-top-pepper-text">Piquant léger</li>
                            <li className="mc-top-pepper-text">Piquant moyen</li>
                            <li className="mc-top-pepper-text">Piquant fort</li>
                        </ul>
                        <ul className="mc-top-peppers">
                            <li className="mc-top-pepper"><ChiliPepper /></li>
                            <li className="mc-top-pepper"><ChiliPepper /> <ChiliPepper /></li>
                            <li className="mc-top-pepper"><ChiliPepper /> <ChiliPepper /> <ChiliPepper /></li>
                        </ul>
                    </div>
                    <div className="mc-top-center">
                        <button name="btnpdf" className="mc-top-btn-dwl">
                            <a href={MenusPdf} download className="btn-content">Télécharger le menu en PDF</a>
                        </button>
                        <button name="btnFiltrer" className="mc-top-btn-filter" onClick={() => setToggleFilter(!toggleFilter)}>
                            <div className="btn-content">
                                <SearchIcon className="btn-icon"/>
                                <span>Filtrer</span>
                            </div>
                        </button>
                    </div>
                    {seeOrder === 1 ?
                        <div className="mc-top-right">
                            <p>Zone 1 - minimum 30€</p>
                            <p>Zone 2 - minimum 35€</p>
                            <p>Zone 3 - minimum 40€</p>
                            <button name="btnZones" onClick={() => setArea(true)}>
                                <span className="btn-content">Voir les zones</span>
                            </button>
                        </div>
                    : null }
                </div>}

                    {load && data !== null ?
                        <div className={seeOrder === 1 ? "mc-plats" : "mc-plats-noSeeOrder"}>
                            {filterDataEmpty > -1
                            ? filterDataEmpty === 0
                                ? 
                                <div className="mc-reset-box">
                                    <p>Aucun résultat trouvé...</p>
                                    <button className="mc-reset" onClick={() => {
                                        setFilterData([])
                                        setFilterDataEmpty(-1)
                                    }}>
                                       <span className="btn-content">Reset le filtre</span> 
                                    </button>
                                </div>
                                : <MenusContent data={filterData} /> 
                            : <MenusContent seeOrder={seeOrder} data={data} />}
                        </div>
                    : <div className="mc-loader"><Loader /></div>}
                </div>
                {seeOrder === 1 && load ?
                    <div ref={panierRef} onClick={() => handleOpenPanier()} className={media950 ? "mc-panier-phone" : "mc-panier"}>
                        <PanierCard closePanier={() => handleClosePanier()} isPhone={media950} />
                    </div>
                : null}
            </main>

            <Footer />
        </>
    )
}
