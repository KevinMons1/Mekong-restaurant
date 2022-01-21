import React, { useState, useEffect } from 'react'

export default function NotificationCircle() {
    const [state, setState] = useState(true)
    const style = { 
        position: "absolute",
        top: "35%",
        left: "10px",
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor: "#F14444",
    }

    useEffect(() => {
        setTimeout(() => {
            setState(false)
        }, 600000);
    }, [])

    return state ? <div style={style}></div> : null
}
