import React from 'react'
import HighLightOffIcon from "@material-ui/icons/HighlightOff"

export default function SeeCommande({ toggleSeeCommande, data }) {
    return (
        <>
            <div className="seeCommande-opacity"></div>
            <div className="seeCommande-content">
                <HighLightOffIcon className="sc-close" onClick={() => toggleSeeCommande()} />
                <div className="sc-info-client">
                    <h3>Informations client</h3>
                    <div className="sc-info-client-box">
                        <div>
                            <p className="sc-ic-important">Rue : {data.client.street}</p>
                            <p className="sc-ic-important">Ville : {data.client.city}</p>
                            <p className="sc-ic-important">Boite : {data.client.box}</p>
                            <p>Email : {data.client.email}</p>
                            <p>Nom : {data.client.lastName}</p>
                        </div>
                        <div>
                            <p className="sc-ic-important">Numéro de rue : {data.client.numStreet}</p>
                            <p className="sc-ic-important">Code postale : {data.client.postalCode}</p>
                            <p className="sc-ic-important">Téléphone : {data.client.phone}</p>
                            <p>Prénom : {data.client.firstName}</p>
                        </div>
                    </div>
                </div>
                <div className="sc-commande">
                    <h3>Commande</h3>
                    <div className="sc-commande-box">
                        <ul>
                            {data.orderContent.map((item, index) => {
                                return <li key={index}><strong>x{item.quantity}</strong> {item.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="sc-message">
                    <h3>Message complémentaire du client</h3>
                    <div className="sc-message-box">
                        <p>{data.client.message}</p>
                    </div>
                </div>
                <div className="sc-bottom">
                    <div className="sc-info">
                        <div className="sc-info-box sc-info-hour">
                            <p>{data.orderInfo.emporter ? "Emporter" : "Livrer"}</p>
                            <p className="sc-info-hour-target"><strong>{data.client.hourDeliver}</strong></p>
                        </div>
                        <div className="sc-info-box ">
                            <p>Montant: {data.orderInfo.price.replace(".", ",")} €</p>
                        </div>
                    </div>
                    <button type="button" onClick={() => toggleSeeCommande()}>
                        <span className="btn-content">Quitter</span>
                    </button>
                </div>
            </div>
        </>
    )
}
