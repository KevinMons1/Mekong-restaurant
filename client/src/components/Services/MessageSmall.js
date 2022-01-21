import React, { useState, useEffect } from 'react'
import ReportProblemIcon from "@material-ui/icons/ReportProblemOutlined"
import CheckIcon from "@material-ui/icons/CheckCircleOutlined"
import ErrorIcon from "@material-ui/icons/ErrorOutline"
import HighLightOffIcon from "@material-ui/icons/HighlightOff"

export default function MessageSmall({ type, message, disparition }) {

    const [typeStyle, setTypeStyle] = useState(-1)

    useEffect(() => {
        if (type === 0) setTypeStyle("successSmall messageSmall")
        else if (type === 1) setTypeStyle("errorSmall messageSmall")
        else if (type === 2) setTypeStyle("warningSmall messageSmall")
        else setTypeStyle("informationSmall messageSmall")

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

    return typeStyle !== -1 ? (
        <div className={typeStyle}>
            {displeyIcon()}
            <p>{message}</p>
            <HighLightOffIcon className="messageClose" onClick={() => setTypeStyle(-1)} />
        </div>
    ) : null
}
