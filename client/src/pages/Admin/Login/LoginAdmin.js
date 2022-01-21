import React, { useState } from 'react'
import MessageSmall from '../../../components/Services/MessageSmall'
import { Link, useHistory } from "react-router-dom"
import Auth from "../../../Auth"
import Loader from "../../../components/Services/Loader"
import { reactLocalStorage } from 'reactjs-localstorage'
import { Helmet } from "react-helmet"

export default function LoginAdmin({ isAuthenticated }) {
    const history = useHistory()
    const [toggleAlertMessage, setToggleAlertMessage] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [data, setData] = useState("")
    const [load, setLoad] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        setLoad(true)
        const password = data.replace(/ /g, "")

        const fetch = async () => {
            const res = await Auth.login(password)
            if (res.alert) {
                reactLocalStorage.set("isAdmin", 1)
                isAuthenticated()
                history.push("/admin/home")
            }
            else {
                setAlertMessage(res.message)
                setToggleAlertMessage(true)
                setLoad(false)
            }
        }
        fetch()
    }

    return (
        <main className="loginAdmin">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            
            <h1>Admin</h1>
            {toggleAlertMessage ? <MessageSmall type={1} message={alertMessage} /> : null}
            {load ? <Loader /> : null}
            <form className="loginAdmin-form" onSubmit={e => handleSubmit(e)}>
                <input onChange={e => setData(e.target.value)} className="loginAdmin-input" type="password" name="password" placeholder="Mot de passe" required/>
                <button type="submit">
                    <span className="btn-content">Se connecter</span>
                </button>
            </form>
            <div className="loginAdmin-redirect">
                <p><strong>Si vous êtes arrivé ici, veuillez partir en cliquant</strong> <Link to="/">ici</Link></p>
            </div>
        </main>
    )
}
