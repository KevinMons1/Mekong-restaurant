import React, { useContext } from 'react'
import LogoMekong from "../../assets/images/logo.png"
import ChiliPepper from '../ChiliPepper/ChiliPepper'
import AddIcon from "@material-ui/icons/Add"
import { reactLocalStorage } from 'reactjs-localstorage';
import { PanierContext } from '../../Contexts/PanierContext'
import { SeeOrderContext } from '../../Contexts/SeeOrderContext'
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function PlatCard({ isAdmin, data, isModifyDashboard, isVegan }) {

    const media768 = useMediaQuery('(max-width:768px)')
    const { setPanier, panier } = useContext(PanierContext)
    const { seeOrder } = useContext(SeeOrderContext)

    const handleClick = () => {
        const doubleFind = panier.find(element => element.platId === data.platId)

        if (doubleFind === undefined) {
            setPanier(panier => [...panier, {
                platId: data.platId,
                name: data.name,
                price: data.price,
                quantity: 1,
            }])

            reactLocalStorage.set(`plat_${data.platId}`, 1)
        } else {
            const newPanier = panier.map(element => element.platId === doubleFind.platId 
                ? {
                    ...element,
                    quantity: upQuantity(parseInt(element.quantity) + 1)
                }   
                : element)
            setPanier(newPanier)
        }
    }

    const upQuantity = qt => {
        reactLocalStorage.set(`plat_${data.platId}`, qt)
        return qt
    }

    return (
        <div className={seeOrder === 1 ? "platCard" : "platCard-small"}>
            <div className="plc-left">
                {isModifyDashboard 
                ? data.image !== "" 
                    ? <img src={data.image === "" ? LogoMekong : URL.createObjectURL(data.image)} alt={data.name} />
                    : <img src={data.imageUrl === "" ? LogoMekong : data.imageUrl} alt={data.name} />
                : data.imageUrl === undefined
                    ? <img src={data.image === "" ? LogoMekong : URL.createObjectURL(data.image)} alt={data.name} />
                    : <img src={data.imageUrl === "" ? LogoMekong : data.imageUrl} alt={data.name} />
                }          
            </div>
            <div className={!isAdmin ? seeOrder === 1 ? "plc-center plc-center-noAdmin" : "plc-center plc-center-noAdmin-noSeeOrder" : "plc-center plc-center-admin"}>
                <div className="plc-name">
                    <h5>{data.name}</h5>
                    {parseInt(data.pepper) > 0 
                    ? parseInt(data.pepper) === 1 
                        ? <div><ChiliPepper /></div>
                        : parseInt(data.pepper) === 2
                            ? <div><ChiliPepper /> <ChiliPepper /></div>
                            : parseInt(data.pepper) === 3
                                ? <div><ChiliPepper /> <ChiliPepper /> <ChiliPepper /></div>
                                : null
                    : null}
                    {isVegan ? <div className="plc-vegan">VEGAN</div> : null}
                </div>
                <small>{data.description}</small>
                <p>{data.price} €</p>
                {data.allergy.length > 0 ? <small className="plc-small" >Allergènes : {data.allergy}</small> : null}
            </div>
            {!isAdmin ?
                seeOrder === 1 ? 
                    <div className="plc-right">
                        <button name="btnAddPanier" disabled={data.available === 1 ? false : true} onClick={() => handleClick()}>
                            <div className="btn-content">
                                <AddIcon className="btn-icon" />
                                {!media768 ? <span>Ajouter au panier</span> : <small style={{position: "absolute", opacity: 0}}>Ajouter au panier</small>}             
                            </div>
                        </button>
                    </div>
                : null
            : null
            }
        </div>
    )
}
