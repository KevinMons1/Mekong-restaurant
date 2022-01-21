import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import NavBarAdmin from '../../../components/NavBar/NavBarAdmin'
import EditIcon from "@material-ui/icons/EditOutlined"
import PlatCard from '../../../components/PlatCard/PlatCard'
import MessageSmall from "../../../components/Services/MessageSmall"
import imageCompression from "browser-image-compression"
import axios from "axios"
import Loader from "../../../components/Services/Loader"
import { Helmet } from "react-helmet"

export default function AjoutAdmin() {
    const imageRef = useRef(null)
    const nameRef = useRef(null)
    const descritpionRef = useRef(null)
    const priceRef = useRef(null)
    const priceInputRef = useRef(null)
    const allergyRef = useRef(null)
    const pepperRef = useRef(null)
    const arrayRef = [imageRef, nameRef, descritpionRef, priceRef, allergyRef]
    const [typeAlertMessage, setTypeAlertMessage] = useState(0)
    const [alertMessage, setAlertMessage] = useState("")
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [data, setData] = useState({
        image: "",
        name: "",
        description: "",
        price: 0,
        allergy: "",
        categorys: [],
        pepper: "0",
        visibility: "1"
    })

    const handleClickInput = (index, e) => {
        if (e.target.value.length > 0) {
            arrayRef[index].current.classList.add("animLabel")
        } else if (e.target.value.length === 0) {
            arrayRef[index].current.classList.remove("animLabel")
        }
    }

    const handleChangeCategory = e => {
        const categorys = ["soupes", "salades", "entrées chaudes", "soupes de nouilles", "plats au curry", "les spécialités", "wok", "végétarien", "desserts", "boissons"]
        let count = 0

        if (e.target.checked) {
            // Anti doublon
            if (e.target.value === "soupes" || e.target.value === "salades" || e.target.value === "entrées chaudes" || e.target.value === "soupes de nouilles" || e.target.value === "plats au curry" || e.target.value === "les spécialités" || e.target.value === "wok" || e.target.value === "végétarien" || e.target.value === "desserts" || e.target.value === "boissons") {
                categorys.forEach(element => {
                    if (data.categorys.find(categ => categ === element) === e.target.value) count++
                })
    
                if (count === 0) setData({...data, categorys: [...data.categorys, e.target.value]})
            
            } else changeAlertMessage("Une erreur s'est produite.", 1)
        } else {
            let newCategorys = data.categorys.filter(categ => categ !== e.target.value)
            setData({...data, categorys: newCategorys})
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { name, price, categorys, image } = data
        const rgNumber = /^[0-9^,]*$/
        setDisableBtn(true)

        if (name !== "" && price !== "" && categorys.length >= 1) {
            if (rgNumber.test(price)) {
                if (price.includes(",")) {
                    if (parseFloat(price.replace(",", ".")) > 0.01) {
                        let indexSlice = price.indexOf(",")
                        if (price.slice((indexSlice)).length === 3) {
                            axios.post(`${process.env.REACT_APP_API_URL}/gestion-contenu/add`, data)
                                .then(res => {
                                    if (image !== "") {
                                        if (image.type.indexOf("image/") === 0) handleCompressionImage(res.data.id)
                                        else changeAlertMessage("Type de l'image invalid", 1)
                                    } else {
                                        setData({
                                            image: "",
                                            name: "",
                                            description: "",
                                            price: "0",
                                            allergy: "",
                                            categorys: [],
                                            pepper: "0",
                                            visibility: "1"
                                        })

                                        pepperRef.current.selectedIndex = 0

                                        changeAlertMessage(res.data.message, 0)
                                        setDisableBtn(false)
                                    }
                                })
                                .catch(err => changeAlertMessage(err.response.data.error, 1))
                        } else changeAlertMessage("Le prix doit avoir que deux chiffres après la virgule.", 1)
                    } else changeAlertMessage("Le prix ne peut pas être négatif.", 1)
                } else changeAlertMessage("Le prix doit être mis à la décimal séparé par une virgule (exemple: 12,35).", 1)
            } else changeAlertMessage("Le prix doit être un nombre", 1)
        } else changeAlertMessage("Vous devez remplir les champs obligatoires.", 1)
    }

    const changeAlertMessage = (text, type) => {
        setToggleAlertMessage(true)
        setTypeAlertMessage(type)
        setAlertMessage(text)
        setDisableBtn(false)
    }

    const handleChangeFile = e => {
        if (typeof e.target.files[0] !== "undefined") {
            const checkExtensionImage = e.target.files[0].type.indexOf("image/")

            if (checkExtensionImage !== -1) {
                setData({...data, image: e.target.files[0]})
            } else changeAlertMessage("Fichier invalid.", 1)
        } 
    }

    const handleCompressionImage = (id) => {
        let imageFile = data.image;    
        let options = {
          maxSizeMB: 0.01,
          maxWidthOrHeight: 1000,
          useWebWorker: true
        }

        imageCompression(imageFile, options)
            .then(compressedFile => {
                let formData = new FormData()
                formData.append('file', compressedFile)

                axios.post(`${process.env.REACT_APP_API_URL}/gestion-contenu/add/image/${id}`, formData)
                    .then(res => {
                        setData({
                            image: "",
                            name: "",
                            description: "",
                            price: "0",
                            allergy: "",
                            categorys: [],
                            pepper: "0",
                            visibility: "1"
                        })

                        pepperRef.current.selectedIndex = 0
                        
                        changeAlertMessage(res.data.message, 1)
                        setDisableBtn(false)
                    })
                    .catch(err => changeAlertMessage(err.response.data.error, 1))
            })
            .catch(err => changeAlertMessage("Une erreur s'est produite lors du téléchagement de l'image.", 1))
    }

    const handleChangePrice = value => {
        const rgNumber = /^[0-9^,]*$/
        let arrayValue = []
        let count = 0

        value = value.replace(".", ",")
        if (rgNumber.test(value.replace(/ /g, ""))) {
            setToggleAlertMessage(false)
            
            // Doublon
            arrayValue = value.split('')
            arrayValue.forEach(element => {
                if (element === ",") count++
            })

            if (count < 2) {
                // max-min two figures after ,
                if (value.includes(",")) {
                    let indexSlice = value.indexOf(",")
                    let valueSlice = value.slice((indexSlice), (3 + indexSlice))
        
                    if (value.slice((indexSlice)).length > 3) {
                        let beforeValue = value.slice(0, indexSlice)
                        priceInputRef.current.value = beforeValue + valueSlice
                        setData({...data, price: beforeValue + valueSlice})
                    } else setData({...data, price: value})
                } else setData({...data, price: value})
            } else changeAlertMessage("Qu'une seule virgule est acceptée.", 1)
        } else changeAlertMessage("Seuls les chiffres et une virgule sont acceptés pour le prix.", 1)
    }

    return (
        <div className="admin-ajout">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>

            <header>
                <NavBarAdmin active={2} />
            </header>

            <main className="aa-main">
                <div className="aa-top">
                    <EditIcon />
                    <h1>Gestion du contenu - Ajouter un plat</h1>
                </div>
                <div className="aa-bottom">
                    {disableBtn ? <div className="aa-loader"><Loader /></div> : null}
                    <div className="aa-alert">{toggleAlertMessage ? <MessageSmall type={typeAlertMessage} message={alertMessage} /> : null}</div>
                    <div className="aa-platCard">
                        <PlatCard isAdmin={true} data={data} />
                        <small>L'image "Logo Mekong" est mise par défaut</small>
                    </div>
                    <form className="aa-form" onSubmit={e => handleSubmit(e)}>
                        <div className="aa-form-content">                      
                            <div className="aa-left">
                                <div className="aa-input-solo">
                                    <label ref={imageRef} className="aa-label-noAnim" htmlFor="image">Modifier l'image</label>
                                    <input onChange={e => handleChangeFile(e)} className="aa-input" type="file" name="image" />
                                </div>
                                <div className="aa-input-double">
                                    <div className="aa-input-double-left">
                                        <label ref={nameRef} className="aa-label" htmlFor="name">Nom du plat *</label>
                                        <input onInput={(e) => handleClickInput(1, e)} onChange={e => setData({...data, name: e.target.value})} className="aa-input" type="text" name="name" value={data.name} required/>
                                    </div>
                                    <div className="aa-input-double-right">
                                        <label ref={descritpionRef} className="aa-label" htmlFor="description">Description</label>
                                        <input onInput={(e) => handleClickInput(2, e)} onChange={e => setData({...data, description: e.target.value})} className="aa-input" type="text" name="description" value={data.description} />
                                    </div>
                                </div>
                                <div className="aa-input-double">
                                    <div className="aa-input-double-left">
                                        <label ref={priceRef} className="aa-label" htmlFor="price">Prix *</label>
                                        <input ref={priceInputRef} onInput={(e) => handleClickInput(3, e)} onChange={e => handleChangePrice(e.target.value)} className="aa-input" type="text" name="price" value={data.prix} required/>
                                    </div>
                                    <div className="aa-input-double-right">
                                        <label ref={allergyRef} className="aa-label" htmlFor="allergy">Allergènes</label>
                                        <input onInput={(e) => handleClickInput(4, e)} onChange={e => setData({...data, allergy: e.target.value})} className="aa-input" type="text" value={data.allergy} name="allergy"/>
                                    </div>
                                </div>
                                <div className="aa-input-double">
                                    <div className="aa-input-double-left">
                                        <label className="aa-label-noAnim" htmlFor="pepper">Piquant</label>
                                        <select ref={pepperRef} onChange={e => setData({...data, pepper: e.target.value})} className="aa-input" name="pepper">
                                            <option value="0">/</option>
                                            <option value="1">Piquant léger</option>
                                            <option value="2">Piquant moyen</option>
                                            <option value="3">Piquant fort</option>
                                        </select>
                                    </div>
                                    <div className="aa-input-double-right">
                                        <label className="aa-label-noAnim" htmlFor="visibility">Visibilitée</label>
                                        <select onChange={e => setData({...data, visibility: e.target.value})} className="aa-input" name="visibility">
                                            <option value={1}>Visible</option>
                                            <option value={0}>Non visible</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="aa-right">
                                <div className="aa-input-solo">
                                    <p className="aa-label-noAnim">Catégories *</p>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "soupes") === "soupes" ? true : false}  value="soupes" type="checkbox" className="aa-input" name="categorySoupes" />        
                                        <label htmlFor="categorySoupes">Soupes</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "salades") === "salades" ? true : false}  value="salades" type="checkbox" className="aa-input" name="categorySalades" />        
                                        <label htmlFor="categorySoupes">Salades</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "entrées chaudes") === "entrées chaudes" ? true : false}  value="entrées chaudes" type="checkbox" className="aa-input" name="categoryEntrees" />        
                                        <label htmlFor="categorySoupes">Entrées chaudes</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "soupes de nouilles") === "soupes de nouilles" ? true : false}  value="soupes de nouilles" type="checkbox" className="aa-input" name="categoryNouilles" />        
                                        <label htmlFor="categorySoupes">Soupes de nouilles</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "plats au curry") === "plats au curry" ? true : false}  value="plats au curry" type="checkbox" className="aa-input" name="categoryCurry" />       
                                        <label htmlFor="categorySoupes">Plats au curry</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "les spécialités") === "les spécialités" ? true : false}  value="les spécialités" type="checkbox" className="aa-input" name="categorySpecialites" />        
                                        <label htmlFor="categorySoupes">Les spécialités</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "wok") === "wok" ? true : false} value="wok" type="checkbox" className="aa-input" name="categoryWok" />        
                                        <label htmlFor="categorySoupes">Wok</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "végétarien") === "végétarien" ? true : false}  value="végétarien" type="checkbox" className="aa-input" name="categoryVegetarien" />        
                                        <label htmlFor="categorySoupes">Végétarien</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "desserts") === "desserts" ? true : false}  value="desserts" type="checkbox" className="aa-input" name="categoryDesserts" />        
                                        <label htmlFor="categoryDesserts">Desserts</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} checked={data.categorys.find(nbr => nbr === "boissons") === "boissons" ? true : false}  value="boissons" type="checkbox" className="aa-input" name="categoryBoissons" />        
                                        <label htmlFor="categoryBoissons">Boissons</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-small">
                            <small>* champ obligatoire</small>
                        </div>
                        <button type="submit" disabled={disableBtn}>
                            <span className="btn-content">Ajouter</span>
                        </button>
                    </form>
                    <button type="button">
                        <Link to="/admin/gestion-contenu" className="btn-content">Annuler</Link>
                    </button>
                </div>
            </main>
        </div>
    )
}
