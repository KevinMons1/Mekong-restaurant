import React, { useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import ArrowIcon from "@material-ui/icons/SyncAlt"
import MotorcycleIcon from "@material-ui/icons/MotorcycleOutlined"
import EditIcon from "@material-ui/icons/EditOutlined"
import PolicyIcon from "@material-ui/icons/PolicyOutlined"
import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined"
import Auth from '../../Auth'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { gsap, Power1 } from "gsap/all"

export default function NavBarAdmin({ active }) {

    const media800 = useMediaQuery('(max-width:800px)')
    const history = useHistory()
    const navRef = useRef(null)
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await Auth.logout()
        history.push("/admin")
    }

    const handleClick = () => {
        if (open) {
            gsap.to(navRef.current, {
                duration: 0.4,
                x: "-200px",
                ease: Power1.easeInOut
            })
        } else {
            gsap.to(navRef.current, {
                duration: 0.4,
                x: "0px",
                ease: Power1.easeInOut
            })
        }
        
        setOpen(!open)
    }

    return (
        <nav className="nav-admin" ref={navRef} >
            {media800 ? <div className="nav-admin-arrow" onClick={() => handleClick()}><ArrowIcon /></div> : null}
            <div className="nav-admin-top">
                <h2>Dashboard</h2>
                <ul className="nav-admin-ul">
                    <li className={active === 0 ? "nav-admin-li nav-admin-active" : "nav-admin-li"}>
                        <Link to="/admin/home">
                            <HomeIcon />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className={active === 1 ? "nav-admin-li nav-admin-active" : "nav-admin-li"}>
                        <Link to="/admin/commandes">
                            <MotorcycleIcon />
                            <span>Commandes</span>
                        </Link>
                    </li>
                    <li className={active === 2 ? "nav-admin-li nav-admin-active" : "nav-admin-li"}>  
                        <Link to="/admin/gestion-contenu">
                            <EditIcon />
                            <span>Gestion du contenu</span>
                        </Link>
                    </li>
                    <li className={active === 3 ? "nav-admin-li nav-admin-active" : "nav-admin-li"}>
                        <Link to="/admin/gestion-site">
                            <PolicyIcon />
                            <span>Gestion du site</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <button className="nav-admin-bottom" onClick={() => handleLogout()}>
                <ExitToAppIcon />
                <p>Déconnexion</p>
            </button>
        </nav>
    )
}
