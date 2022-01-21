import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { gsap, ScrollTrigger } from "gsap/all"
import { Helmet } from "react-helmet"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuBookIcon from '@material-ui/icons/MenuBook'
import LocationOn from "@material-ui/icons/LocationOn"
import Call from "@material-ui/icons/Call"
import MapImage from "../../assets/images/map.PNG"

import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import { SeeOrderContext } from '../../Contexts/SeeOrderContext'

export default function Accueil() {

    const { seeOrder } = useContext(SeeOrderContext)
    const media660 = useMediaQuery('(max-width:660px)')
    const media450 = useMediaQuery('(max-width:450px)')
    const headerTextRef = useRef(null)
    const sectionOneRef = useRef(null)
    const headerFormeRef = useRef(null)
    const sectionTwoRef = useRef(null)
    const img1Ref = useRef(null)
    const img2Ref = useRef(null)
    const img3Ref = useRef(null)
    const img4Ref = useRef(null)
    const img5Ref = useRef(null)
    const img6Ref = useRef(null)
    const btn1Ref = useRef(null)
    const btn2Ref = useRef(null)
    const btn3Ref = useRef(null)
    const btn4Ref = useRef(null)
    const btn5Ref = useRef(null)
    const btn6Ref = useRef(null)
    const imgRefArray = [img1Ref, img2Ref, img3Ref, img4Ref, img5Ref, img6Ref]
    const btnRefArray = [btn1Ref, btn2Ref, btn3Ref, btn4Ref, btn5Ref, btn6Ref]
    const [toggleImg, setToggleImg] = useState(0)

    useEffect(() => {  
        gsap.registerPlugin(ScrollTrigger)

        gsap.from(headerFormeRef.current, {
            opacity: 0,
            y: "100px",
            ease: "back.out(1.7)"
        }, 0.5)
    
        gsap.from(headerTextRef.current, {
            opacity: 0,
            y: "-100px",
            ease: "back.out(1.7)"
        }, 0.8)
        
        // Section one
    
        gsap.from(sectionOneRef.current, {
            duration: 1.5,
            opacity: 0,
            x: "-75px",
            scrollTrigger: {
                trigger: sectionOneRef.current,
                start: "top 75%"
            }
        })
    
        gsap.from(sectionTwoRef.current, {
            duration: 1.5,
            opacity: 0,
            x: "75px",
            scrollTrigger: {
                trigger: sectionTwoRef.current,
                start: "top 75%"
            }
        })
    }, [])

    const handleSlider = (index) => {
        imgRefArray[toggleImg].current.className = " "
        btnRefArray[toggleImg].current.className = "aso-btn-circle"
        imgRefArray[index].current.className = "aso-active"
        btnRefArray[index].current.className = "aso-btn-circle aso-circle-active"
        setToggleImg(index)
    }

    return (
        <>           
            <Helmet>
                <meta name="description" content="Restaurant thaïlandais à Namur ! Venez commander et vous aurez une réduction sur votre livraison !" />
            </Helmet>

            <header className="header-accueil">
                <NavBar isFix={true} />
                <div ref={headerFormeRef} className="header-bottom">
                    <div ref={headerTextRef} className="header-text">
                        <div className="header-text-top">
                            <h1>Mekong</h1>
                            <h2>Restaurant <span>thaï</span></h2>
                        </div>
                        <div className="header-text-bottom">
                            <p>Fine cuisine thaïlandaise</p>
                            <button name="btnMenusCommander">
                                <Link to="/menus" className="header-link btn-content">
                                    <MenuBookIcon className="header-icon btn-icon" />
                                   {seeOrder === 0 ? <span>Menus</span> : <span>Menus &amp; Commander</span>}
                                </Link>
                            </button>
                            <small>- 10% sur votre commande si vous prenez à emporter !</small>
                        </div>
                    </div>
                </div>
                <div className="header-bg"></div>
            </header>

            <main>
                <section ref={sectionOneRef} className="accueil-section-one">
                    <div  className="aso-bg-circle aso-bg-circle1"></div>
                    {!media450 ? <div  className="aso-bg-circle aso-bg-circle2"></div> : null}
                    
                    <div className="aso-left">
                        <h3>Bienvenue au Mekong</h3>
                        <p>Situé en plein cœur de Jambes en région Namuroise, vous y serez séduit par une cuisine thaïlandaise contemporaine,
                            élégamment présentée, le tout dans une ambiance agréable et décontractée.
                            <br/><br/>N'hésitez pas à pousser la porte, la chef
                            et son équipe mettront un point d'honneur à vous satisfaire avec une cuisine et des produits de qualité.
                            <br/><br/>À très bientôt !</p>
                    </div>
                    <div className="aso-right">
                        <div className="aso-bg-circle aso-bg-circle3"></div>
                        <div className="aso-right-img">
                            <img ref={img1Ref} src="https://res.cloudinary.com/hhsyk45rn/image/upload/v1630998276/plat1_kpa5cs.jpg" alt="Plat de notre restaurant" className="aso-active" />
                            <img ref={img2Ref} src="https://res.cloudinary.com/hhsyk45rn/image/upload/v1630998276/plat2_xsforc.jpg" alt="Plat de notre restaurant" />
                            <img ref={img3Ref} src="https://res.cloudinary.com/hhsyk45rn/image/upload/v1630998276/plat3_evanyj.jpg" alt="Plat de notre restaurant" />
                            <img ref={img4Ref} src="https://res.cloudinary.com/hhsyk45rn/image/upload/v1630998277/plat4_broen0.jpg" alt="Plat de notre restaurant" />
                            <img ref={img5Ref} src="https://res.cloudinary.com/hhsyk45rn/image/upload/v1630998276/plat5_fmdpaw.jpg" alt="Plat de notre restaurant" />
                            <img ref={img6Ref} src="https://res.cloudinary.com/hhsyk45rn/image/upload/v1630998276/plat6_ppbzug.jpg" alt="Plat de notre restaurant" />
                        </div>
                        <div className="aso-circles">
                            <button ref={btn1Ref} onClick={() => handleSlider(0)} className="aso-btn-circle aso-circle-active" name="btnImg1"><small style={{position: "absolute", opacity: 0}}>Voir une autre photo de plat</small></button>
                            <button ref={btn2Ref} onClick={() => handleSlider(1)} className="aso-btn-circle" name="btnImg2"><small style={{position: "absolute", opacity: 0}}>Voir une autre photo de plat</small></button>
                            <button ref={btn3Ref} onClick={() => handleSlider(2)} className="aso-btn-circle" name="btnImg3"><small style={{position: "absolute", opacity: 0}}>Voir une autre photo de plat</small></button>
                            <button ref={btn4Ref} onClick={() => handleSlider(3)} className="aso-btn-circle" name="btnImg4"><small style={{position: "absolute", opacity: 0}}>Voir une autre photo de plat</small></button>
                            <button ref={btn5Ref} onClick={() => handleSlider(4)} className="aso-btn-circle" name="btnImg4"><small style={{position: "absolute", opacity: 0}}>Voir une autre photo de plat</small></button>
                            <button ref={btn6Ref} onClick={() => handleSlider(5)} className="aso-btn-circle" name="btnImg4"><small style={{position: "absolute", opacity: 0}}>Voir une autre photo de plat</small></button>
                        </div>
                    </div>
                </section>

                <section ref={sectionTwoRef} className="accueil-section-two">
                   {!media660 ? <div className="ast-left">
                        <img src={MapImage} alt="Carte" />
                    </div> : null}
                    <div className="ast-right">
                        <div className="ast-right-box">
                            <h3>Informations</h3>
                            <div className="ast-info">
                                <LocationOn />
                                <p>Rue de Dave 7, 5100 Jambe</p>
                            </div>
                            <div className="ast-info">
                                <Call />
                                <p>081 65 80 62</p>
                            </div>    
                            <div className="ast-hours">
                                <div className="ast-hours-item">
                                    <div className="ast-hours-top ast-hours-right">
                                        <p>lun - mar</p>
                                    </div>
                                    <div className="ast-hours-bottom">
                                        <p>fermé</p>
                                    </div>
                                </div>
                                <div className="ast-hours-item">
                                    <div className="ast-hours-top ast-hours-center">
                                        <p>mer - jeud - ven - sam</p>
                                    </div>
                                    <div className="ast-hours-bottom">
                                        <p>12h00 - 14h00</p>
                                        <p>18h00 - 21h00</p>
                                    </div>
                                </div>
                                <div className="ast-hours-item">
                                    <div className="ast-hours-top ast-hours-left">
                                        <p>dim</p>
                                    </div>
                                    <div className="ast-hours-bottom">
                                        <p>12h00 - 14h00</p>
                                        <p>18h00 - 20h00</p>
                                    </div>
                                </div>
                            </div> 
                            <button name="btnMenusCommander">
                                <Link to="/menus" className="ast-btn btn-content">
                                    <MenuBookIcon className="ast-icon btn-icon" />
                                    {seeOrder === 0 ? <span>Menus</span> : <span>Menus &amp; Commander</span>}
                                </Link>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
