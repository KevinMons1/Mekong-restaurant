import axios from "axios"
import { reactLocalStorage } from 'reactjs-localstorage';

class AuthClass {
    constructor() {
        this.authenticated = false
    }

    login(password) {
        let data = null
        const fetch = async () => {
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {password: password})
                .then(res => {
                   data = res.data
                   if (res.data.alert) this.authenticated = true
                })
                .catch(err => data = err.response.data)
                return data
            }
        return fetch()
    }

    loginWithLocalStorage(authorization) {
        if (authorization === "1") {
            this.authenticated = true
            return true
        }
        else return false
    }
    logout() {
        this.authenticated = false
        reactLocalStorage.remove("isAdmin")
        return
    }

    isAuthenticated() {
        return this.authenticated
    }
}

const Auth = new AuthClass()

export default Auth