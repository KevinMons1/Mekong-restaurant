import React, { useRef, useContext, useState } from 'react'
import Logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { gsap, Power1 } from "gsap"
import { SeeOrderContext } from '../../Contexts/SeeOrderContext'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HighLightOffIcon from "@material-ui/icons/HighlightOff"

export default function NavBar({ isFix }) {

    const navCircleRef = useRef(null)
    const navHamb1Ref = useRef(null)
    const navHamb2Ref = useRef(null)
    const navHamb3Ref = useRef(null)
    const logoRef = useRef(null)
    const closeRef = useRef(null)
    const item1Ref = useRef(null)
    const item2Ref = useRef(null)
    const item3Ref = useRef(null)
    const item4Ref = useRef(null)
    const media = useMediaQuery('(max-width:768px)')
    const { seeOrder } = useContext(SeeOrderContext)
    const [open, setOpen] = useState(0)

    const handleOpen = async () => {
        window.document.body.classList.add("body-nav")

        await setOpen(1)

        gsap.to(navHamb1Ref.current, {
            duration: 0.1,
            width: 0
        })

        gsap.to(navHamb2Ref.current, {
            duration: 0.15,
            width: 0
        })

        gsap.to(navHamb3Ref.current, {
            duration: 0.2,
            width: 0
        })
        
        await gsap.to(navCircleRef.current, {
            duration: 0.4,
            delay: 0.2,
            scale: 50,
            ease: Power1.easeInOut
        })

        await gsap.to(logoRef.current, {
            duration: 0.2,
            x: "0px",
            opacity: 1,
            ease: Power1.easeInOut
        })

        await gsap.to(item1Ref.current, {
            duration: 0.2,
            x: "0px",
            opacity: 1,
            ease: Power1.easeInOut
        })

        await gsap.to(item2Ref.current, {
            duration: 0.2,
            x: "0px",
            opacity: 1,
            ease: Power1.easeInOut
        })

        await gsap.to(item3Ref.current, {
            duration: 0.2,
            x: "0px",
            opacity: 1,
            ease: Power1.easeInOut
        })

        await gsap.to(item4Ref.current, {
            duration: 0.2,
            x: "0px",
            opacity: 1,
            ease: Power1.easeInOut
        })

        await gsap.to(closeRef.current, {
            duration: 0.2,
            opacity: 1,
            ease: Power1.easeInOut
        })
    }
    
    const handleClose = async () => {
        await gsap.to(logoRef.current, {
            duration: 0.15,
            x: "-15px",
            opacity: 0,
            ease: Power1.easeInOut
        })

        await gsap.to(item1Ref.current, {
            duration: 0.15,
            x: "-15px",
            opacity: 0,
            ease: Power1.easeInOut
        })

        await gsap.to(item2Ref.current, {
            duration: 0.15,
            x: "-15px",
            opacity: 0,
            ease: Power1.easeInOut
        })

        await gsap.to(item3Ref.current, {
            duration: 0.15,
            x: "-15px",
            opacity: 0,
            ease: Power1.easeInOut
        })

        await gsap.to(item4Ref.current, {
            duration: 0.15,
            x: "-15px",
            opacity: 0,
            ease: Power1.easeInOut
        })

        await gsap.to(closeRef.current, {
            duration: 0.15,
            opacity: 0,
            ease: Power1.easeInOut
        })

        await gsap.to(navCircleRef.current, {
            duration: 0.4,
            scale: 1,
            ease: Power1.easeInOut
        })

        gsap.to(navHamb1Ref.current, {
            duration: 0.1,
            width: 28
        })

        gsap.to(navHamb2Ref.current, {
            duration: 0.15,
            width: 20
        })

        gsap.to(navHamb3Ref.current, {
            duration: 0.2,
            width: 14
        })
        setOpen(0)
    }

    return (
        <>
        {media ? <div ref={navCircleRef} className="nav-circle" onClick={() => media && open === 0 ? handleOpen() : null}></div> : null}
        {media ? <div ref={navHamb1Ref} className="nav-hamb1" onClick={() => media && open === 0 ? handleOpen() : null}></div> : null}
        {media ? <div ref={navHamb2Ref} className="nav-hamb2" onClick={() => media && open === 0 ? handleOpen() : null}></div> : null}
        {media ? <div ref={navHamb3Ref} className="nav-hamb3" onClick={() => media && open === 0 ? handleOpen() : null}></div> : null}
        
        <nav className={isFix ? "nav-fixed navBar" : "navBar"} style={open === 0 && media ? {visibility: "hidden"} : {visibility: "visible"}}>
            <div className="nav-left">
                <img ref={logoRef} width="50" height="50" className={media ? "nav-link-phone" : "nav-link-pc"} src={Logo} alt="logo" />
            </div>
            <div className="nav-right">
                <ul>
                    <li><Link className={media ? "nav-link nav-link-phone" : "nav-link nav-link-pc"} to="/" ref={item1Ref} onClick={() => window.document.body.classList.remove("body-nav")} >Accueil</Link></li>
                    {seeOrder === 1 ? <li><Link className={media ? "nav-link nav-link-phone" : "nav-link nav-link-pc"} to="/menus" ref={item2Ref} onClick={() => window.document.body.classList.remove("body-nav")}>Menus &amp; Commander</Link></li> : null}
                    {seeOrder === 0 ? <li><Link className={media ? "nav-link nav-link-phone" : "nav-link nav-link-pc"} to="/menus" ref={item2Ref} onClick={() => window.document.body.classList.remove("body-nav")}>Menus</Link></li> : null}
                    {seeOrder === 1 ? <li><Link className={media ? "nav-link nav-link-phone" : "nav-link nav-link-pc"} to="/panier" ref={item3Ref} onClick={() => window.document.body.classList.remove("body-nav")}>Panier</Link></li> : null }
                    <li><Link className={media ? "nav-link nav-link-phone" : "nav-link nav-link-pc"} to="/contact" ref={item4Ref} onClick={() => window.document.body.classList.remove("body-nav")}>Contact</Link></li>
                </ul>
            </div>
            {media ? <HighLightOffIcon style={{opacity: 0}} ref={closeRef} onClick={() => handleClose()} className="nav-close" /> : null}
        </nav>
        </>
    )
}
