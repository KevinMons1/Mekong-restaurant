import React, { useState, useEffect } from 'react'
import ReportProblemIcon from "@material-ui/icons/ReportProblemOutlined"
import CheckIcon from "@material-ui/icons/CheckCircleOutlined"
import ErrorIcon from "@material-ui/icons/ErrorOutline"
import HighLightOffIcon from "@material-ui/icons/HighlightOff"
import { useHistory } from 'react-router-dom'

export default function MessageBig({ type, message, disparition, click }) {

    const [typeStyle, setTypeStyle] = useState(-1)
    const history = useHistory()

    useEffect(() => {
        if (type === 0) setTypeStyle("successBig messageBig")
        else if (type === 1) setTypeStyle("errorBig messageBig")
        else if (type === 2) setTypeStyle("warningBig messageBig")
        else setTypeStyle("informationBig messageBig")

        if (disparition) {
            setTimeout(() => {
                setTypeStyle(-1)
            }, 7000);
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const displeyIcon = () => {
        let choice

        switch (type) {
            case 0:
                choice = <CheckIcon />
                break;
            
            case 1:
                choice = <ReportProblemIcon />
                break

            case 2:
                choice = <ReportProblemIcon />
                break

            case 3:
                choice = <ErrorIcon />
                break

            default:
                choice = <ReportProblemIcon />
                break;
        }
        return choice
    }

    const handleClick = () => {
        click()
        if (type === 0) history.push("/")
        else setTypeStyle(-1)
    }

    return typeStyle !== -1 ? (
        <>
            <div className="messageBigOpacity"></div>
            <div className={typeStyle}>
                {displeyIcon()}
                {type === 0
                ? <p>Succès, le paiement à été autorisé</p>
                : <p>Une erreur est survenue.</p>}
                {type === 0
                ? <small>Un récasmallitulatif de la commande <br /> vous sera envoyé en mail</small>
                : <small>{message}</small>}
                <HighLightOffIcon className="messageClose" onClick={() => handleClick()} />
            </div>
        </>
    ) : null
}
