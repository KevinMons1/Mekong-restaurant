import React from 'react'
import Lottie from "react-lottie"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import * as animationData from '../../assets/error.json'

export default function Error() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
      
    return (
        <>
        <header>
            <NavBar />
        </header>

        <main className="error">
            <Lottie options={defaultOptions}/>
        </main>

        <Footer />
        </>
    )
}
