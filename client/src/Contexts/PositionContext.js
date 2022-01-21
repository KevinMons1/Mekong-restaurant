import { createContext } from "react";

export const PositionContext = createContext({
    lat: 0,
    lng: 0,
    areas: {
        area1: false,
        area2: false,
        area3: false
    }
})