import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NotInterestedIcon from "@material-ui/icons/NotInterestedOutlined"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOffOutlined"
import EditIcon from "@material-ui/icons/EditOutlined"
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined"
import CancelIcon from "@material-ui/icons/CancelOutlined"
import PlatCard from "../../components/PlatCard/PlatCard"

export default function MenusContent({ seeOrder, data, isAdmin, handleClickDelete, handleClickVisibility, handleClickAvailable }) {

    const [categoryEmpty, setCategoryEmpty] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [deletePopUp, setDeletePopUp] = useState(-1)
    const [load, setLoad] = useState(false)
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [data6, setData6] = useState([])
    const [data7, setData7] = useState([])
    const [data8, setData8] = useState([])
    const [data9, setData9] = useState([])
    const [data10, setData10] = useState([])

    useEffect(() => {
        setLoad(false)
        // Remove title empty
        const fitlerCateg = async () => {
            const categDefault = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            let categoryFilter = []
            let dataFind

            await categDefault.forEach(element => {
                dataFind = data.find(item => item.category.categoryNameId === element)
                if (dataFind !== undefined) categoryFilter.push(element)
            })
            setCategoryEmpty(categoryFilter)

            await filterData(1, (element) => setData1(element))
            await filterData(2, (element) => setData2(element))
            await filterData(3, (element) => setData3(element))
            await filterData(4, (element) => setData4(element))
            await filterData(5, (element) => setData5(element))
            await filterData(6, (element) => setData6(element))
            await filterData(7, (element) => setData7(element))
            await filterData(8, (element) => setData8(element))
            await filterData(9, (element) => setData9(element))
            await filterData(10, (element) => setData10(element))
        }
        fitlerCateg()
        setLoad(true)
    }, [data])

    const filterData = async (categ, setState) => {
        let dataFilter = await data.filter(item => item.category.categoryNameId === categ)
        dataFilter = await dataFilter.sort((a, b) => {
            const aSplit = a.plat.name.slice(0, 5)
            const bSplit = b.plat.name.slice(0, 5)

            return aSplit.split(".")[0] - bSplit.split(".")[0]   
        })

        return setState(dataFilter)
    }

    const availableCard = () => {
        return (
            <>
                <div className={seeOrder === 1 ? "mc-off-opacity" : "mc-off-opacity-seeOrder"}></div>
                <p className="mc-off-text">Non disponible pour le moment</p>
            </>
        )
    }

    const viewPlatCard = (choice) => {
        if (choice === 0) {
            return (
                <>
                    <div className="agc-off-opacity"></div>
                    <VisibilityOffIcon />
                </>
            )
        } else if (choice === 1) {
            return (
                <>
                    <div className="agc-off-opacity"></div>
                    <NotInterestedIcon />
                </>
            )
        }
    }

    const cardHtml = (item, index, isVegan) => {
        return (
            item.visibility ?
                <li className="agc-plats" key={index} >
                    <div className="agc-plat">
                        {item.available === 0 
                        ? availableCard()
                        : null
                        }                            
                        <PlatCard data={item} isVegan={isVegan} />
                    </div>
                </li>
            : null 
        ) 
    }

    const cardHtmlAdmin = (item, index) => {
        return (
         <li className="agc-plat-box" key={index}>
             <div className="agc-plats">
                 {deletePopUp === item.plat.platId
                 ?   <div className="agc-delete-popUp">
                         <p>Voulez-vous vraiment le supprimer ?</p>
                         <div>
                             <button className="agc-dp-red" onClick={() => handleClickDelete(item.plat.platId)}>Supprimer</button>
                             <button className="agc-dp-green" onClick={() => setDeletePopUp(-1)}>Annuler</button>
                         </div>
                     </div>
                 : null}
 
                 {item.plat.visibility === 0 
                 ? viewPlatCard(0)
                 : item.plat.visibility === 1
                     ? item.plat.available === 0
                         ? viewPlatCard(1)
                         : null
                     : null
                 }           
                 <PlatCard isAdmin={true} data={item.plat} isVegan={item.isVegan} />
             </div>
             <div>
                <button className="agc-action agc-edit"><Link className="agc-edit-link" to={`/admin/gestion-contenu/modifier/${item.plat.platId}`}><EditIcon /></Link></button>
                <button className="agc-action agc-visibility" onClick={() => handleClickVisibility(item.plat.visibility === 0 ? 1 : 0, item.plat.platId)}><VisibilityIcon /></button>
                <button className="agc-action agc-hide" onClick={() => handleClickAvailable(item.plat.available === 0 ? 1 : 0, item.plat.platId)} ><NotInterestedIcon/></button>
                <button className="agc-action agc-delete" onClick={() => setDeletePopUp(item.plat.platId)}><CancelIcon /></button>
             </div>
         </li>
        )
     }

    const checkIsEmpty = index => {
        const find = categoryEmpty.indexOf(index)
        if (find === -1) return false
        else return true
    }

    return load ? (
        <>            
            {checkIsEmpty(1) ?
            <div className="agc-plat" > 
                <h3>Soupes</h3>
                <ul>
                    {data1.map((item, index) => {
                            if (item.category.categoryNameId === 1) return (
                                isAdmin 
                                ? cardHtmlAdmin(item, index)
                                : cardHtml(item.plat, index, item.isVegan)
                                )
                            else return null
                        })}
                    
                </ul>
            </div>
            : null}
            {checkIsEmpty(2) ?
            <div className="agc-plat" > 
                <h3>Salades</h3>
                <ul>
                    {data2.map((item, index) => {
                        if (item.category.categoryNameId === 2) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}
            {checkIsEmpty(3) ?
            <div className="agc-plat" > 
                <h3>Entrées chaudes</h3>
                <ul>
                    {data3.map((item, index) => {
                        if (item.category.categoryNameId === 3) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

             {checkIsEmpty(4) ?
            <div className="agc-plat"> 
                <h3>Soupes de nouilles</h3>
                <ul>
                    {data4.map((item, index) => {
                        if (item.category.categoryNameId === 4) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

             {checkIsEmpty(5) ?
            <div className="agc-plat"> 
                <h3>Plats au curry</h3>
                <ul>
                    {data5.map((item, index) => {
                        if (item.category.categoryNameId === 5) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

             {checkIsEmpty(6) ?
            <div className="agc-plat"> 
                <h3>Les spécialités</h3>
                <ul>
                    {data6.map((item, index) => {
                        if (item.category.categoryNameId === 6) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

             {checkIsEmpty(7) ?
            <div className="agc-plat"> 
                <h3>Wok</h3>
                <ul>
                    {data7.map((item, index) => {
                        if (item.category.categoryNameId === 7) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

             {checkIsEmpty(8) ?
            <div className="agc-plat">    
                <h3>Végétarien</h3>
                <ul>
                    {data8.map((item, index) => {
                        if (item.category.categoryNameId === 8) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

             {checkIsEmpty(9) ?
            <div className="agc-plat"> 
                <h3>Desserts</h3>
                <ul>
                    {data9.map((item, index) => {
                        if (item.category.categoryNameId === 9) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}

            {checkIsEmpty(10) ?
            <div className="agc-plat"> 
                <h3>Boissons</h3>
                <ul>
                    {data10.map((item, index) => {
                        if (item.category.categoryNameId === 10) return (
                            isAdmin 
                            ? cardHtmlAdmin(item, index)
                            : cardHtml(item.plat, index, item.isVegan)
                            )
                        else return null
                    })}
                </ul>
            </div>
            : null}
        </>
    ) : null
}
