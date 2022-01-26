import { useState, useEffect } from "react"
import "./styles/style.scss"
import { Route, Switch  } from "react-router-dom"
import axios from "axios"
import { reactLocalStorage } from 'reactjs-localstorage'
import { PanierContext } from './Contexts/PanierContext'
import { SeeOrderContext } from './Contexts/SeeOrderContext'
import { PositionContext } from './Contexts/PositionContext'
import Auth from "./Auth"


import Accueil from "./pages/Accueil/Accueil"
import MenusCommander from "./pages/MenusCommander/MenusCommander"
import Panier from "./pages/Panier/Panier"
import Payment from "./pages/Panier/PaymentIndex"
import Contact from "./pages/Contact/Contact"
import LoginAdmin from "./pages/Admin/Login/LoginAdmin"
import HomeAdmin from "./pages/Admin/Home/HomeAdmin"
import CommandesAdmin from "./pages/Admin/Commandes/CommandesAdmin"
import GestionContenuAdmin from "./pages/Admin/GestionContenu/GestionContenuAdmin"
import AjoutAdmin from "./pages/Admin/GestionContenu/AjoutAdmin"
import ModifyAdmin from "./pages/Admin/GestionContenu/ModifyAdmin"
import GestionSiteAdmin from "./pages/Admin/GestionSite/GestionSiteAdmin"
import LegalNotice from "./pages/Legal/LegalNotice"
import Error from "./components/Services/Error"

import Loader from "./components/Services/Loader"
import ProtectedRoute from "./ProtectedRoute"
import Cgu from "./pages/Legal/Cgu"
import Cgv from "./pages/Legal/Cgv"

function App() {

  const [panier, setPanier] = useState([])
  const [seeOrder, setSeeOrder] = useState(0)
  const [load, setLoad] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
    areas: {
      area1: false,
      area2: false,
      area3: false
  }
  })

  useEffect(() => {
    const fetchData = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/gestion-site/seeOrder`)
          .then(res => {
            setSeeOrder(res.data)
          })
          .catch(err => console.log(err))

      const isAuth = await Auth.loginWithLocalStorage(reactLocalStorage.get("isAdmin"))
      setAuthenticated(isAuth)
      getLocation()
    }
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition)
    setLoad(true)
  }
  
  const showPosition = (position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    checkArea(pos)
  }

  const isInside = (checkPoint, centerPoint, km) => {
    let ky = 40000 / 360
    let kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky
    let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx
    let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky
    return Math.sqrt(dx * dx + dy * dy) <= km
  }

  const checkArea = async (pos) => {
    const area1 = await isInside(pos, {
      lat: 50.4559469,
      lng: 4.8711279
    }, 1.75) // area 1.75km

    const area2 = await isInside(pos, { 
      lat: 50.4559469,
      lng: 4.8711279
    }, 3.5) // area 3.5km

    const area3 = await isInside(pos, { 
      lat: 50.4559469,
      lng: 4.8711279
    }, 5.5) // area 5.5km

    // Production
    // setPosition({
    //   lat: pos.lat,
    //   lng: pos.lng,
    //   areas: {
    //     area1: area1,
    //     area2: area2,
    //     area3: area3
    //   }
    // })
    // Développement
    setPosition({
      lat: pos.lat,
      lng: pos.lng,
      areas: {
        area1: true,
        area2: false,
        area3: false
      }
    })
  }

  return (
      <div className="App">
       {load ?
          <SeeOrderContext.Provider value={{seeOrder, setSeeOrder}}>
            <PanierContext.Provider value={{panier, setPanier}}>
              <PositionContext.Provider value={{position, setPosition}}>
                <Switch>
                  <Route exact path="/" component={Accueil} />
                  <Route exact path="/menus" component={MenusCommander} />
                  {seeOrder === 1 ? <Route exact path="/panier" component={Panier} /> : null}
                  {seeOrder === 1 
                    ? position.areas.area1 || position.areas.area2 || position.areas.area3 
                      ? <Route exact path="/panier/paiement" component={Payment} />
                      : null
                    : null}
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/mentions-legales" component={LegalNotice} />
                  <Route exact path="/conditions-générales-d'utilisation" component={Cgu} />
                  <Route exact path="/conditions-générales-de-vente" component={Cgv} />
                  <Route exact path="/admin">
                    <LoginAdmin isAuthenticated={() => setAuthenticated(Auth.isAuthenticated())} />
                  </Route>
                  {authenticated ? <ProtectedRoute exact path="/admin/home" component={HomeAdmin} /> : null}
                  {authenticated ? <ProtectedRoute exact path="/admin/commandes" component={CommandesAdmin} /> : null}
                  {authenticated ? <ProtectedRoute exact path="/admin/gestion-contenu" component={GestionContenuAdmin} /> : null}
                  {authenticated ? <ProtectedRoute exact path="/admin/gestion-contenu/ajout" component={AjoutAdmin} /> : null}
                  {authenticated ? <ProtectedRoute exact path="/admin/gestion-contenu/modifier/:slug" component={ModifyAdmin} /> : null}
                  {authenticated ? <ProtectedRoute exact path="/admin/gestion-site" component={GestionSiteAdmin} /> : null}
                  <Route path="*" component={Error} />
                </Switch>
              </PositionContext.Provider>
            </PanierContext.Provider>
          </SeeOrderContext.Provider>
        : <div className="app-Loader"><Loader /></div> }
      </div>
  );
}

export default App;
