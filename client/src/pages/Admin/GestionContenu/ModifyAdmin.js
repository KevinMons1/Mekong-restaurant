import React, { useRef, useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import NavBarAdmin from '../../../components/NavBar/NavBarAdmin'
import EditIcon from "@material-ui/icons/EditOutlined"
import PlatCard from '../../../components/PlatCard/PlatCard'
import MessageSmall from "../../../components/Services/MessageSmall"
import imageCompression from "browser-image-compression"
import axios from "axios"
import Loader from "../../../components/Services/Loader"
import { Helmet } from "react-helmet"

export default function AjoutAdmin() {
    const { slug } = useParams()
    const imageRef = useRef(null)
    const nameRef = useRef(null)
    const descritpionRef = useRef(null)
    const priceRef = useRef(null)
    const priceInputRef = useRef(null)
    const allergyRef = useRef(null)
    const arrayRef = [imageRef, nameRef, descritpionRef, priceRef, allergyRef]
    const [typeAlertMessage, setTypeAlertMessage] = useState(0)
    const [alertMessage, setAlertMessage] = useState("")
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        const rgNumber = /^[0-9]*$/

        if (rgNumber.test(parseInt(slug))) {
            const fetch = () => {
                axios.get(`${process.env.REACT_APP_API_URL}/plats/one/${slug}`)
                .then(res => setData({
                    plat: {
                        ...res.data.plat,
                        image: ""
                    },
                    categorys: res.data.categorys
                }))
                .catch(err => {
                    setLoad(false)
                    alert(err.response.data.error)
                })
            }
            fetch()
            setLoad(true)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    
                if (count === 0) {
                    setData({
                        plat: data.plat,
                        categorys: [...data.categorys, e.target.value]
                    })
                }
            
            } else changeAlertMessage("Une erreur s'est produite.", 1)
        } else {
            let newCategorys = data.categorys.filter(categ => categ !== e.target.value)
            setData({
                plat: data.plat,
                categorys: newCategorys
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { name, price, image } = data.plat
        const rgNumber = /^[0-9^,.]*$/
        setDisableBtn(true)

        if (name !== "" && price !== "" && data.categorys.length >= 1) {
            if (rgNumber.test(price)) {
                if (parseFloat(price.replace(",", ".")) > 0.01) {
                    if (price.includes(",")) {
                        let indexSlice = price.indexOf(",")
                        if (price.slice((indexSlice)).length === 3) {
                            axios.put(`${process.env.REACT_APP_API_URL}/gestion-contenu/change`, {
                                ...data.plat,
                                categorys: data.categorys
                            })
                                .then(res => {
                                    if (data.plat.image !== "") {
                                        if (image.type.indexOf("image/") === 0) handleCompressionImage()
                                        else changeAlertMessage("Type de l'image invalid", 1)
                                    } else {
                                        changeAlertMessage(res.data.message, 0)
                                        setDisableBtn(false)
                                    }
                                })
                                .catch(err => changeAlertMessage(err.response.data.error, 1))
                        } else changeAlertMessage("Le prix ne peut avoir que deux chiffres après la virgule.", 1)
                    } else changeAlertMessage("Le prix doit être mis à la décimal séparé par une virgule (exemple: 12,35).", 1)
                } else changeAlertMessage("Le prix ne peut pas être négatif.", 1)
            } else changeAlertMessage("Le prix doit être un nombre", 1)
        } else changeAlertMessage("Vous devez remplir les champs obligatoires.", 1)
    }

    const changeAlertMessage = (text, type) => {
        setTypeAlertMessage(type)
        setAlertMessage(text)
        setToggleAlertMessage(true)
        setDisableBtn(false)
    }

    const handleChangeFile = e => {
        if (typeof e.target.files[0] !== "undefined") {
            const checkExtensionImage = e.target.files[0].type.indexOf("image/")

            if (checkExtensionImage !== -1) {
                setData({...data, plat: {...data.plat, image: e.target.files[0]}})
            } else changeAlertMessage("Fichier invalid.", 1)
        } 
    }

    const handleCompressionImage = () => {
        let imageFile = data.plat.image;    
        let options = {
          maxSizeMB: 0.01,
          maxWidthOrHeight: 1000,
          useWebWorker: true
        }

        imageCompression(imageFile, options)
            .then(compressedFile => {
                let formData = new FormData()
                formData.append('file', compressedFile)

                axios.put(`${process.env.REACT_APP_API_URL}/gestion-contenu/change/image/${slug}`, formData)
                    .then(res => {
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
                        setData({...data, plat: {...data.plat, price: beforeValue + valueSlice}})
                        
                    } else setData({...data, plat: {...data.plat, price: value}})
                } else setData({...data, plat: {...data.plat, price: value}})
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
                {(load && data !== null) ?
                <div className="aa-bottom">
                        {disableBtn ? <div className="aa-loader"><Loader /></div> : null}
                        <div className="aa-alert">{toggleAlertMessage ? <MessageSmall type={typeAlertMessage} message={alertMessage} /> : null}</div>
                    <div className="aa-platCard">
                        <PlatCard isAdmin={true} data={data.plat} isModifyDashboard={true} />
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
                                        <label ref={nameRef} className="aa-label animLabel" htmlFor="name">Nom du plat *</label>
                                        <input onInput={(e) => handleClickInput(1, e)} onChange={e => setData({...data, plat: {...data.plat, name: e.target.value}})} className="aa-input" type="text" name="name" defaultValue={data.plat.name} required/>
                                    </div>
                                    <div className="aa-input-double-right">
                                        <label ref={descritpionRef} className="aa-label animLabel" htmlFor="description">Description</label>
                                        <input onInput={(e) => handleClickInput(2, e)} onChange={e => setData({...data, plat: {...data.plat, description: e.target.value}})} className="aa-input" type="text" name="description" defaultValue={data.plat.description}/>
                                    </div>
                                </div>
                                <div className="aa-input-double">
                                    <div className="aa-input-double-left">
                                        <label ref={priceRef} className="aa-label animLabel" htmlFor="price">Prix *</label>
                                        <input ref={priceInputRef} onInput={(e) => handleClickInput(3, e)} onChange={e => handleChangePrice(e.target.value)} className="aa-input" type="text" name="price" defaultValue={data.plat.price} required/>
                                    </div>
                                    <div className="aa-input-double-right">
                                        <label ref={allergyRef} className="aa-label animLabel" htmlFor="allergy">Allergènes</label>
                                        <input onInput={(e) => handleClickInput(4, e)} onChange={e => setData({...data, plat: {...data.plat, allergy: e.target.value}})} className="aa-input" type="text" name="allergy" defaultValue={data.plat.allergy}/>
                                    </div>
                                </div>
                                <div className="aa-input-double">
                                    <div className="aa-input-double-left">
                                        <label className="aa-label-noAnim" htmlFor="pepper">Piquant</label>
                                        <select onChange={e => setData({...data, plat: {...data.plat, pepper: e.target.value}})} className="aa-input" name="pepper">
                                            <option 
                                            value={data.plat.pepper === 0
                                                ? "0"
                                                : data.plat.pepper === 1
                                                    ? "1"
                                                    : data.plat.pepper === 2
                                                     ? "2"
                                                     : "3"
                                            }>
                                                {data.plat.pepper === 0
                                                ? "/"
                                                : data.plat.pepper === 1
                                                    ? "Piquant léger"
                                                    : data.plat.pepper === 2
                                                     ? "Piquant moyen"
                                                     : "Piquant fort"
                                            }</option>
                                            <option value="1">Piquant léger</option>
                                            <option value="2">Piquant moyen</option>
                                            <option value="3">Piquant fort</option>
                                        </select>
                                    </div>
                                    <div className="aa-input-double-right">
                                        <label className="aa-label-noAnim" htmlFor="visibility">Visibilitée</label>
                                        <select onChange={e => setData({...data, plat: {...data.plat, visibility: e.target.value}})} className="aa-input" name="visibility">
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
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "soupes") === undefined ? false : true} value="soupes" type="checkbox" className="aa-input" name="categorySoupes" />        
                                        <label htmlFor="categorySoupes">Soupes</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "salades") === undefined ? false : true} value="salades" type="checkbox" className="aa-input" name="categorySalades" />        
                                        <label htmlFor="categorySoupes">Salades</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "entrées chaudes") === undefined ? false : true} value="entrées chaudes" type="checkbox" className="aa-input" name="categoryEntrees" />        
                                        <label htmlFor="categorySoupes">Entrées chaudes</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "soupes de nouilles") === undefined ? false : true} value="soupes de nouilles" type="checkbox" className="aa-input" name="categoryNouilles" />        
                                        <label htmlFor="categorySoupes">Soupes de nouilles</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "plats au curry") === undefined ? false : true} value="plats au curry" type="checkbox" className="aa-input" name="categoryCurry" />       
                                        <label htmlFor="categorySoupes">Plats au curry</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "les spécialités") === undefined ? false : true} value="les spécialités" type="checkbox" className="aa-input" name="categorySpecialites" />        
                                        <label htmlFor="categorySoupes">Les spécialités</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "wok") === undefined ? false : true} value="wok" type="checkbox" className="aa-input" name="categoryWok" />        
                                        <label htmlFor="categorySoupes">Wok</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "végétarien") === undefined ? false : true} value="végétarien" type="checkbox" className="aa-input" name="categoryVegetarien" />        
                                        <label htmlFor="categorySoupes">Végétarien</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "desserts") === undefined ? false : true} value="desserts" type="checkbox" className="aa-input" name="categoryDesserts" />        
                                        <label htmlFor="categorySoupes">Desserts</label>
                                    </div>
                                    <div className="aa-input-box">
                                        <input onChange={e => handleChangeCategory(e)} defaultChecked={data.categorys.find(categ => categ === "boissons") === undefined ? false : true} value="boissons" type="checkbox" className="aa-input" name="categoryBoissons" />        
                                        <label htmlFor="categoryBoissons">Boissons</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-small">
                            <small>* champ obligatoire</small>
                        </div>
                        <button type="submit" disabled={disableBtn}>
                            <span className="btn-content">Modifier</span>
                        </button>
                    </form>
                    <button type="button">
                        <Link to="/admin/gestion-contenu" className="btn-content">Annuler</Link>
                    </button>
                    </div>
            : null}
            </main>
        </div>
    )
}
