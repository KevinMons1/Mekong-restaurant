import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import LocationOn from "@material-ui/icons/LocationOn"
import Call from "@material-ui/icons/Call"
import Facebook from '@material-ui/icons/Facebook'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { SeeOrderContext } from '../../Contexts/SeeOrderContext'

export default function Footer() {
    const media = useMediaQuery('(max-width:768px)')
    const { seeOrder } = useContext(SeeOrderContext)

    return (
        <footer>
            <div className="footer-top">
                <div className="footer-top-left">
                    <ul>
                        <li>
                            <Link to="/" className="ftl-link">Accueil</Link>
                        </li>
                        <li>
                            {seeOrder === 0 ? <Link to="/menus" className="ftl-link">Menus</Link> : null}
                            {seeOrder === 1 ? <Link to="/menus" className="ftl-link">Menus &amp; Commander</Link> : null}
                        </li>
                        {seeOrder === 1 ? 
                        <li>
                            <Link to="/panier" className="ftl-link">Panier</Link>
                        </li>
                        : null}
                        <li>
                            <Link to="/contact" className="ftl-link">Contact</Link>
                        </li>
                        <li className="ftl-div">
                            <div>
                                <a href="https://www.facebook.com/Mekong-458272871225975" target="_blank" rel="noreferrer">
                                    <small style={{position: "absolute", opacity: 0}}>Notre Facebook</small>
                                    <Facebook />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                {!media ?
                <div className="footer-top-center">
                    <div className="ftc-hours-item">
                        <div className="ftc-hours-top ftc-hours-right">
                            <p>lun - mar</p>
                        </div>
                        <div className="ftc-hours-bottom">
                            <p>fermé</p>
                        </div>
                    </div>
                    <div className="ftc-hours-item">
                        <div className="ftc-hours-top ftc-hours-center">
                            <p>mer - jeud - ven - sam</p>
                        </div>
                        <div className="ftc-hours-bottom">
                            <p>12h00 - 14h00</p>
                            <p>18h00 - 21h00</p>
                        </div>
                    </div>
                    <div className="ftc-hours-item">
                        <div className="ftc-hours-top ftc-hours-left">
                            <p>dim</p>
                        </div>
                        <div className="ftc-hours-bottom">
                            <p>12h00 - 14h00</p>
                            <p>18h00 - 20h00</p>
                        </div>
                    </div>
                </div> : null}
                <div className="footer-top-right">
                    <div className="footer-info">
                        {!media ? <LocationOn /> : null}
                        <p>Rue de Dave 7, 5100 Jambe</p>
                    </div>
                    <div className="footer-info">
                        {!media ? <Call /> : null}
                        <p>081 65 80 62</p>
                    </div>
                </div>
            </div>

            {media ?
            <div className="footer-top-center">
                <div className="ftc-hours-item">
                    <div className="ftc-hours-top ftc-hours-right">
                        <p>lun - mar</p>
                    </div>
                    <div className="ftc-hours-bottom">
                        <p>fermé</p>
                    </div>
                </div>
                <div className="ftc-hours-item">
                    <div className="ftc-hours-top ftc-hours-center">
                        <p>mer - jeud - ven - sam</p>
                    </div>
                    <div className="ftc-hours-bottom">
                        <p>11h30 - 14h30</p>
                        <p>17h30 - 21h00</p>
                    </div>
                </div>
                <div className="ftc-hours-item">
                    <div className="ftc-hours-top ftc-hours-left">
                        <p>dim</p>
                    </div>
                    <div className="ftc-hours-bottom">
                        <p>12h00 - 14h00</p>
                        <p>17h30 - 20h00</p>
                    </div>
                </div>
            </div> : null}

            <div className="footer-bottom">
                <div className="fb">
                    <Link to="/mentions-legales" className="fb-link">Mentions légales</Link>
                    <Link to="/conditions-générales-d'utilisation" className="fb-link">Conditions Générale D'Utilisation</Link>
                    <Link to="/conditions-générales-de-vente" className="fb-link">Conditions Générale De Vente</Link>
                </div>
                <p>Copyright - Mekong Namur, all rights reserved</p>
            </div>
        </footer>
    )
}
