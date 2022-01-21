import React, { useState } from 'react'
import ChiliPepper from '../ChiliPepper/ChiliPepper'
import HighLightOffIcon from "@material-ui/icons/HighlightOff"
import MessageSmall from '../Services/MessageSmall'

export default function Filter({ hide, toggleFilter, setFilter }) {
    const [alertMessage, setAlertMessage] = useState("")
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [data, setData] = useState({
        minimum: 0,
        maximum: 100,
        categorys: [],
        pepper: []
    })

    const handleSubmit = e => {
        e.preventDefault()
        if (parseInt(data.minimum) >= 0 && parseInt(data.maximum) >= 0) {
            if (parseInt(data.minimum) <= parseInt(data.maximum)) {
                setFilter(data)
            } else changeAlertMessage("Le minimum doit être plus petit que le maximum")
        } else  changeAlertMessage("Le minimum ou le maximum doivent être supérieur à 0")
    }

    const handleChangeCategory = e => {
        const categorys = ["soupes", "salades", "entrées chaudes", "soupes de nouilles", "plats au curry", "les spécialités", "wok", "végétarien", "desserts", "boissons"]
        let count = 0

        if (e.target.checked) {
            // Anti doublon
            if (e.target.name === "soupes" || e.target.name === "salades" || e.target.name === "entrées chaudes" || e.target.name === "soupes de nouilles" || e.target.name === "plats au curry" || e.target.name === "les spécialités" || e.target.name === "wok" || e.target.name === "végétarien" || e.target.name === "desserts" || e.target.name === "boissons") {
                categorys.forEach(element => {
                    if (data.categorys.find(categ => categ.name === element) === e.target.name) count++
                })
    
                if (count === 0) setData({...data, categorys: [...data.categorys, {
                    name: e.target.name,
                    nbr: categorys.indexOf(e.target.name) + 1
                }]})
            
            } else changeAlertMessage("Une erreur s'est produite.")
        } else {
            let newCategorys = data.categorys.filter(categ => categ.name !== e.target.name)
            setData({...data, categorys: newCategorys})
        }
    }

    const handleChangePepper = (e, nbr) => {
        const peppersNbr = [0, 1, 2, 3]
        let count = 0

        if (e.target.checked) {
            // Anti doublon
            if (e.target.name === "non piquant" || e.target.name === "piquant léger" || e.target.name === "piquant moyen" || e.target.name === "piquant fort") {
                peppersNbr.forEach(element => {
                    if (data.pepper.find(pepp => pepp === element) === nbr) count++
                })
    
                if (count === 0) setData({...data, pepper: [...data.pepper, nbr]})
            
            } else changeAlertMessage("Une erreur s'est produite.")
        } else {
            let newPeppers = data.pepper.filter(pepp => pepp !== nbr)
            setData({...data, pepper: newPeppers})
        }
    }

    const changeAlertMessage = (text) => {
        setToggleAlertMessage(true)
        setAlertMessage(text)
    }

    return (
        <div className={hide ? "filter" : null}>
            <div className="filter-opacity"></div>
            <form className="filter-content" onSubmit={e => handleSubmit(e)}>
                <HighLightOffIcon className="fc-close" onClick={() => toggleFilter()} />
                {toggleAlertMessage ? <MessageSmall type={1} message={alertMessage} /> : null}
                <div className="fc-top">
                    <div className="fc-left">
                        <p className="fc-title">Catégories</p>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="soupes" type="checkbox" />
                            <label htmlFor="soupes">Soupes</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="salades" type="checkbox" />
                            <label htmlFor="salades">Salades</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="entrées chaudes" type="checkbox" />
                            <label htmlFor="entrées chaudes">Entrées Chaudes</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="soupes de nouilles" type="checkbox" />
                            <label htmlFor="soupes de nouilles">Soupes de nouilles</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="plats au curry" type="checkbox" />
                            <label htmlFor="plats au curry">Plats au curry</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="les spécialités" type="checkbox" />
                            <label htmlFor="les spécialités">Les spécialités</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="wok" type="checkbox" />
                            <label htmlFor="wok">Wok</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="végétarien" type="checkbox" />
                            <label htmlFor="végétarien">Végétarien</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="desserts" type="checkbox" />
                            <label htmlFor="desserts">Desserts</label>
                        </div>
                        <div className="fc-input">
                            <input onChange={e => handleChangeCategory(e)} name="boissons" type="checkbox" />
                            <label htmlFor="boissons">Boissons</label>
                        </div>
                    </div>
                    <div className="fc-right">
                        <div className="fc-right-top">
                            <p className="fc-title" >Piquant</p>
                            <div className="fc-input">
                                <input onChange={e => handleChangePepper(e, 0)} name="non piquant" type="checkbox" />
                                <label htmlFor="non piquant">Pas piquant</label>
                            </div>
                            <div className="fc-input">
                                <input onChange={e => handleChangePepper(e, 1)} name="piquant léger" type="checkbox" />
                                <label htmlFor="piquant léger">Piquant léger <ChiliPepper /></label>
                            </div>
                            <div className="fc-input">
                                <input onChange={e => handleChangePepper(e, 2)} name="piquant moyen" type="checkbox" />
                                <label htmlFor="piquant moyen">Piquant moyen <ChiliPepper /> <ChiliPepper /></label>
                            </div>
                            <div className="fc-input">
                                <input onChange={e => handleChangePepper(e, 3)} name="piquant fort" type="checkbox" />
                                <label htmlFor="piquant fort">Piquant fort <ChiliPepper /> <ChiliPepper /> <ChiliPepper /></label>
                            </div>
                        </div>
                        <div className="fc-right-bottom">
                            <p className="fc-title">Prix</p>
                            <div className="fc-right-bottom-price">
                                <p>Entre</p>
                                <input name="minimumPrice" type="number" placeholder="0" onChange={e => setData({...data, minimum: e.target.value})} />
                                <p>à</p>
                                <input name="maximumPrice" type="number" placeholder="100" onChange={e => setData({...data, maximum: e.target.value})} />
                                <p>€</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fc-bottom">
                    <button type="submit" name="btnSubmit">
                        <span className="btn-content">Filtrer</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
